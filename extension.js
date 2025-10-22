// VS Code DevTools Logger Extension
// Shows status and provides commands to view the DevTools Console log
// Requires VS Code to be launched with ELECTRON_ENABLE_LOGGING=1
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

const LOG_FILE = 'C:\\logs\\vscode-devtools.log';
const RAW_LOG_FILE = 'C:\\logs\\vscode-devtools-raw.log';

// Format timestamp from Chromium format to human-readable
function formatLogLine(line) {
    const match = line.match(/^\[(\d+):(\d{2})(\d{2})\/(\d{2})(\d{2})(\d{2})\.(\d+):/);
    if (!match) return line;
    
    const year = new Date().getFullYear();
    const month = match[2];
    const day = match[3];
    const hour = match[4];
    const minute = match[5];
    const second = match[6];
    const ms = match[7];
    const timestamp = `${year}-${month}-${day} ${hour}:${minute}:${second}.${ms}`;
    const rest = line.replace(/^\[\d+:\d{4}\/\d{6}\.\d+:/, '');
    
    return `[${timestamp}]${rest}`;
}

function activate(context) {
    // Show welcome view on first install or update
    const previousVersion = context.globalState.get('extensionVersion');
    const currentVersion = context.extension.packageJSON.version;
    
    if (!previousVersion || previousVersion !== currentVersion) {
        // First install or new version - show welcome view
        vscode.commands.executeCommand('devtools-logger.welcomeView.focus');
        context.globalState.update('extensionVersion', currentVersion);
    }
    
    // CRITICAL: Clear log on activation (window reload or startup)
    // This mimics DevTools Console behavior
    if (fs.existsSync(LOG_FILE)) {
        fs.writeFileSync(LOG_FILE, '');
    }
    
    if (fs.existsSync(RAW_LOG_FILE)) {
        fs.writeFileSync(RAW_LOG_FILE, '');
    }
    
    // Start background formatter that continuously formats the raw log
    let lastSize = 0;
    const formatTimer = setInterval(() => {
        try {
            if (fs.existsSync(RAW_LOG_FILE)) {
                const stats = fs.statSync(RAW_LOG_FILE);
                // Only process if file has new content
                if (stats.size > lastSize || stats.size === 0) {
                    lastSize = stats.size;
                    const rawContent = fs.readFileSync(RAW_LOG_FILE, 'utf8');
                    if (rawContent) {
                        const lines = rawContent.split('\n');
                        const formattedLines = lines.map(line => formatLogLine(line));
                        fs.writeFileSync(LOG_FILE, formattedLines.join('\n'), 'utf8');
                    }
                }
            }
        } catch (err) {
            // Silently ignore errors (file might be locked)
        }
    }, 500);
    
    context.subscriptions.push({
        dispose: () => clearInterval(formatTimer)
    });
    
    // Show activation message
    const statusMessage = vscode.window.setStatusBarMessage('$(check) DevTools Logger Active');
    
    // Create output channel for info
    const outputChannel = vscode.window.createOutputChannel('DevTools Logger');
    context.subscriptions.push(outputChannel);
    
    outputChannel.appendLine('='.repeat(60));
    outputChannel.appendLine('VS Code DevTools Logger - ACTIVE');
    outputChannel.appendLine('='.repeat(60));
    outputChannel.appendLine('');
    outputChannel.appendLine(`Log file: ${LOG_FILE}`);
    outputChannel.appendLine('✓ Log cleared on activation (mimics DevTools Console)');
    outputChannel.appendLine('');
    
    if (fs.existsSync(LOG_FILE)) {
        const stats = fs.statSync(LOG_FILE);
        outputChannel.appendLine(`✓ Log file exists (${stats.size} bytes)`);
        outputChannel.appendLine('✓ VS Code was launched with ELECTRON_ENABLE_LOGGING');
    } else {
        outputChannel.appendLine('⚠ Log file not found!');
        outputChannel.appendLine('');
        outputChannel.appendLine('To enable DevTools logging:');
        outputChannel.appendLine('1. Close VS Code');
        outputChannel.appendLine('2. Run: restart-vscode-silent.vbs');
        outputChannel.appendLine('3. VS Code will restart with logging enabled');
    }
    
    outputChannel.appendLine('');
    outputChannel.appendLine('Commands:');
    outputChannel.appendLine('  - DevTools Logger: Show DevTools Console Log');
    outputChannel.appendLine('  - DevTools Logger: Open Logs Folder');
    outputChannel.appendLine('='.repeat(60));
    
    // Command: Show log file (already formatted by background process)
    const showLogCommand = vscode.commands.registerCommand('devtools-logger.showLog', () => {
        if (fs.existsSync(LOG_FILE)) {
            vscode.workspace.openTextDocument(LOG_FILE).then(doc => {
                vscode.window.showTextDocument(doc, { preview: false });
            });
        } else {
            vscode.window.showWarningMessage(
                'DevTools log not found. Launch VS Code with restart-vscode-silent.vbs',
                'Show Instructions'
            ).then(selection => {
                if (selection === 'Show Instructions') {
                    outputChannel.show();
                }
            });
        }
    });
    context.subscriptions.push(showLogCommand);
    
    // Command: Open logs folder
    const openFolderCommand = vscode.commands.registerCommand('devtools-logger.openLogFolder', () => {
        const logDir = path.dirname(LOG_FILE);
        if (fs.existsSync(logDir)) {
            vscode.env.openExternal(vscode.Uri.file(logDir));
        } else {
            vscode.window.showErrorMessage('Logs folder not found: ' + logDir);
        }
    });
    context.subscriptions.push(openFolderCommand);
    
    // Command: Create desktop shortcut
    const createShortcutCommand = vscode.commands.registerCommand('devtools-logger.createDesktopShortcut', () => {
        try {
            // Get extension path
            const extensionPath = context.extensionPath;
            const vbsPath = path.join(extensionPath, 'restart-vscode-silent.vbs');
            
            if (!fs.existsSync(vbsPath)) {
                vscode.window.showErrorMessage('VBS launcher script not found in extension folder!');
                return;
            }
            
            // Get VS Code icon path (use Code.exe icon)
            const vscodeExePath = process.execPath; // Path to Code.exe
            
            // Get desktop path
            const desktopPath = path.join(process.env.PUBLIC || 'C:\\Users\\Public', 'Desktop');
            const personalDesktopPath = path.join(require('os').homedir(), 'Desktop');
            
            // First create shortcut in personal desktop (doesn't need admin)
            const tempShortcutPath = path.join(personalDesktopPath, 'VS Code DevTools Logger.lnk');
            
            // Find VS Code executable path
            const vscodeExe = process.execPath;
            const vscodeIcon = vscodeExe.replace(/\\resources\\app\\.*.exe$/i, '\\Code.exe');
            
            // Create PowerShell script to create shortcut
            const psScript = `
$WScriptShell = New-Object -ComObject WScript.Shell
$Shortcut = $WScriptShell.CreateShortcut("${tempShortcutPath.replace(/\\/g, '\\\\')}")
$Shortcut.TargetPath = "wscript.exe"
$Shortcut.Arguments = '"${vbsPath.replace(/\\/g, '\\\\')}"'
$Shortcut.WorkingDirectory = "${path.dirname(vbsPath).replace(/\\/g, '\\\\')}"
$Shortcut.IconLocation = "${vscodeIcon.replace(/\\/g, '\\\\')},0"
$Shortcut.Description = "Launch VS Code with DevTools logging enabled"
$Shortcut.Save()
Write-Host "Shortcut created in personal desktop"
`;
            
            // Write temp PowerShell script
            const tempPsPath = path.join(require('os').tmpdir(), 'create-shortcut.ps1');
            fs.writeFileSync(tempPsPath, psScript);
            
            // Execute PowerShell script
            const { exec } = require('child_process');
            exec(`powershell.exe -ExecutionPolicy Bypass -File "${tempPsPath}"`, (error, stdout, stderr) => {
                // Clean up temp file
                try { fs.unlinkSync(tempPsPath); } catch (e) {}
                
                if (error) {
                    vscode.window.showErrorMessage(`Failed to create desktop shortcut: ${error.message}`);
                    return;
                }
                
                // Now automatically run the batch file with admin rights to copy to Public Desktop
                const batchFile = path.join(extensionPath, 'create-desktop-shortcut-admin.bat');
                
                if (fs.existsSync(batchFile)) {
                    // Run batch file as administrator
                    exec(`powershell -Command "Start-Process -FilePath '${batchFile}' -Verb RunAs"`, (batchError) => {
                        if (batchError) {
                            vscode.window.showWarningMessage(
                                '⚠️ Shortcut created but needs admin rights to appear on desktop. Click "Run as Admin" and approve the prompt.',
                                'Run as Admin',
                                'Cancel'
                            ).then(selection => {
                                if (selection === 'Run as Admin') {
                                    exec(`powershell -Command "Start-Process -FilePath '${batchFile}' -Verb RunAs"`);
                                }
                            });
                        } else {
                            vscode.window.showInformationMessage(
                                '✅ Desktop shortcut created! Look for "VS Code DevTools Logger" on your desktop.',
                                'OK'
                            );
                        }
                    });
                } else {
                    vscode.window.showInformationMessage(
                        '✅ Shortcut created in your personal desktop.',
                        'OK'
                    );
                }
            });
            
        } catch (error) {
            vscode.window.showErrorMessage(`Error creating shortcut: ${error.message}`);
        }
    });
    context.subscriptions.push(createShortcutCommand);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
