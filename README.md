# VS Code DevTools Logger

A VS Code extension that captures and logs all DevTools Console output to a persistent, human-readable log file. Perfect for debugging extensions, tracking console messages, and analyzing VS Code's internal behavior.

## ✨ Features

- 📝 **Human-Readable Timestamps** - Automatically converts Chromium timestamps to readable format (`2025-10-22 22:08:46.241`)
- 🔄 **Auto-Clear on Reload** - Log clears when VS Code reloads (mirrors DevTools Console behavior)
- ⚡ **Real-Time Formatting** - Timestamps formatted automatically every 500ms
- 🎯 **Easy Access Commands** - Quick commands to view logs and open log folder
- 🚀 **Silent Launcher** - Invisible VBS script to start VS Code with logging enabled
- 📊 **Complete Console Capture** - Captures all console output, errors, warnings, and info messages

## 📦 Installation

### Option 1: From VSIX File
1. Download the latest `.vsix` file from [Releases](https://github.com/ilanaviv/vscode-devtools-logger/releases)
2. Open VS Code
3. Press `Ctrl+Shift+P` and run: `Extensions: Install from VSIX...`
4. Select the downloaded `.vsix` file

### Option 2: From Marketplace (Coming Soon)
Search for "VS Code DevTools Logger" in the VS Code Extensions Marketplace

## 🚀 Quick Start

### Step 1: Enable Logging
To enable DevTools logging, you need to launch VS Code with the `ELECTRON_ENABLE_LOGGING` environment variable:

1. **Close VS Code completely**
2. **Run the launcher script:**
   - Locate `restart-vscode-silent.vbs` in your extension folder
   - Double-click it (no windows will appear - it runs silently)
   - VS Code will restart automatically with logging enabled

### Step 2: View Logs
Once VS Code restarts with the extension active:

1. Press `Ctrl+Shift+P` to open Command Palette
2. Type: `DevTools Logger: Show DevTools Console Log`
3. The formatted log will open in a new editor tab

**Or** use the command: `DevTools Logger: Open Logs Folder` to browse all log files

## 📁 Log Files

The extension creates two log files in `C:\logs\`:

| File | Description |
|------|-------------|
| `vscode-devtools-raw.log` | Raw Chromium log format (internal use) |
| `vscode-devtools.log` | **Formatted log with human-readable timestamps** ← **Use this one!** |

### Example Log Output

**Before (Raw Chromium format):**
```
[5828:1022/220130.241:INFO:CONSOLE:526] "Extension Host loaded"
```

**After (Human-readable format):**
```
[2025-10-22 22:01:30.241] INFO:CONSOLE:526] "Extension Host loaded"
```

## 🛠️ How to Run VS Code with Logging

### Method 1: Silent VBS Launcher (Recommended)
The easiest way to start VS Code with logging enabled:

```vbscript
' Simply double-click: restart-vscode-silent.vbs
' This script will:
' 1. Close all VS Code instances
' 2. Clear old logs
' 3. Set ELECTRON_ENABLE_LOGGING=1
' 4. Launch VS Code with your workspace
' 5. Start background timestamp formatter
```

### Method 2: Manual PowerShell
If you prefer manual control:

```powershell
# Close VS Code
taskkill /F /IM Code.exe

# Set environment variable
$env:ELECTRON_ENABLE_LOGGING = "1"
$env:ELECTRON_LOG_FILE = "C:\logs\vscode-devtools-raw.log"

# Launch VS Code
code "C:\path\to\your\workspace"
```

### Method 3: Batch File
Create a `.bat` file:

```batch
@echo off
taskkill /F /IM Code.exe >nul 2>&1
timeout /t 2 /nobreak >nul
set ELECTRON_ENABLE_LOGGING=1
set ELECTRON_LOG_FILE=C:\logs\vscode-devtools-raw.log
start "" code "C:\path\to\your\workspace"
```

## 🎮 Available Commands

Open Command Palette (`Ctrl+Shift+P`) and search for:

| Command | Description |
|---------|-------------|
| `DevTools Logger: Show DevTools Console Log` | Opens the formatted log file in editor |
| `DevTools Logger: Open Logs Folder` | Opens `C:\logs` in File Explorer |

## 🔧 How It Works

1. **Electron Logging**: VS Code is built on Electron (Chromium). Setting `ELECTRON_ENABLE_LOGGING=1` enables Chromium's console logging to a file
2. **Raw Log Capture**: Chromium writes logs to `vscode-devtools-raw.log` with its native timestamp format
3. **Real-Time Formatting**: The extension runs a background timer (every 500ms) that:
   - Reads the raw log file
   - Converts timestamps from `MMDD/HHMMSS.mmm` to `YYYY-MM-DD HH:MM:SS.mmm`
   - Writes the formatted output to `vscode-devtools.log`
4. **Auto-Clear**: On VS Code reload/restart, both log files are cleared automatically

## 📋 Requirements

- **VS Code**: Version 1.70.0 or higher
- **Operating System**: Windows (VBS launcher is Windows-specific; manual methods work on all platforms)
- **Disk Space**: Minimal (logs are cleared on reload)

## 🐛 Troubleshooting

### No log file appears
- Ensure you launched VS Code using the VBS script or with `ELECTRON_ENABLE_LOGGING=1`
- Check that `C:\logs` folder exists (the extension creates it automatically)

### Timestamps not formatted
- Verify the extension is installed and enabled
- Reload VS Code window (`Ctrl+R` or `Developer: Reload Window`)

### VBS script doesn't work
- Check Windows file path in the script matches your workspace location
- Run the script as Administrator if needed

## 📝 Configuration

The extension uses these default paths:
- **Raw Log**: `C:\logs\vscode-devtools-raw.log`
- **Formatted Log**: `C:\logs\vscode-devtools.log`

To change paths, edit:
- `restart-vscode-silent.vbs` (environment variable)
- `extension.js` (constants at the top)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 👤 Author

**Ilan Aviv**

---

**Enjoy debugging with readable DevTools logs! 🎉**
