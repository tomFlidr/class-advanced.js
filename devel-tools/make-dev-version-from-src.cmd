:: Replace all occurrences of object['propertyToNotMinimized'] from source file "../src/class.src.js" 
:: into standard script form: object.propertyToNotMinimized and overwrite file "../src/class.dev.js"
:: Thanks for JScript regexp in command line from: http://www.dostips.com/forum/viewtopic.php?t=6044

:: initialization
@setlocal EnableDelayedExpansion
@set sourceFile=../src/class.src.js
@set resultFile=../src/class.dev.js

:: replace all syntax like object['propertyToNotMinimized'] to syntax like object.propertyToNotMinimized
@call bin/jrepl.bat "\[\'([^']*)\'\]" ".$1" /M /F %sourceFile% /O %resultFile%

:: echo done and pause to see result
@echo "DONE"
@pause