function CommandExists {
    param ([string]$CommandName)
    return [bool](Get-Command $CommandName -ErrorAction SilentlyContinue)
}