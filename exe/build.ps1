<#
  高等数学题库 · 打包脚本
  ---------------------------------------------------------------------------
  两种模式：

    -Onedir   目录版：exe + _internal 依赖目录，装进 zip 分发。
              启动快（无需解压），兼容性最好，推荐。

    (默认)    单文件版：只有一个 exe，启动时先解压到临时目录，稍慢。
              注意：本机 PyInstaller(conda Python) 打出的单文件版在解压
              VCRUNTIME140.dll 时会报 "fopen: Permission denied"，属已知问题；
              若报错请改用 -Onedir。

  用法：
      pwsh -File exe\build.ps1 -Onedir
      pwsh -File exe\build.ps1 -Onedir -Python C:\YOLOV8\python.exe
      pwsh -File exe\build.ps1                  # 单文件
      pwsh -File exe\build.ps1 -Onedir -SkipCheck
#>

param(
  [string]$Python = "",
  [switch]$Onedir,
  [switch]$SkipCheck
)

$ErrorActionPreference = 'Stop'

$root    = Split-Path -Parent $PSScriptRoot          # gaoshu-bank/
$web     = Join-Path $root 'web'
$exeDir  = $PSScriptRoot
$dist    = Join-Path $root 'dist'
$icon    = Join-Path $exeDir 'app.ico'
$verFile = Join-Path $exeDir 'version.txt'
$entry   = Join-Path $exeDir 'app.py'
$appName = '高等数学题库'
$ASCII   = 'GaoshuBank'

function Write-Step($m) { Write-Host "`n=== $m ===" -ForegroundColor Cyan }
function Write-Ok($m)   { Write-Host "  OK  $m" -ForegroundColor Green }
function Write-Bad($m)  { Write-Host "  !!  $m" -ForegroundColor Red }
function Write-Info($m) { Write-Host "      $m" -ForegroundColor DarkGray }

# ---------------------------------------------------------------- 前置检查

Write-Step "前置检查"

if (-not (Test-Path -LiteralPath $entry)) { Write-Bad "找不到入口 $entry"; exit 1 }
foreach ($need in @('index.html', 'data\questions.js')) {
  $p = Join-Path $web $need
  if (-not (Test-Path -LiteralPath $p)) {
    Write-Bad "缺少 web\$need，请先在 web\ 下运行 python build.py"; exit 1
  }
}
Write-Ok "入口与题库资源齐全"

if (-not (Test-Path -LiteralPath $icon)) {
  Write-Info "图标不存在，尝试生成…"
  $iconPy = Join-Path $exeDir 'make_icon.py'
  if (Test-Path -LiteralPath $iconPy) { & $Python $iconPy }
}
if (Test-Path -LiteralPath $icon) { Write-Ok "图标 app.ico" }

if (-not $Python) {
  foreach ($c in @('C:\YOLOV8\python.exe',
                   "$env:LOCALAPPDATA\Programs\Python\Python312\python.exe",
                   "$env:LOCALAPPDATA\Programs\Python\Python311\python.exe",
                   'python')) {
    try { $null = & $c -c "import PyInstaller" 2>$null; if ($LASTEXITCODE -eq 0) { $Python = $c; break } } catch { }
  }
}
if (-not $Python) { Write-Bad "找不到带 PyInstaller 的 Python，请用 -Python 指定"; exit 1 }

$pyver = & $Python -c "import sys;print(sys.version.split()[0])"
$pyi   = & $Python -m PyInstaller --version
Write-Ok "Python $pyver  /  PyInstaller $pyi"
Write-Info $Python

# ---------------------------------------------------------------- 打包

$mode  = if ($Onedir) { '--onedir' } else { '--onefile' }
$label = if ($Onedir) { '目录版' } else { '单文件版' }
$work  = Join-Path $root ("build\" + $(if ($Onedir) { 'onedir' } else { 'onefile' }))

Write-Step "PyInstaller 打包（$label）"

$pyArgs = @(
  '-m', 'PyInstaller',
  '--noconfirm', '--clean', '--log-level', 'WARN',
  $mode, '--noconsole',
  '--name', $ASCII,
  '--distpath', $dist,
  '--workpath', $work,
  '--specpath', $work,
  '--add-data', "$web;web",
  '--exclude-module', 'numpy', '--exclude-module', 'pandas',
  '--exclude-module', 'matplotlib', '--exclude-module', 'scipy',
  '--exclude-module', 'cv2', '--exclude-module', 'torch',
  '--exclude-module', 'PyQt5', '--exclude-module', 'PySide2',
  '--exclude-module', 'IPython', '--exclude-module', 'pytest',
  '--exclude-module', 'PIL', '--exclude-module', 'setuptools',
  '--exclude-module', 'pip',
  $entry
)
if (Test-Path -LiteralPath $icon)    { $pyArgs += @('--icon', $icon) }
if (Test-Path -LiteralPath $verFile) { $pyArgs += @('--version-file', $verFile) }
if (Test-Path -LiteralPath $icon)    { $pyArgs += @('--add-data', "$icon;.") }

& $Python @pyArgs
if ($LASTEXITCODE -ne 0) { Write-Bad "PyInstaller 失败（退出码 $LASTEXITCODE）"; exit 1 }

# ---------------------------------------------------------------- 整理产物

Write-Step "整理产物"

$exePath = ""
if ($Onedir) {
  $folder = Join-Path $dist $ASCII
  if (-not (Test-Path -LiteralPath $folder)) { Write-Bad "没有生成 $folder"; exit 1 }

  $target = Join-Path $dist $appName
  if (Test-Path -LiteralPath $target) { Remove-Item -LiteralPath $target -Recurse -Force }
  Move-Item -LiteralPath $folder -Destination $target

  $inner = Join-Path $target "$ASCII.exe"
  $renamed = Join-Path $target "$appName.exe"
  if (Test-Path -LiteralPath $inner) { Move-Item -LiteralPath $inner -Destination $renamed -Force }
  $exePath = $renamed
  Write-Ok "目录 $target"
} else {
  $raw = Join-Path $dist "$ASCII.exe"
  if (-not (Test-Path -LiteralPath $raw)) { Write-Bad "没有生成 $raw"; exit 1 }
  $exePath = Join-Path $dist "$appName.exe"
  Copy-Item -LiteralPath $raw -Destination $exePath -Force
  Write-Ok "文件 $exePath"
}
Write-Info ("{0} MB" -f [math]::Round((Get-Item -LiteralPath $exePath).Length / 1MB, 1))

# ---------------------------------------------------------------- 冒烟自检
# 用 .NET Process 而不是 Start-Process：后者在受限环境下会 Access denied。
# 一律带 --headless，避免弹出控制窗口。

if (-not $SkipCheck) {
  Write-Step "冒烟自检"

  $port = 8791
  $psi = New-Object System.Diagnostics.ProcessStartInfo
  $psi.FileName = $exePath
  $psi.Arguments = "--headless --port $port"
  $psi.UseShellExecute = $false
  $psi.CreateNoWindow = $true
  $psi.WorkingDirectory = (Split-Path $exePath)

  $proc = $null
  try { $proc = [System.Diagnostics.Process]::Start($psi) }
  catch { Write-Bad "无法启动 exe：$($_.Exception.Message)"; exit 1 }

  $up = $false
  for ($i = 1; $i -le 30; $i++) {
    Start-Sleep -Milliseconds 700
    if ($proc.HasExited) { break }
    try {
      $null = Invoke-WebRequest -Uri "http://127.0.0.1:$port/index.html" -UseBasicParsing -TimeoutSec 2
      $up = $true; break
    } catch { }
  }

  $fail = 0
  if (-not $up) {
    $fail++
    if ($proc.HasExited) {
      Write-Bad "exe 启动后立即退出，退出码 $($proc.ExitCode)"
      if ($Onedir) { Write-Info "目录版不该如此，请检查 web 资源完整性" }
      else { Write-Info "单文件版常见原因：解压临时目录失败。改用 -Onedir。" }
      try { $proc.Kill() } catch { }
    } else {
      Write-Bad "等待超时，服务未就绪"
      try { $proc.Kill() } catch { }
    }
  } else {
    Write-Ok "服务已就绪"
    foreach ($p in @('index.html', 'assets/macos.css', 'js/app.js', 'js/tex.js',
                     'data/questions.js', 'assets/source/Test1/Test1-1.jpg')) {
      try {
        $r = Invoke-WebRequest -Uri ("http://127.0.0.1:$port/" + $p) -UseBasicParsing -TimeoutSec 10
        Write-Host ("      {0}  {1}" -f $r.StatusCode, $p)
      } catch { $fail++; Write-Bad "$p 不可访问" }
    }
    try {
      $r = Invoke-WebRequest -Uri "http://127.0.0.1:$port/data/questions.js" -UseBasicParsing -TimeoutSec 10
      $ct = $r.Headers['Content-Type']
      if ($ct -like '*javascript*') { Write-Ok "MIME 正确：$ct" }
      else { $fail++; Write-Bad "MIME 错误：$ct（ES module 会被浏览器拒绝）" }
    } catch { $fail++; Write-Bad "MIME 检查失败" }

    try { $proc.Kill() } catch { }
  }

  if ($fail -gt 0) { Write-Bad "自检有 $fail 项失败"; exit 1 }
  Write-Ok "自检通过"
}

# ---------------------------------------------------------------- 目录版打 zip

if ($Onedir) {
  Write-Step "压缩为 zip"
  $target = Join-Path $dist $appName
  $zip = Join-Path $dist "$appName-便携版.zip"
  if (Test-Path -LiteralPath $zip) { Remove-Item -LiteralPath $zip -Force }
  Compress-Archive -Path $target -DestinationPath $zip -CompressionLevel Optimal
  Write-Ok ("{0}  ({1} MB)" -f $zip, [math]::Round((Get-Item -LiteralPath $zip).Length / 1MB, 1))
}

Write-Host ""
Write-Host "完成。" -ForegroundColor Green
Write-Host ""
Write-Host "  运行：$exePath"
Write-Host "  换题库不用重新打包：在 exe 同目录放一个 web\ 文件夹即可覆盖内置资源"
