@echo off
title AeroLookup - Push to GitHub
echo ==============================================
echo  Authenticating & Pushing to GitHub...
echo ==============================================
echo.

set "PATH=C:\Program Files\nodejs;C:\Program Files\GitHub CLI;%LOCALAPPDATA%\Programs\MinGit\cmd;%PATH%"

echo Checking GitHub login status...
call "C:\Program Files\GitHub CLI\gh.exe" auth status
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Launching GitHub Web Login...
    call "C:\Program Files\GitHub CLI\gh.exe" auth login --web
)

echo.
echo Pushing commits to origin main...
call "%LOCALAPPDATA%\Programs\MinGit\cmd\git.exe" push -u origin main

echo.
echo Done!
pause
