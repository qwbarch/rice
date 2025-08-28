function CreateSymlink {
    param(
        [string]$FilePath,    # Target file/folder (existing)
        [string]$SymlinkPath  # Link to be created
    )

    $directory = Split-Path $SymlinkPath

    # Create parent directory if it doesn't exist.
    if (-not (Test-Path $directory)) {
        New-Item -Path $directory -ItemType Directory -Force | Out-Null
    }

    # Delete the symlink if it already exists.
    if (Test-Path $SymlinkPath) {
        Remove-Item $SymlinkPath -Recurse -Force
    }

    # Create the symbolic link at $SymlinkPath pointing to $FilePath
    New-Item -Path $SymlinkPath -ItemType SymbolicLink -Target $FilePath | Out-Null
}

function CreateConfigSymlinks {
    $username = (Get-WmiObject Win32_ComputerSystem).UserName.Split('\')[-1]
    $userProfile = (Get-ItemProperty "HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion\ProfileList\*" | Where-Object { $_.ProfileImagePath -like "*\$username" }).ProfileImagePath

    $config = "config"
    $zebar = "$userProfile\.glzr\zebar"
    $komorebi = $userProfile
    $whkd = "$userProfile\.config"

    # Zebar.
    CreateSymlink -FilePath "$config\zebar\settings.json" -SymlinkPath "$zebar\settings.json"
    CreateSymlink -FilePath "sidebar" -SymlinkPath "$zebar\sidebar"

    # Komorebi.
    CreateSymlink -FilePath "$config\komorebi\applications.json" -SymlinkPath "$komorebi\applications.json"
    CreateSymlink -FilePath "$config\komorebi\komorebi.json" -SymlinkPath "$komorebi\komorebi.json"
    CreateSymlink -FilePath "$config\komorebi\applications.json" -SymlinkPath "$komorebi\applications.json"
    CreateSymlink -FilePath "$config\komorebi\whkdrc" -SymlinkPath "$whkd\whkdrc"

    # Flow launcher.
    CreateSymlink -FilePath "$config\flow-launcher\Settings.json" -SymlinkPath "$(scoop prefix flow-launcher)\app-1.20.2\UserData\Settings\Settings.json"
}