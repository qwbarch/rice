local wezterm = require 'wezterm'
local config = wezterm.config_builder()

config.font_size = 12

config.window_decorations = "RESIZE"
config.window_background_opacity = 0.9
config.enable_tab_bar = false

-- Start in PowerShell.
config.default_prog = { 'powershell.exe', '-NoLogo' }

return config