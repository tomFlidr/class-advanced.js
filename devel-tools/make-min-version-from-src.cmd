:: Minimize source code from file "../src/class.src.js" 
:: with Google Closure Compiller (https://github.com/google/closure-compiler) in advanced mode
:: and overwrite file "../src/class.min.js"

:: initialization
@setlocal EnableDelayedExpansion
@set sourceFile=../src/class.src.js
@set resultFile=../src/class.min.js
@set initialJsComment=
@set initialJsCommentLastLine="*/"
@set newLine=^


:: delete possible temporary files from previous run
@cd bin
@if exist comment.js del comment.js
@if exist result.js del result.js
@cd ..

:loop
:: read initial javascript comment from source "../src/class.src.js" and save it in temporary file comment.js
@for /f "Tokens=* Delims=" %%l in (!sourceFile!) do @(
	@set initialJsComment=!initialJsComment!%%l
	@if "%%l" == %initialJsCommentLastLine% (
		goto :break
	) else (
		@set initialJsComment=!initialJsComment!!newLine!
	)
)
:break
@echo !initialJsComment!>bin/comment.js

:: compile source with google closure compiller in advanced mode and save it in temporary file result.js
@java -jar bin/compiler.jar --compilation_level ADVANCED_OPTIMIZATIONS --env BROWSER --formatting PRETTY_PRINT --js %sourceFile% --hide_warnings_for %sourceFile% --js_output_file bin/result.js --output_wrapper "var %%output%%"

:: remove all new line chars in minimized temporary file result.js
@cd bin
::@call jrepl "\n" "" /M /F result.js /O -
@cd ..

:: delete previous result file and complete initial comment with new minimized result into result file
@if exist "!resultFile!" del "!resultFile!"

@cd bin
@for %%f in (comment.js result.js) do @(
	@type "%%f" >> ../!resultFile!
)
@cd ..

:: delete temporary files
@cd bin
@if exist comment.js del comment.js
@if exist result.js del result.js
@cd ..

:: echo done and pause to see result
@echo DONE
@pause