@echo off
title BioLink Generator MVP Venda
cd /d "%~dp0"
echo ==========================================
echo  BioLink Generator - Iniciando projeto
echo ==========================================
echo.
if not exist package.json (
  echo ERRO: package.json nao encontrado nesta pasta.
  echo Abra este arquivo dentro da pasta principal do projeto.
  pause
  exit /b 1
)
where npm >nul 2>nul
if errorlevel 1 (
  echo ERRO: Node.js / npm nao encontrado.
  echo Instale o Node.js LTS em https://nodejs.org
  pause
  exit /b 1
)
echo Instalando dependencias...
call npm install
if errorlevel 1 (
  echo.
  echo Erro ao instalar dependencias.
  pause
  exit /b 1
)
echo.
echo Iniciando servidor...
echo Depois abra no navegador: http://localhost:3000
echo No celular, use o IP do PC, exemplo: http://192.168.0.7:3000
echo.
call npm run dev -- -H 0.0.0.0
pause
