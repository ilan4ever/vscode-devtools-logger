@echo off
echo Fixing VS Code icon for desktop shortcut...
powershell -Command "$shell = New-Object -ComObject WScript.Shell; $shortcut = $shell.CreateShortcut('%PUBLIC%\Desktop\VS Code DevTools Logger.lnk'); $shortcut.IconLocation = 'C:\Program Files\Microsoft VS Code\Code.exe,0'; $shortcut.Save(); Write-Host 'Icon updated successfully!'"
if %ERRORLEVEL% EQU 0 (
    echo.
    echo SUCCESS! VS Code icon applied!
    echo Desktop will refresh in 3 seconds...
    timeout /t 3 /nobreak >nul
    taskkill /F /IM explorer.exe >nul 2>&1
    start explorer.exe
) else (
    echo ERROR: Could not update icon.
)
echo.
pause
