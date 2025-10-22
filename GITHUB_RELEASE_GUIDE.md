# GitHub Release Guide - VS Code DevTools Logger v2.0.0

## 📁 Files to Push to GitHub

### Essential Files (push these):
```
.gitignore                          # Excludes temporary/build files
CHANGELOG.md                        # Version history
extension.js                        # Main extension code
icon.png                            # Extension icon
LICENSE                             # MIT License
package.json                        # Extension manifest
README.md                           # Comprehensive documentation
restart-vscode-silent.vbs          # Silent launcher script
RELEASE_NOTES_v2.0.0.md            # Release notes for v2.0.0
```

### Files to Include in GitHub Release (but not in repo):
```
vscode-devtools-logger-2.0.0.vsix  # Packaged extension for download
```

## 🚀 GitHub Release Steps

### 1. Initialize Git Repository (if not already done)
```bash
cd C:\dev\console-logger-extension
git init
git add .gitignore CHANGELOG.md extension.js icon.png LICENSE package.json README.md restart-vscode-silent.vbs
git commit -m "Initial release v2.0.0 - Human-readable timestamps"
```

### 2. Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `vscode-devtools-logger`
3. Description: "VS Code extension that captures DevTools Console output with human-readable timestamps"
4. Public repository
5. Do NOT initialize with README (we already have one)
6. Click "Create repository"

### 3. Push to GitHub
```bash
git remote add origin https://github.com/ilanaviv/vscode-devtools-logger.git
git branch -M main
git push -u origin main
```

### 4. Create GitHub Release
1. Go to your repository on GitHub
2. Click "Releases" → "Create a new release"
3. **Tag version**: `v2.0.0`
4. **Release title**: `v2.0.0 - Human-Readable Timestamps`
5. **Description**: Copy content from `RELEASE_NOTES_v2.0.0.md`
6. **Attach file**: Upload `vscode-devtools-logger-2.0.0.vsix`
7. Check "Set as the latest release"
8. Click "Publish release"

## 📝 Release Title & Tag

- **Tag**: `v2.0.0`
- **Title**: `v2.0.0 - Human-Readable Timestamps`

## 📋 Release Description (Copy/Paste)

Use the content from `RELEASE_NOTES_v2.0.0.md`

## 🎯 Repository Settings

### About Section (top right on GitHub)
- **Description**: "VS Code extension that captures DevTools Console output with human-readable timestamps"
- **Website**: (leave blank or add your website)
- **Topics/Tags**: `vscode-extension`, `devtools`, `logging`, `debugging`, `electron`, `typescript`

### Repository Features
- ✅ Issues
- ✅ Discussions (optional)
- ✅ Wiki (optional)

## 📦 Post-Release Checklist

- [ ] Repository created on GitHub
- [ ] Code pushed to main branch
- [ ] Release v2.0.0 created with tag
- [ ] VSIX file attached to release
- [ ] Release notes added
- [ ] Repository description and topics set
- [ ] README displays correctly on GitHub

## 🔗 Important Links After Release

- Repository: `https://github.com/ilanaviv/vscode-devtools-logger`
- Releases: `https://github.com/ilanaviv/vscode-devtools-logger/releases`
- Latest Release: `https://github.com/ilanaviv/vscode-devtools-logger/releases/tag/v2.0.0`
- Issues: `https://github.com/ilanaviv/vscode-devtools-logger/issues`

## 📢 Announcement Template

Share on social media, forums, or communities:

```
🎉 Just released VS Code DevTools Logger v2.0.0!

✨ New Features:
- Human-readable timestamps (no more cryptic formats!)
- Real-time log formatting
- Automatic console capture

Perfect for extension developers and VS Code debugging.

📦 Download: https://github.com/ilanaviv/vscode-devtools-logger/releases/tag/v2.0.0

#VSCode #Extension #Debugging
```

---

## 🚨 Important Notes

1. **Don't commit VSIX files** - They're excluded by `.gitignore` and should only be attached to releases
2. **Version consistency** - Ensure `package.json` version matches the git tag
3. **Test before release** - Install the VSIX locally and verify it works
4. **Update CHANGELOG.md** - For future releases, add entries at the top

---

**Ready to publish? Follow the steps above and your extension will be live on GitHub! 🚀**
