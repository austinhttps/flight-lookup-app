@echo off
title AeroLookup - Deploy to Vercel
echo ==============================================
echo  Deploying AeroLookup Flight App to Vercel...
echo ==============================================
echo.

set "PATH=C:\Program Files\nodejs;C:\Program Files\GitHub CLI;%LOCALAPPDATA%\Programs\MinGit\cmd;%PATH%"

call "C:\Program Files\nodejs\npx.cmd" vercel

echo.
pause
