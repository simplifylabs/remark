#!/bin/bash
# keys.sh

# Colors
FgGreen='\e[32m'
FgBlue='\e[34m'
FgWhite='\e[37m'

echo
printf "${FgBlue}[INFO]:${FgWhite} Creating certs...\n" 
echo

# Prepare
rm -rf .certs/ && mkdir .certs

# Private Key 
ssh-keygen -t rsa -b 4096 -m PEM -f .certs/private.pem
printf "${FgGreen}[SUCCESS]:${FgWhite} Created .certs/private.pem\n" 

# Public Key
openssl rsa -in .certs/private.pem -pubout -outform PEM -out .certs/public.pem
printf "${FgGreen}[SUCCESS]:${FgWhite} Created .certs/public.pem\n" 

# Remove unused file
rm .certs/private.pem.pub
