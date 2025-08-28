. "$PSScriptRoot\command.ps1"
. "$PSScriptRoot\config.ps1"
. "$PSScriptRoot\scoop.ps1"
. "$PSScriptRoot\startup.ps1"
. "$PSScriptRoot\registry.ps1"

# Set working directory to the calling process's directory.
Set-Location -Path "$(Split-Path -Parent $MyInvocation.MyCommand.Definition)\..\.."

EnableLongPathSupport

Write-Output 'Checking if "scoop" is installed.'
if (CommandExists "scoop") {
    Write-Output '"scoop" command already found. Skipping this step.'
} else {
    Write-Output 'Installing the "scoop" command.'
    InstallScoop
}

InstallScoopPackages

if (-not (Test-Path "..\..\sidebar\node_modules")) {
    Push-Location "sidebar"
    npm install
    Pop-Location
}

Write-Output "Building sidebar."
Push-Location "sidebar"
npm run build
Pop-Location

CreateStartupShortcuts
CreateConfigSymlinks

Write-Host "Finished installation. Please restart your computer to apply the changes."
Read-Host "Press the enter key to close this window"