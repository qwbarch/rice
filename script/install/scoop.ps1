function InstallScoop {
    Invoke-RestMethod -Uri https://get.scoop.sh | Invoke-Expression
}

function InstallScoopPackages {
    Write-Host "Importing scoop package list."
    scoop import config\scoop.json
    Write-Host "Finished importing scoop package list."
}