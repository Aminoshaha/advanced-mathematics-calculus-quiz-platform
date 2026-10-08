# 获取固定版本的官方 SDK，下载后校验 SHA-256；不安装或修改系统。
$ErrorActionPreference = 'Stop'
$version = '1.0.3650.58'
$vendor = Join-Path $PSScriptRoot 'vendor'
$target = Join-Path $vendor $version
$package = Join-Path $vendor 'webview2.nupkg'
$expectedHash = '911A472128C82AC8BAA0C486C23342CC9DD6E7DC50D754E676726642CA065C60'
if (Test-Path -LiteralPath "$target\lib\net462\Microsoft.Web.WebView2.Core.dll") {
  Write-Output "WebView2 SDK $version 已就绪"
  exit 0
}
New-Item -ItemType Directory -Path $vendor -Force | Out-Null
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
if (-not (Test-Path -LiteralPath $package)) {
  Invoke-WebRequest -Uri "https://api.nuget.org/v3-flatcontainer/microsoft.web.webview2/$version/microsoft.web.webview2.$version.nupkg" -OutFile $package -UseBasicParsing -TimeoutSec 120
}
if ((Get-FileHash -LiteralPath $package -Algorithm SHA256).Hash -ne $expectedHash) {
  throw 'SDK 校验失败，请移走 vendor/webview2.nupkg 后重试。'
}
if (Test-Path -LiteralPath $target) { throw '存在不完整 SDK 目录，请先移走对应版本目录后重试。' }
Add-Type -AssemblyName System.IO.Compression.FileSystem
[IO.Compression.ZipFile]::ExtractToDirectory($package, $target)
Write-Output "WebView2 SDK $version 下载校验完成"
