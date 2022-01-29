@echo off
echo.

:: Check if installed
openssl version 2> Nul
if "%errorlevel%" == "9009" (
    echo OpenSSL is not installed! Please install OpenSSL and run this script again! 
    echo.
    echo OR: 
    echo    - You can also use https://cryptotools.net/rsagen to   
    echo      generate a keypair and manually paste them into 
    echo      .certs/private.pem and .certs/public.pem!   

    goto end
) 

:: Prepare
del /f /s /q .certs 1>nul
rmdir /s /q .certs 
mkdir ./.certs

:: Private Key 
openssl genrsa -out ./.certs/private.pem 2048
echo Created .certs/private.pem

:: Public Key
openssl rsa -in ./.certs/private.pem -outform PEM -pubout -out ./.certs/public.pem
echo Created .certs/public.pem

:end
echo.
