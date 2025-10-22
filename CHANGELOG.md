# Changelog

All notable changes to the "VS Code DevTools Logger" extension will be documented in this file.

## [1.0.4] - 2025-10-22

### Added
- 🎉 **Human-readable timestamps** - Automatic conversion from Chromium format to `YYYY-MM-DD HH:MM:SS.mmm`
- ⚡ **Real-time formatting** - Background timer formats timestamps every 500ms
- 📝 Separate raw and formatted log files for better organization
- 🚀 Enhanced VBS launcher with automatic formatter startup
- 📖 Comprehensive README with multiple launch methods

### Changed
- Log output now uses two files: `vscode-devtools-raw.log` (raw) and `vscode-devtools.log` (formatted)
- Extension now includes built-in timestamp formatter (no external dependencies)

### Fixed
- Timestamps are now human-readable instead of cryptic Chromium format
- Real-time formatting ensures logs are always readable

## [1.0.3] - 2025-10-22

### Added
- Initial attempt at timestamp formatting via external PowerShell process

## [1.0.2] - 2025-10-22

### Added
- Timestamp formatting function
- Command to show formatted log

## [1.0.1] - 2025-10-22

### Added
- Extension metadata and branding
- Author information

## [1.0.0] - 2025-10-22

### Added
- Initial release
- Basic DevTools console logging
- Auto-clear on reload functionality
- Silent VBS launcher script
- Commands to view logs and open log folder

---

## Release Notes Format

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
