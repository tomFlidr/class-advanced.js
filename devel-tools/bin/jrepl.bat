@if (@X)==(@Y) @end /* Harmless hybrid line that begins a JScript comment
@goto :Batch

::JREPL.BAT version 4.2 by Dave Benham
::
::  Release History:
::    2016-06-24 v4.2: Improved the /?Options help.
::    2016-06-23 v4.1: Added /T option examples to the help.
::                     Added ability to request help on a single option or topic.
::    2016-06-19 v4.0: Added the /INC and /EXC options.
::    2016-03-27 v3.8: Bug fix - Hide leaked global variables i, lib, libs, rtn2.
::                     Bug fix - Work around %~f0 bug when command is quoted.
::                     Bug fix - Use /OPTIONS instead of OPTIONS as a variable
::                     name within the option parser so that it is unlikely to
::                     collide with a user defined variable name.
::    2016-01-14 v3.7: Reworked error handling a bit.
::                     Bug fix - \xnn and \unnnn could fail in a regex search
::                     if result was a meta-character and /X option was used.
::    2015-07-15 v3.6: Added /?? option for paged help.
::    2015-06-12 v3.5: Bug fix for $n or $nn in replace string when /T is
::                     used without /J or /JMATCH or /L
::    2015-01-22 v3.4: Bug fix - Use /TEST instead of TEST as a variable name
::                     within the option parser so that it is unlikely to
::                     collide with a user defined variable name.
::    2014-12-24 v3.3: Bug fix for when /JMATCH is combined with /M or /S
::    2014-12-09 v3.2: Bug fix for /T without /JMATCH - fixed dynamic repl func
::                     Added GOTO at top for improved startup performance
::    2014-11-25 v3.1: Added /JLIB option
::                     Exception handler reports when regex is bad
::                     Fix /X bug with extended ASCII
::    2014-11-23 v3.0: Added /JBEGLN and /JENDLN options
::                     Added skip, quit, and lpad() global variables/functions
::                     Exception handler reports when error in user code
::    2014-11-21 v2.2: Bug fix for /T with /L option.
::    2014-11-20 v2.1: Bug fix for /T option when match is an empty string
::    2014-11-17 v2.0: Added /T (translate) and /C (count input lines) options
::    2014-11-14 v1.0: Initial release
::
::============ Documentation ===========
::/INTRO
:::
:::JREPL  Search  Replace  [/Option  [Value]]...
:::JREPL  /?[?][INTRO|OPTIONS|JSCRIPT|RETURN|HELP|/Option|REGEX|REPLACE]
:::
:::  Performs a global regular expression search and replace operation on
:::  each line of input from stdin and prints the result to stdout.
:::
:::  Each parameter may be optionally enclosed by double quotes. The double
:::  quotes are not considered part of the argument. The quotes are required
:::  if the parameter contains a batch token delimiter like space, tab, comma,
:::  semicolon. The quotes should also be used if the argument contains a
:::  batch special character like &, |, etc. so that the special character
:::  does not need to be escaped with ^.
:::
:::  Search  - By default, this is a case sensitive JScript (ECMA) regular
:::            expression expressed as a string.
:::
:::            JScript regex syntax documentation is available at
:::            http://msdn.microsoft.com/en-us/library/ae5bf541(v=vs.80).aspx
:::
:::  Replace - By default, this is the string to be used as a replacement for
:::            each found search expression. Full support is provided for
:::            substituion patterns available to the JScript replace method.
:::
:::            For example, $& represents the portion of the source that matched
:::            the entire search pattern, $1 represents the first captured
:::            submatch, $2 the second captured submatch, etc. A $ literal
:::            can be escaped as $$.
:::
:::            An empty replacement string must be represented as "".
:::
:::            Replace substitution pattern syntax is fully documented at
:::            http://msdn.microsoft.com/en-US/library/efy6s3e6(v=vs.80).aspx
::/OPTIONS
:::
:::  Options:  Behavior may be altered by appending one or more options.
:::  The option names are case insensitive, and may appear in any order
:::  after the Replace argument.
:::
::      /A                     - write Altered lines only
::      /B                     - match Beginning of line
::      /C                     - Count number of source lines
::      /E                     - match End of line
::      /EXC LineNumberList    - EXClude one or more lines
::      /F InFile              - read from File
::      /I                     - Ignore case
::      /INC LineNumberList    - Include one or more lines
::      /J                     - JScript replace expressions
::      /JBEG InitCode         - initialization JScript code
::      /JBEGLN NewLineCode    - line initialization JScript code
::      /JEND FinalCode        - finalization JScript code
::      /JENDLN EndLineCode    - line finalization JScript code
::      /JLIB FileList         - load file(s) of initialization code
::      /JMATCH                - write matching JScript replacements only
::      /L                     - Literal search
::      /M                     - Multi-line mode
::      /N MinWidth            - prefix output with liNe numbers
::      /O OutFile             - write Output to a file
::      /OFF MinWidth          - prefix JMatch output with byte OFFsets
::      /S VarName             - Source is read from a variable
::      /T DelimiterChar       - Translate multiple search/replace pairs
::      /V                     - read search/replace/code from Variables
::      /X                     - enable eXtended escape sequences
::/
:::      /A  - Only write altered lines. Unaltered lines are discarded.
:::            If the /S option is used, then write the result only if
:::            there was a change anywhere in the string. The /A option
:::            is incompatible with the /M option unless the /S option
:::            is also present.
:::
:::      /B  - The Search must match the beginning of a line.
:::            Mostly used with literal searches.
:::
:::      /C  - Count the number of input lines and store the result in global
:::            variable cnt. This value can be useful in JScript code associated
:::            with any of the /Jxxx options.
:::
:::            This option is implicityly enabled if /INC or /EXC contains a
:::            negative value.
:::
:::            This option is incompatible with the /M and /S options.
:::
:::            If the input data is piped or redirected, then the data is first
:::            written to a temporary file, so processing does not start until
:::            the end-of-file is reached.
:::
:::      /E  - The Search must match the end of a line.
:::            Mostly used with literal searches.
:::
:::      /EXC LineNumberList
:::
:::            Exclude (do not search/replace) lines within the LineNumberList.
:::            LineNumberList consists of a comma delimited list of line numbers
:::            and/or line number ranges. A range is specified as begin:end.
:::            Negative values are counted backwards from the end. So a value
:::            of 1 represents the first line, and -1 represents the last line.
:::
:::            Any negative value implicitly activates the /C option.
:::
:::            The default is an empty list (exclude nothing)
:::
:::            Example: Assuming the file contains 25 lines, then the following
:::                     will exclude lines 3, 10, 11, 12, and 24
:::
:::                     /EXC "3,10:12,-2"
:::
:::      /F InFile
:::
:::            Input is read from file InFile instead of stdin.
:::
:::      /I  - Ignore case when searching.
:::
:::      /INC LineNumberList
:::
:::            Only include (search/replace) lines within the LineNumberList.
:::            The syntax for LineNumberList is the same as for the /EXC option.
:::
:::            Any negative value implicitly activates the /C option.
:::
:::            The default is an empty list (include all lines).
:::
:::            The /EXC option takes precedence over the /INC option.
:::
:::            Example: Assuming the file contains 25 lines, then the following
:::                     /INC option includes lines 2, and 4-24 inclusive. But the
:::                     /EXC option excludes lines 6-22 inclusive, so the end
:::                     result searches only lines 2, 4, 5, 23, and 24.
:::
:::                     /INC "2,4:-2" /EXC "6:-4"
:::
:::      /J  - The Replace argument is a JScript expression.
:::            The following variables contain details about each match:
:::
:::              $0 is the substring that matched the Search
:::              $1 through $n are the captured submatch strings
:::              $off is the offset where the match occurred
:::              $src is the original source string
:::
:::      /JBEG InitCode
:::
:::            JScript inititialization code to run prior to loading any input.
:::            This is useful for initializing user defined variables for
:::            accumulating information across matches. The default code is an
:::            empty string.
:::
:::      /JBEGLN NewLineCode
:::
:::            JScript code to run at the beginning of each line, prior to
:::            performing any search on the line. The line content may be
:::            manipulated via the $txt variable. The default code is an empty
:::            string. This option is incompatible with the /M and /S options.
:::
:::      /JEND FinalCode
:::
:::            JScript termination code to run when there is no more input to
:::            read. This is useful for writing summarization results.
:::            The default code is an empty string.
:::
:::      /JENDLN EndLineCode
:::
:::            JScript code to run at the end of each line, after all matches
:::            on the line have been found, but before the result is printed.
:::            The final result can be modified via the $txt variable. Setting
:::            $txt to false discards the line without printing. The $txt value
:::            is ignored if the /JMATCH option has been used. The default
:::            code is an empty string. This option is incompatible with the
:::            /M and /S options.
:::
:::      /JLIB FileList
:::
:::            Specifies one or more files that contain libraries of JScript
:::            code to load before /JBEG is run. Multiple files are delimited
:::            by forward slashes (/). Useful for declaring global variables
:::            and functions in a way that is reusable.
:::
:::      /JMATCH
:::
:::            Write each Replace value on a new line, discarding all text
:::            that does not match the Search. The Replace argument is a
:::            JScript expression with access to the same $ variables available
:::            to the /J option. Replacement values that evaluate to false
:::            are discarded.
:::
:::      /L  - The Search is treated as a string literal instead of a
:::            regular expression. Also, all $ found in the Replace string
:::            are treated as $ literals.
:::
:::      /M  - Multi-line mode. The entire input is read and processed in one
:::            pass instead of line by line, thus enabling search for \n. This
:::            also enables preservation of the original line terminators.
:::            If the /M option is not present, then every printed line is
:::            terminated with carriage return and line feed. The /M option is
:::            incompatible with the /A option unless the /S option is also
:::            present.
:::
:::            Note: If working with binary data containing NULL bytes,
:::                  then the /M option must be used.
:::
:::      /N MinWidth
:::
:::            Precede each output line with the line number of the source line,
:::            followed by a colon. Line 1 is the first line of the source.
:::
:::            The MinWidth value specifies the minimum number of digits to
:::            display. The default value is 0, meaning do not display the
:::            line number. A value of 1 diplays the line numbers without any
:::            zero padding.
:::
:::            The /N option is ignored if the /M or /S option is used.
:::
:::      /O OutFile
:::
:::            Output is written to file OutFile instead of stdout.
:::
:::            A value of "-" replaces the InFile with the output. The output
:::            is first written to a temporary file with the same name as InFile
:::            with .new appended. Upon completion, the temporary file is moved
:::            to replace the InFile.
:::
:::      /OFF MinWidth
:::
:::            Ignored unless the /JMATCH option is used. Precede each output
:::            line with the offset of the match within the original source
:::            string, followed by a colon. Offset 0 is the first character of
:::            the source string. The offset follows the line number if the /N
:::            option is also used.
:::
:::            The MinWidth value specifies the minimum number of digits to
:::            display. The default value is 0, meaning do not display the
:::            offset. A value of 1 displays the offsets without any zero
:::            padding.
:::
:::      /S VarName
:::
:::            The source is read from environment variable VarName instead
:::            of from stdin. Without the /M option, ^ anchors the beginning
:::            of the string, and $ the end of the string. With the /M option,
:::            ^ anchors the beginning of a line, and $ the end of a line.
:::
:::            The variable name cannot match any of the option names, nor can
:::            it be /TEST. Put another way, any variable can be used as long as
:::            the name does not begin with a forward slash.
:::
:::      /T DelimiterChar
:::
:::            The /T option is very similar to the Oracle Translate() function,
:::            or the unix tr command, or the sed y command.
:::
:::            The Source represents a set of search expressions, and Replace
:::            is a like sized set of replacement expressions. Expressions are
:::            delimited by DelimiterChar (a single character). If DelimiterChar
:::            is an empty string, then each character is treated as its own
:::            expression. The /L option is implicitly set if DelimiterChar is
:::            empty. Escape sequences are interpreted after the search and
:::            replace strings are split into expressions, so escape sequences
:::            cannot be used without a delimiter.
:::
:::            Each substring from the input that matches a particular search
:::            expression is translated into the corresponding replacement
:::            expression.
:::
:::            The search expressions may be regular expressions, possibly with
:::            captured groups. Note that each expression is itself converted into
:::            a captured group behind the scene, and the operation is performed
:::            as a single search/replace upon execution. So backreferences within
:::            each regex, and $n references within each replacement expression
:::            must be adjusted accordingly. The total number of expressions plus
:::            captured groups must not exceed 99.
:::
:::            If an expression must include a delimiter, then an escape
:::            sequence must be used.
:::
:::            Search expressions are tested from left to right. The left most
:::            matching expression takes precedence when there are multiple
:::            matching expressions.
:::
:::        Examples using /T:
:::
:::          ROT13 - Simple character substitution is achieved by setting the
:::          /T delimiter to an empty string. The search and replace strings
:::          must have identical length. The use of line continuation aligns
:::          the replace string directly below the search string, thus making
:::          it very easy to see exactly how each character will be translated.
:::          The "a" in the search string will be replaced by the "n" in the
:::          replace string. And you can see the symmetry in that the "n" will
:::          be replaced by "a".
:::
:::            echo The quick brown fox jumps over a lazy dog | jrepl^
:::             "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"^
:::             "nopqrstuvwxyzabcdefghijklmNOPQRSTUVWXYZABCDEFGHIJKLM"^
:::             /t ""
:::
:::            -- OUTPUT --
:::
:::            Gur dhvpx oebja sbk whzcf bire n ynml qbt
:::
:::          Simple string substitution - The /T option specifies that string
:::          expressions are delimited by a space. The /L option prevents "."
:::          from being interpreted as a regex wildcard character.
:::
:::            echo The blackbird flew through the blue sky. | jrepl^
:::             "black blue sky ." "blue black night !" /l /t " "
:::
:::            -- OUTPUT--
:::
:::            The bluebird flew through the black night!
:::
:::          Pig Latin - This example shows how /T can be used with regular
:::          expressions, and it demonstrates how the numbering of captured
:::          groups must be adjusted. The /T delimiter is set to a space.
:::
:::          The first regex is captured as $1, and it matches words that begin
:::          with a consonant. The first captured group ($2) contains the initial
:::          sequence of consonants, and the second captured group ($3) contains
:::          the balance of the word. The corresponding replacement string moves
:::          $2 after $3, with a "-" in between, and appends "ay".
:::
:::          The second regex matches any word, and it is captured as $4 because
:::          the prior regex ended with group $3. Because the first regex matched
:::          all words that begin with consonants, the only thing the second
:::          regex can match is a word that begins with a vowel. The replacement
:::          string simply adds "-yay" to the end of $4. Note that $0 could have
:::          been used instead of $4, and it would yield the same result.
:::
:::            echo Can you speak Pig Latin? | jrepl^
:::             "\b((?:qu(?=[aeiou])|[bcdfghj-np-twxz])+)([a-z']+)\b \b[a-z']+\b"^
:::             "$3-$2ay $4-yay" /t " " /i
:::
:::            -- OUTPUT --
:::
:::            an-Cay you-yay eak-spay ig-Pay atin-Lay?
:::
:::          Pig-Latin with proper capitalization - This is simply an extension
:::          of the prior example. The /JBEG option defines a fixCaps() function
:::          that checks if the translated word is all lower case, except for one
:::          capital letter after the "-". If so, then the initial letter is
:::          capitalized, and the remainder is converted to lower caae. The /J
:::          option treats the replacement strings as JScript expressions. The
:::          first replacement expression uses fixCaps() to properly restore case.
:::
:::            echo Can you speak Pig Latin? | jrepl^
:::             "\b((?:qu(?=[aeiou])|[bcdfghj-np-twxz])+)([a-z']+)\b \b[a-z']+\b"^
:::             "fixCaps($3+'-'+$2+'ay') $4+'-yay'"^
:::             /t " " /i /j /jbeg ^"^
:::             function fixCaps(str){^
:::               return str.search(/[a-z']+-[A-Z][a-z]*$/)==0 ?^
:::               str.substr(0,1).toUpperCase()+str.substr(1).toLowerCase() : str^
:::             }^"
:::
:::            -- OUTPUT --
:::
:::            An-cay you-yay eak-spay Ig-pay Atin-lay?
:::
:::      /V  - Search, Replace, /JBEG InitCode, /JBEGLN NewLineCode, /JEND
:::            FinalCode, and /JENDLN EndLineCode all represent the names
:::            of environment variables that contain the respective values.
:::            An undefined variable is treated as an empty string.
:::
:::            The variable names must not match any of the option names, nor
:::            can they be /TEST or /OPTIONS.
:::
:::      /X  - Enables extended substitution pattern syntax with support
:::            for the following escape sequences within the Replace string:
:::
:::            \\     -  Backslash
:::            \b     -  Backspace
:::            \f     -  Formfeed
:::            \n     -  Newline
:::            \q     -  Quote
:::            \r     -  Carriage Return
:::            \t     -  Horizontal Tab
:::            \v     -  Vertical Tab
:::            \xnn   -  ASCII byte code expressed as 2 hex digits
:::            \unnnn -  Unicode character expressed as 4 hex digits
:::
:::            Also enables the \q escape sequence for the Search string.
:::            The other escape sequences are already standard for a regular
:::            expression Search string.
:::
:::            Also modifies the behavior of \xnn in the Search string to work
:::            properly with extended ASCII byte codes (values above 0x7F).
:::
:::            Extended escape sequences are supported even when the /L option
:::            is used. Both Search and Replace support all of the extended
:::            escape sequences if both the /X and /L opions are combined.
:::
:::            Extended escape sequences are not applied to JScript code when
:::            using any of the /Jxxx options. Use the decode() function if
:::            extended escape sequences are needed within the code.
::/JSCRIPT
:::
:::  The following global JScript variables/objects/functions are available for
:::  use in JScript code associated with the /Jxxx options. User code may safely
:::  declare additional variables/objects/functions because all other internal
:::  objects used by JREPL are hidden behind an opaque _g object.
:::
:::      ln     - Within /JBEGLN, /JENDLN, and Replace code = current line number
:::               Within /JBEG code = 0
:::               Within /JEND code = total number of lines read.
:::               This value is always 0 if the /M or /S option is used.
:::
:::      cnt    - The total number of lines in the input. The value is undefined
:::               unless the /C option is used.
:::
:::      skip   - If true, do not search/replace any more lines until the value
:::               becomes false. /JBEGLN and /JENDLN code are still executed for
:::               each line, regardless. If set to true while in the midst of
:::               searching a line, then that search will continue to the end of
:::               the current line.
:::
:::               The default value is false.
:::
:::               This variable has no impact if the /M or /S options is used.
:::
:::               Note that this variable operates independently of the /INC
:::               and /EXC options.
:::
:::      quit   - If true, then do not read any more lines of input. The current
:::               line is still processed to completion, and /JEND code is still
:::               executed afterward.
:::
:::               The default value is false.
:::
:::               This variable has no impact if the /M or /S options is used.
:::
:::      env('varName')
:::
:::               Access to environment variable named varName.
:::
:::      decode(string)
:::
:::               Decodes extended escape sequences within a string as defined
:::               by the /X option, and returns the result. All backslashes must
:::               be escaped an extra time to use this function in your code.
:::
:::               Examples:
:::                  quote literal:       decode('\\q')
:::                  extended ASCII(128): decode('\\x80')
:::                  backslash literal:   decode('\\\\')
:::
:::               This function is only needed if you use the \q sequence
:::               or \xnn for an extended ASCII code (values above 0x7F).
:::
:::      lpad(value,pad)
:::
:::               Used to left pad a value to a minimum width string. If the
:::               value already has string width >= the pad length, then no
:::               change is made. Otherwise it left pads the value with the
:::               characters of the pad string to the width of the pad string.
:::
:::               Examples:
:::                  lpad(15,'0000')    returns "0015"
:::                  lpad(15,'    ')    returns "  15"
:::                  lpad(19011,'0000') returns "19011"
:::
:::      input  - The TextStream object from which input is read.
:::               This may be stdin or a file.
:::
:::      output - The TextStream object to which the output is written.
:::               This may be stdout or a file.
:::
:::      stdin  - Equivalent to WScript.StdIn
:::
:::      stdout - Equivalent to WScript.StdOut
:::
:::      stderr - Equivalent to WScript.StdErr
::/HELP
:::
:::  Help is available by supplying a single argument beginning with /?:
:::
:::      /?        - Writes all available help to stdout.
:::      /??       - Same as /? except uses MORE for pagination.
:::
:::      /?Topic   - Writes help about the specified topic to stdout.
:::                  Valid topics are INTRO, OPTIONS, JSCRIPT, RETURN,
:::                  VERSION, and HELP
:::
:::                  Example: List a summary of all available options
:::
:::                     jrepl /?options
:::
:::      /?/Option - Writes help about the specified /Option to stdout.
:::
:::                  Example: Display paged help about the /T option
:::
:::                     jrepl /??/t
:::
:::      /?REGEX   - Opens up Microsoft's JScript regular expression
:::                  documentation within your browser.
:::
:::      /?REPLACE - Opens up Microsoft's JScript REPLACE documentation
:::                  within your browser.
::/RETURN
:::
:::  Return Codes:
:::
:::      0 = At least one change was made and /JMATCH not used
:::          or at least one match returned and /JMATCH was used
:::          or /? was used
:::
:::      1 = No change was made and /JMATCH not used
:::          or no match returned and /JMATCH was used
:::
:::      2 = Invalid call syntax or incompatible options
:::
:::      3 = JScript runtime error
::/VERSION
:::
:::  JREPL.BAT version 4.2 was written by Dave Benham, and originally posted at
:::  http://www.dostips.com/forum/viewtopic.php?f=3&t=6044
::/

============= :Batch portion ===========
@echo off
setlocal disableDelayedExpansion

:: Process Help
if .%2 equ . call :help "%~1" && exit /b0 || call :exitErr "Insufficient arguments"

:: Define options
set "/options= /A: /B: /C: /E: /EXC:"" /F:"" /I: /INC:"" /J: /JBEG:"" /JBEGLN:"" /JEND:"" /JENDLN:"" /JLIB:"" /JMATCH: /L: /M: /N:0 /O:"" /OFF:0 /S:"" /T:"none" /V: /X: "

:: Set default option values
for %%O in (%/options%) do for /f "tokens=1,* delims=:" %%A in ("%%O") do set "%%A=%%~B"

:: Get options
:loop
if not "%~3"=="" (
  set "/test=%~3"
  setlocal enableDelayedExpansion
  if "!/test:~0,1!" neq "/" call :exitErr "Too many arguments"
  set "/test=!/options:*%~3:=! "
  if "!/test!"=="!/options! " (
      endlocal
      call :exitErr "Invalid option %~3"
  ) else if "!/test:~0,1!"==" " (
      endlocal
      set "%~3=1"
  ) else (
      endlocal
      set "%~3=%~4"
      shift /3
  )
  shift /3
  goto :loop
)

:: Validate options
if defined /M if defined /A if not defined /S                                      call :exitErr "/M cannot be used with /A without /S"
if "%/O%" equ "-" if not defined /F                                                call :exitErr "Output = - but Input file not specified"
if defined /F for %%A in ("%/F%") do for %%B in ("%/O%") do if "%%~fA" equ "%%~fB" call :exitErr "Output file cannot match Input file"
if "%/EXC%%/INC%%/C%%/JBEGLN%%/JENDLN%" neq "" if "%/M%%/S%" neq ""                call :exitErr "/C, /EXC, /INC, /JBEGLN, and /JENDLN cannot be used with /M or /S"

:: Transform options
if defined /JMATCH set "/J=1"
if "%/M%%/S%" neq "" set "/N=0"
if not defined /INC goto :endInc
if "%/INC:-=%" neq "%/INC%" SET "/C=1"
:endInc
if not defined /EXC goto :endExc
if "%/EXC:-=%" neq "%/EXC%" SET "/C=1"
:endExc

call :GetScript   REM into /test variable
cscript //E:JScript //nologo "%/test%" %1 %2
exit /b %errorlevel%

:GetScript
set "/test=%~f0"
exit /b

:help
setlocal
set "help=%~1"
setlocal enableDelayedExpansion
if "!help:~0,2!" neq "/?" exit /b 1
set "noMore=1"
set "help=!help:~2!"
if defined help if "!help:~0,1!" equ "?" (
  set "noMore="
  set "help=!help:~1!"
)
if /i "!help!" equ "regex" (
    explorer "http://msdn.microsoft.com/en-us/library/ae5bf541(v=vs.80).aspx"
    exit /b 0
) else if /i "!help!" equ "replace" (
    explorer "http://msdn.microsoft.com/en-US/library/efy6s3e6(v=vs.80).aspx"
    exit /b 0
) else if "!help!" equ "" ( %= /? =%
    set "find=^:::(.*)"
    set "repl=$1"
    set ^"cmd="%~f0" find repl /v /a /f "%~f0"^"
) else if "!help:~0,1!" equ "/" (   %= /?/Option =%
    set "find=^:::( {6}!help!(?= |$).*)@^::: {6}/@^:::(.*)@^::/"
    set "repl=go=true;$2@go=false;false@go?$5:false@go=false"
    set "jbeg=go=false"
    set ^"cmd=echo(^&call "%~f0" find repl /v /i /t @ /jmatch /jbeg jbeg /f "%~f0"^|^|echo Help not found for option %help%^"
) else (  %= /?Section =%
    set "find=^::/!help!$@^::/@^:::?(.*)"
    set "repl=go=true;false@go=false@go?$4:false"
    set "jbeg=go=false"
    set ^"cmd="%~f0" find repl /v /i /t @ /jmatch /jbeg jbeg /f "%~f0"^|^|(echo(^&echo Help not found for topic %help%^)^"
)
if defined noMore (call %cmd%) else (%cmd%) | more /e
exit /b 0

:exitErr
>&2 (
  echo ERROR: %~1.
  echo   Use JREPL /? or JREPL /?? to get help.
  (goto) 2>nul
  exit /b 2
)


************* JScript portion **********/
var _g=new Object();
_g.loc='';
try {
  var env=WScript.CreateObject("WScript.Shell").Environment("Process"),
      cnt,
      ln=0,
      skip=false,
      quit=false,
      stdin=WScript.StdIn,
      stdout=WScript.Stdout,
      stderr=WScript.Stderr,
      output,
      input;
  _g.ForReading=1;
  _g.ForWriting=2;
  _g.TemporaryFolder=2;
  _g.fso = new ActiveXObject("Scripting.FileSystemObject");
  _g.inFile=env('/F');
  _g.outFile=env('/O');
  _g.tempFile='';
  _g.excludeStr='';
  _g.excludeResult=false;
  if (_g.inFile=='') {
    if (env('/C')) {
      _g.tempFile=_g.fso.GetSpecialFolder(_g.TemporaryFolder).path+'\\'+_g.fso.GetTempName();
      _g.inFile=_g.tempFile;
      input=stdin;
      output=_g.fso.OpenTextFile(_g.tempFile,_g.ForWriting,true);
      while (!stdin.AtEndOfStream) output.WriteLine(input.ReadLine());
      cnt=input.line-1;
      output.close();
      input=_g.fso.OpenTextFile(_g.tempFile,_g.ForReading);
    } else input=stdin;
  } else {
    if (env('/C')) {
      input=_g.fso.OpenTextFile(_g.inFile,_g.ForReading);
      while (!input.AtEndOfStream) input.SkipLine();
      cnt=input.line-1;
      input.close();
    }
    input=_g.fso.OpenTextFile(_g.inFile,_g.ForReading);
  }
  if (_g.outFile=='') {
    output=stdout
  } else if (_g.outFile=='-') {
    output=_g.fso.OpenTextFile(_g.inFile+'.new',_g.ForWriting,true);
  } else {
    output=_g.fso.OpenTextFile(_g.outFile,_g.ForWriting,true);
  }
  if (env('/JLIB')) {
    _g.loc=' while loading /JLIB code';
    _g.libs=env('/JLIB').split('/');
    for (_g.i=0; _g.i<_g.libs.length; _g.i++) {
      _g.lib=_g.fso.OpenTextFile(_g.libs[_g.i],_g.ForReading);
      if (!_g.lib.AtEndOfStream) eval(_g.lib.ReadAll());
      _g.lib.close();
    }
    _g.loc='';
  }
  _g.loc=' in /JBEG code';
  eval(env( env('/V') ? env('/JBEG') : '/JBEG' ));
  _g.loc='';

  _g.fmtNum=function(val,pad){return pad.length==0 ? '' : lpad(val,pad)+':';}

  _g.writeMatch=function(str,off,lnPad,offPad) {
    if (str!==false) {
      _g.rtn=0;
      output.WriteLine(_g.fmtNum(ln,lnPad)+_g.fmtNum(off,offPad)+str);
    }
  }

  _g.defineReplFunc=function() {
    eval(_g.replFunc);
  }

  _g.excludeLine=function() {
    if (_g.excludeStr) {
      _g.loc=' in /INC, /EXC code';
      _g.excludeResult = eval(_g.excludeStr);
      _g.loc='';
    }
    return _g.excludeResult;
  }

  _g.callBeginLine=function($txt) {
    _g.loc=' in /JBEGLN code';
    eval(_g.begLn);
    _g.loc='';
    return $txt;
  }

  _g.callEndLine=function($txt) {
    _g.loc=' in /JENDLN code';
    eval(_g.endLn);
    _g.loc='';
    return $txt;
  }

  _g.main=function() {
    _g.rtn=1;
    var args=WScript.Arguments;
    var search=args.Item(0);
    var replace=args.Item(1);
    var options="g";
    var multi=env('/M')!='';
    var literal=env('/L')!='';
    var alterations=env('/A')!='';
    var srcVar=env('/S');
    var jexpr=env('/J')!='';
    var jmatch=env('/JMATCH')!='';
    var translate=env('/T');
    _g.begLn=env('/JBEGLN');
    _g.endLn=env('/JENDLN');
    if (env('/INC')) {
      if (env('/INC').search(  // Validate the list
                        /^(\s*-?\s*\d+(\s*:\s*-?\s*\d+)?\s*,)*\s*-?\s*\d+(\s*:\s*-?\s*\d+)?\s*$/
                      )<0) throw new Error(204, 'Invalid /INC value');
      _g.excludeStr='!('+env('/INC').replace(    // Remove spaces
                                       /\s/g, ""
                                     ).replace(  // Parse individual values
                                       /(^|,)(-?\d+)(?=,|$)/g, "$1ln==$2"
                                     ).replace(  // Parse ranges
                                       /(-?\d+):(-?\d+)/g, "ln>=$1&&ln<=$2"
                                     ).replace(  // Parse negative values
                                       /-\d+/g, "cnt$&+1"
                                     ).replace(  // Parse commas
                                       /,/g, "||"
                                     )+')';
    }
    if (env('/EXC')) {
      if (env('/EXC').search(  // Validate the list
                        /^(\s*-?\s*\d+(\s*:\s*-?\s*\d+)?\s*,)*\s*-?\s*\d+(\s*:\s*-?\s*\d+)?\s*$/
                      )<0) throw new Error(205, 'Invalid /EXC value');
      if (_g.excludeStr) _g.excludeStr+='||';
      _g.excludeStr+=env('/EXC').replace(    // Remove spaces
                                   /\s/g, ""
                                 ).replace(  // Parse individual values
                                   /(^|,)(-?\d+)(?=,|$)/g, "$1ln==$2"
                                 ).replace(  // Parse ranges
                                   /(-?\d+):(-?\d+)/g, "ln>=$1&&ln<=$2"
                                 ).replace(  // Parse negative values
                                   /-\d+/g, "cnt$&+1"
                                 ).replace(  // Parse commas
                                   /,/g, "||"
                                 );
    }
    if (multi) options+='m';
    if (env('/V')) {
      search=env(search);
      replace=env(replace);
      _g.begLn=env(_g.begLn);
      _g.endLn=env(_g.endLn);
    }
    if (env('/I')) options+='i';

    var lnWidth=parseInt(env('/N'),10),
        offWidth=parseInt(env('/OFF'),10),
        lnPad=lnWidth>0?Array(lnWidth+1).join('0'):'',
        offPad=offWidth>0?Array(offWidth+1).join('0'):'',
        xcnt=0, test;
    if (translate=='none') {  // Normal
      if (env('/X')) {
        if (!jexpr) replace=decode(replace);
        search=decode(search,literal);
      }
      if (literal) {
        search=search.replace(/([.^$*+?()[{\\|])/g,"\\$1");
        if (!jexpr) replace=replace.replace(/\$/g,"$$$$");
      }
      if (env('/B')) search="^"+search;
      if (env('/E')) search=search+"$";
      _g.loc=' in Search regular expression';
      search=new RegExp(search,options);
      _g.log='';
      if (jexpr) {
        _g.loc=' in Search regular expression';
        test=new RegExp('.|'+search,options);
        _g.loc='';
        'x'.replace(test,function(){xcnt=arguments.length-2; return '';});
        _g.replFunc='_g.replFunc=function($0';
        for (var i=1; i<xcnt; i++) _g.replFunc+=',$'+i;
        _g.replFunc+=',$off,$src){_g.loc=" in Replace code";'+( jmatch ? '_g.writeMatch(eval(_g.replace),$off,\''+lnPad+'\',\''+offPad+'\');_g.loc="";return $0;}' : '_g.rtn2=eval(_g.replace);_g.log="";return _g.rtn2;}' );
        _g.defineReplFunc();
      }
      _g.replace=replace;
    } else {                  // /T
      if (translate.length>1) throw new Error(203, 'Invalid /T delimiter');
      search=search.split(translate);
      if (search.length>99) throw new Error(202, '/T expression count exceeds 99');
      var replace=replace.split(translate);
      if (search.length!=replace.length) throw new Error(201, 'Mismatched search and replace /T expressions');
      _g.replace=[];
      var j=1;
      for (var i=0; i<search.length; i++) {
        if (env('/X')) search[i]=decode(search[i],literal);
        if (literal) {
          search[i]=search[i].replace(/([.^$*+?()[{\\|])/g,"\\$1");
        } else {
          _g.loc=' in Search regular expression';
          test=new RegExp('.|'+search[i],options);
          _g.loc='';
          'x'.replace(test,function(){xcnt=arguments.length-3;return '';});
        }
        if (j+xcnt>99) throw new Error(202, '/T expressions + captured expressions exceeds 99');
        if (env('/B')) search[i]="^"+search[i];
        if (env('/E')) search[i]=search[i]+"$";
        if (jexpr) {
          _g.replace[j]=replace[i];
        } else {
          replace[i]="'" + (env('/X')==''?replace[i]:decode(replace[i])).replace(/[\\']/g,"\\$&") + "'";
          replace[i]=replace[i].replace(/\n/g, "\\n");
          replace[i]=replace[i].replace(/\r/g, "\\r");
          if (!literal) {
            _g.replace[j]=replace[i].replace(
              /\$([$&`0]|\\'|(\d)(\d)?)/g,
              function($0,$1,$2,$3){
                return ($1=="$") ? "$":
                       ($1=="&") ? "'+$0+'":
                       ($1=="`") ? "'+$src.substr(0,$off)+'":
                       ($1=="\\'") ? "'+$src.substr($off+$0.length)+'":
                       (Number($1)-j<=xcnt && Number($1)>=j) ? "'+"+$0+"+'":
                       (Number($2)-j<=xcnt && Number($2)>=j) ? "'+$"+$2+"+'"+$3:
                       $0;
              }
            );
          } else _g.replace[j]=replace[i];
        }
        j+=xcnt+1;
      }
      search='('+search.join(')|(')+')';
      _g.loc=' in Search regular expression';
      search=new RegExp( search, options );
      _g.loc='';
      _g.replFunc='_g.replFunc=function($0';
      for (var i=1; i<j; i++) _g.replFunc+=',$'+i;
      _g.replFunc+=',$off,$src){_g.loc=" in Replace code"; for (_g.i=1;_g.i<arguments.length-2;_g.i++) if (arguments[_g.i]!==undefined) ';
      _g.replFunc+= jmatch ? '{_g.writeMatch(eval(_g.replace[_g.i]),$off,\''+lnPad+'\',\''+offPad+'\');_g.loc="";return $0;}}' : '{_g.rtn2=eval(_g.replace[_g.i]);_g.loc="";return _g.rtn2;}}';
      _g.defineReplFunc();
      jexpr=true;
    }

    var str1, str2;
    var repl=jexpr?_g.replFunc:_g.replace;
    if (srcVar) {
      str1=env(srcVar);
      str2=str1.replace(search,repl);
      if (!jmatch) if (!alterations || str1!=str2) if (multi) {
        output.Write(_g.fmtNum(ln,lnPad)+str2);
      } else {
        output.WriteLine(_g.fmtNum(ln,lnPad)+str2);
      }
      if (str1!=str2) _g.rtn=0;
    } else if (multi){
      var buf=1024;
      str1="";
      while (!input.AtEndOfStream) {
        str1+=input.Read(buf);
        buf*=2
      }
      str2=str1.replace(search,repl);
      if (!jmatch) output.Write(_g.fmtNum(ln,lnPad)+str2);
      if (str1!=str2) _g.rtn=0;
    } else {
      while (!input.AtEndOfStream && !quit) {
        str2=str1=input.ReadLine();
        ln++;
        if (_g.begLn) str2=_g.callBeginLine(str2);
        if (!_g.excludeLine() && !skip) str2=str2.replace(search,repl);
        if (_g.endLn) str2=_g.callEndLine(str2);
        if (str2!==false && !jmatch && (!alterations || str1!=str2)) output.WriteLine(_g.fmtNum(ln,lnPad)+str2);
        if (str1!=str2 && !jmatch) _g.rtn=0;
      }
    }
  }

  _g.main();

  _g.loc=' in /JEND code';
  eval(env( env('/V') ? env('/JEND') : '/JEND' ));
  _g.loc='';
  if (_g.inFile) input.close();
  if (_g.outFile) output.close();
  if (_g.outFile=='-') {
    _g.fso.GetFile(_g.inFile).Delete();
    _g.fso.GetFile(_g.inFile+'.new').Move(_g.inFile);
  }
  if (_g.tempFile) _g.fso.GetFile(_g.tempFile).Delete();
  WScript.Quit(_g.rtn);
} catch(e) {
  WScript.Stderr.WriteLine("JScript runtime error"+_g.loc+": "+e.message);
  WScript.Quit(3);
}

function decode(str, searchSwitch) {
  str=str.replace(
    /\\(\\|b|f|n|q|r|t|v|x80|x82|x83|x84|x85|x86|x87|x88|x89|x8[aA]|x8[bB]|x8[cC]|x8[eE]|x91|x92|x93|x94|x95|x96|x97|x98|x99|x9[aA]|x9[bB]|x9[cC]|x9[dD]|x9[eE]|x9[fF]|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4})/g,
    function($0,$1) {
      switch ($1.toLowerCase()) {
        case 'q':   return '"';
        case 'x80': return '\u20AC';
        case 'x82': return '\u201A';
        case 'x83': return '\u0192';
        case 'x84': return '\u201E';
        case 'x85': return '\u2026';
        case 'x86': return '\u2020';
        case 'x87': return '\u2021';
        case 'x88': return '\u02C6';
        case 'x89': return '\u2030';
        case 'x8a': return '\u0160';
        case 'x8b': return '\u2039';
        case 'x8c': return '\u0152';
        case 'x8e': return '\u017D';
        case 'x91': return '\u2018';
        case 'x92': return '\u2019';
        case 'x93': return '\u201C';
        case 'x94': return '\u201D';
        case 'x95': return '\u2022';
        case 'x96': return '\u2013';
        case 'x97': return '\u2014';
        case 'x98': return '\u02DC';
        case 'x99': return '\u2122';
        case 'x9a': return '\u0161';
        case 'x9b': return '\u203A';
        case 'x9c': return '\u0153';
        case 'x9d': return '\u009D';
        case 'x9e': return '\u017E';
        case 'x9f': return '\u0178';
        default:    return searchSwitch===false ? $0 : eval('"'+$0+'"');
      }
    }
  );
  return str;
}

function lpad( val, pad ) {
  var rtn=val.toString();
  return (rtn.length<pad.length) ? (pad+rtn).slice(-pad.length) : val;
}