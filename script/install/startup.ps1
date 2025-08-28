function CreateShortcut {
    param (
        [string]$FilePath,
        [string]$ShortcutPath
    )

    $directory = Split-Path $ShortcutPath

    # Create parent directory if it doesn't exist.
    if (-not (Test-Path $directory)) {
        New-Item -Path $directory -ItemType Directory -Force | Out-Null
    }

    # Delete the shortcut if it already exists.
    if (Test-Path $ShortcutPath) {
        Remove-Item $ShortcutPath -Force
    }

    $shell = New-Object -ComObject WScript.Shell
    $shortcut = $shell.CreateShortcut($ShortcutPath)
    $shortcut.TargetPath = $FilePath
    $shortcut.Save()
}

function CreateStartupShortcuts {
    $username = (Get-WmiObject Win32_ComputerSystem).UserName.Split('\')[-1]
    $userProfile = (Get-ItemProperty "HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion\ProfileList\*" | Where-Object { $_.ProfileImagePath -like "*\$username" }).ProfileImagePath
    $startupPath = Join-Path $userProfile 'AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup'

    CreateShortcut -FilePath "$(Get-Location)\script\startup\keybind.ahk" -ShortcutPath "$startupPath\keybind.ahk.lnk"
    CreateShortcut -FilePath "$(Get-Location)\script\startup\komorebi.bat" -ShortcutPath "$startupPath\komorebi.bat.lnk"
    CreateShortcut -FilePath "$(Get-Location)\script\startup\zebar.bat" -ShortcutPath "$startupPath\zebar.bat.lnk"
}