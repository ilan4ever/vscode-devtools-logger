' Silent launcher for VS Code with DevTools logging
' Completely invisible - no windows, no consoles

Set objShell = CreateObject("WScript.Shell")
Set objFSO = CreateObject("Scripting.FileSystemObject")

' Kill all VS Code processes (hidden)
objShell.Run "taskkill /F /IM Code.exe", 0, True
WScript.Sleep 2000

' Create logs directory if needed
If Not objFSO.FolderExists("C:\logs") Then
    objFSO.CreateFolder("C:\logs")
End If

' Clear previous log
If objFSO.FileExists("C:\logs\vscode-devtools.log") Then
    objFSO.DeleteFile("C:\logs\vscode-devtools.log")
End If

' Create timestamp formatter PowerShell script
Dim psScript
psScript = "C:\logs\format-log.ps1"
Set psFile = objFSO.CreateTextFile(psScript, True)
psFile.WriteLine "$raw = 'C:\logs\vscode-devtools-raw.log'"
psFile.WriteLine "$formatted = 'C:\logs\vscode-devtools.log'"
psFile.WriteLine "while ($true) {"
psFile.WriteLine "    if (Test-Path $raw) {"
psFile.WriteLine "        $content = Get-Content $raw -Raw -ErrorAction SilentlyContinue"
psFile.WriteLine "        if ($content) {"
psFile.WriteLine "            $lines = $content -split ""`n"""
psFile.WriteLine "            $output = @()"
psFile.WriteLine "            foreach ($line in $lines) {"
psFile.WriteLine "                if ($line -match '^\[(\d+):(\d{2})(\d{2})/(\d{2})(\d{2})(\d{2})\.(\d+):') {"
psFile.WriteLine "                    $year = (Get-Date).Year"
psFile.WriteLine "                    $month = $matches[2]"
psFile.WriteLine "                    $day = $matches[3]"
psFile.WriteLine "                    $hour = $matches[4]"
psFile.WriteLine "                    $minute = $matches[5]"
psFile.WriteLine "                    $second = $matches[6]"
psFile.WriteLine "                    $ms = $matches[7]"
psFile.WriteLine "                    $timestamp = ""$year-$month-$day $hour:$minute:$second.$ms"""
psFile.WriteLine "                    $rest = $line -replace '^\[(\d+):(\d{2})(\d{2})/(\d{2})(\d{2})(\d{2})\.(\d+):', ''"
psFile.WriteLine "                    $output += ""[$timestamp]$rest"""
psFile.WriteLine "                } else {"
psFile.WriteLine "                    $output += $line"
psFile.WriteLine "                }"
psFile.WriteLine "            }"
psFile.WriteLine "            $output -join ""`n"" | Set-Content $formatted -Force"
psFile.WriteLine "        }"
psFile.WriteLine "    }"
psFile.WriteLine "    Start-Sleep -Milliseconds 500"
psFile.WriteLine "}"
psFile.Close

' Set environment variables to log to raw file
Set objEnv = objShell.Environment("Process")
objEnv("ELECTRON_ENABLE_LOGGING") = "1"
objEnv("ELECTRON_LOG_FILE") = "C:\logs\vscode-devtools-raw.log"

' Start the formatter in background
objShell.Run "powershell.exe -WindowStyle Hidden -ExecutionPolicy Bypass -File """ & psScript & """", 0, False

' Launch VS Code with workspace (completely hidden, don't wait)
objShell.Run "cmd /c code ""C:\dev\continue-dev\continue-speech.code-workspace""", 0, False
