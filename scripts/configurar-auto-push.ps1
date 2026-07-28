$ErrorActionPreference = "Stop"

$git = Get-Command git -ErrorAction SilentlyContinue
if (-not $git) {
    $gitPath = "C:\Program Files\Git\cmd\git.exe"
    if (-not (Test-Path $gitPath)) {
        throw "No se encontro Git en el equipo."
    }
    $git = Get-Item $gitPath
}

$repositoryRoot = & $git.Source rev-parse --show-toplevel
if (-not $repositoryRoot) {
    throw "Ejecuta este script dentro del repositorio."
}

& $git.Source -C $repositoryRoot config core.hooksPath .githooks
if ($LASTEXITCODE -ne 0) {
    throw "No se pudo configurar el gancho de Git."
}

Write-Host "Envio automatico activado: cada commit en main se subira a GitHub."
