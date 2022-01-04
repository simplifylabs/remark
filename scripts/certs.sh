#!/bin/bash
# certs.sh

# Colors
FgGreen='\e[32m'
FgBlue='\e[34m'
FgWhite='\e[37m'

echo
printf "${FgBlue}[INFO]:${FgWhite} Creating certs...\n" 
echo

# Prepare
# rm -rf .certs/ && mkdir .certs

# Private Key 
openssl genrsa -out .certs/private.pem 2048 2> /dev/null 
printf "${FgGreen}[SUCCESS]:${FgWhite} Created .certs/private.pem\n" 

# Public Key
openssl rsa -in .certs/private.pem -outform PEM -pubout -out .certs/public.pem 2> /dev/null
printf "${FgGreen}[SUCCESS]:${FgWhite} Created .certs/public.pem\n" 

echo
