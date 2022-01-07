#!/bin/bash
# executor.sh

# Colors
FgBlue='\e[34m'
FgWhite='\e[37m'

echo
printf "${FgBlue}[INFO]:${FgWhite} Trying to rebuild custom executors...\n" 

cd tools/executors/
tsc

printf "${FgBlue}[INFO]:${FgWhite} Finished rebuild!\n" 
echo
