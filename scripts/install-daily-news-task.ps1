$ErrorActionPreference = "Stop"

$taskName = "Aula 2026 - Actualizar noticias"
$projectDir = Split-Path -Parent $PSScriptRoot
$updaterPath = Join-Path $PSScriptRoot "update-news.mjs"
$nodeCommand = Get-Command node -ErrorAction Stop

$action = New-ScheduledTaskAction `
  -Execute $nodeCommand.Source `
  -Argument "`"$updaterPath`"" `
  -WorkingDirectory $projectDir

$trigger = New-ScheduledTaskTrigger -Daily -At "06:15"
$settings = New-ScheduledTaskSettingsSet `
  -StartWhenAvailable `
  -ExecutionTimeLimit (New-TimeSpan -Minutes 10)

Register-ScheduledTask `
  -TaskName $taskName `
  -Action $action `
  -Trigger $trigger `
  -Settings $settings `
  -Description "Actualiza diariamente las noticias oficiales de Aula 2026." `
  -Force | Out-Null

Write-Output "Tarea instalada: $taskName"
