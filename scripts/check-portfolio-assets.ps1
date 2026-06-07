$ErrorActionPreference = "Stop"

$requiredFiles = @(
  "public/glb/SM_Cornelio_Idle.glb",
  "public/package-descriptions/package_description.json"
)

foreach ($file in $requiredFiles) {
  if (-not (Test-Path $file)) {
    throw "Missing required portfolio asset: $file"
  }

  $size = (Get-Item $file).Length
  Write-Host "OK $file ($([Math]::Round($size / 1MB, 2)) MB)"
}

Write-Host "Portfolio public assets are ready for Vercel."
