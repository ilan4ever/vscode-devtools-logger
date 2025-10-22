# VS Code DevTools Logger v2.0.0 🎉

## What's New

This major release brings **human-readable timestamps** to your DevTools logs!

### ✨ Key Features

#### 🕐 Human-Readable Timestamps
No more cryptic Chromium timestamps! Logs now display in a clear, readable format:

**Before:**
```
[5828:1022/220130.241:INFO:CONSOLE:526] "Extension Host loaded"
```

**After:**
```
[2025-10-22 22:01:30.241] INFO:CONSOLE:526] "Extension Host loaded"
```

#### ⚡ Real-Time Formatting
- Background formatter runs automatically every 500ms
- No manual intervention needed
- Always see formatted logs instantly

#### 📁 Dual Log System
- `vscode-devtools-raw.log` - Raw Chromium output (internal)
- `vscode-devtools.log` - **Formatted, human-readable logs** ← Use this!

### 🚀 Installation & Usage

1. **Install the extension** from the `.vsix` file
2. **Run the launcher**: Double-click `restart-vscode-silent.vbs`
3. **View logs**: Press `Ctrl+Shift+P` → `DevTools Logger: Show DevTools Console Log`

### 📦 What's Included

- VS Code extension (`.vsix`)
- Silent launcher script (`restart-vscode-silent.vbs`)
- Comprehensive README with multiple launch methods
- Changelog documenting all versions

### 🎯 Perfect For

- 🐛 **Extension Development** - Track your extension's console output
- 🔍 **Debugging** - Analyze VS Code internal behavior
- 📊 **Performance Analysis** - Monitor console messages over time
- 📝 **Documentation** - Create bug reports with complete logs

### 🛠️ Technical Details

- Built-in timestamp formatter (no external dependencies)
- Auto-clear on reload (mirrors DevTools Console)
- Minimal performance impact
- Works on Windows (launcher is Windows-specific, but extension is cross-platform)

### 📝 Requirements

- VS Code 1.70.0 or higher
- Windows OS (for VBS launcher)

---

## Installation Instructions

### From VSIX File
1. Download `vscode-devtools-logger-2.0.0.vsix`
2. Open VS Code
3. Press `Ctrl+Shift+P`
4. Run: `Extensions: Install from VSIX...`
5. Select the downloaded file

### Enable Logging
1. Close VS Code
2. Run `restart-vscode-silent.vbs`
3. VS Code restarts with logging enabled

---

## Full Changelog

See [CHANGELOG.md](CHANGELOG.md) for complete version history.

---

**Happy Debugging! 🎉**

Made with ❤️ by Ilan Aviv
