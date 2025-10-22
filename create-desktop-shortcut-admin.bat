@echo off
echo Creating desktop shortcut in Public Desktop...
copy "%USERPROFILE%\Desktop\VS Code DevTools Logger.lnk" "%PUBLIC%\Desktop\" /Y
if %ERRORLEVEL% EQU 0 (
    echo.
    echo SUCCESS! Shortcut created on your desktop!
    echo Look for "VS Code DevTools Logger" icon on your desktop.
) else (
    echo.
    echo ERROR: Could not create shortcut.
    echo Make sure you run this file as Administrator!
)
echo.
pause
