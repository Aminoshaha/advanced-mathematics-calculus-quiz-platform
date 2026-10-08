param()
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$sdk = Join-Path $PSScriptRoot 'vendor\1.0.3650.58'
$output = Join-Path $root 'dist\高等数学题库-桌面版'
$compiler = 'C:\Windows\Microsoft.NET\Framework64\v4.0.30319\csc.exe'
if (-not (Test-Path -LiteralPath $compiler)) { throw '需要 Windows 自带的 .NET Framework 4.x 编译器' }
if (-not (Test-Path -LiteralPath "$sdk\lib\net462\Microsoft.Web.WebView2.Core.dll")) { throw '缺少官方 WebView2 SDK，请查看 desktop/README.md' }
New-Item -ItemType Directory -Path $output -Force | Out-Null
Copy-Item -LiteralPath "$sdk\lib\net462\Microsoft.Web.WebView2.Core.dll","$sdk\lib\net462\Microsoft.Web.WebView2.WinForms.dll","$sdk\runtimes\win-x64\native\WebView2Loader.dll" -Destination $output -Force
Copy-Item -LiteralPath "$root\web" -Destination $output -Recurse -Force
Copy-Item -LiteralPath "$root\exe\app.ico" -Destination $output -Force
Copy-Item -LiteralPath "$PSScriptRoot\self-test.js" -Destination $output -Force
Copy-Item -LiteralPath "$PSScriptRoot\storage.js" -Destination $output -Force
Copy-Item -LiteralPath "$sdk\LICENSE.txt" -Destination "$output\WebView2-LICENSE.txt" -Force
Copy-Item -LiteralPath "$sdk\NOTICE.txt" -Destination "$output\WebView2-NOTICE.txt" -Force
$arguments = @('/nologo','/target:winexe','/platform:x64','/optimize+',"/out:$output\高等数学题库.exe",'/reference:System.Windows.Forms.dll','/reference:System.Drawing.dll','/reference:System.Web.Extensions.dll',"/reference:$output\Microsoft.Web.WebView2.Core.dll","/reference:$output\Microsoft.Web.WebView2.WinForms.dll", "/win32icon:$root\exe\app.ico", "/win32manifest:$PSScriptRoot\app.manifest", "$PSScriptRoot\Program.cs")
& $compiler @arguments
if ($LASTEXITCODE -ne 0) { throw '桌面程序编译失败' }
@'
<?xml version="1.0" encoding="utf-8"?>
<configuration><startup><supportedRuntime version="v4.0" sku=".NETFramework,Version=v4.6.2" /></startup></configuration>
'@ | Set-Content -LiteralPath "$output\高等数学题库.exe.config" -Encoding UTF8
Write-Output $output
