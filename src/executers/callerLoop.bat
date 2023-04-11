@echo off
:loop
node C:\CopyFiles_Cnab\src\moveFiles.js
timeout /t 60
goto loop