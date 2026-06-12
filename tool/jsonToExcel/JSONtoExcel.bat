@echo off
setlocal

REM ============================================================
REM JSON to Excel
REM
REM Double click mode:
REM   Edit the three paths below, then double click this bat.
REM
REM Command line mode:
REM   JSONtoExcel.bat input.json [output.xlsx] [template.xlsx]
REM   JSONtoExcel.bat input_json_folder output_excel_folder [template_excel_folder]
REM ============================================================

REM JSON input file or folder.
set "PathJson=D:\dzafxProgram\Editor_Electron\jsonAsstes\outerJsonAssets"

REM Excel output folder. If empty, exports beside each JSON file.
set "PathExcel=D:\dzafxProgram\Editor_Electron\Excel"

REM Optional template Excel folder. If a same-name .xlsx exists here,
REM its first 5 header rows and basic formatting will be reused.
set "PathTemplate=D:\dzafxProgram\dzafxcfg\dzafx_config\excel"

set "SCRIPT_DIR=%~dp0"
set "SCRIPT_FILE=%SCRIPT_DIR%JSONtoExcel.py"

REM If this bat is copied elsewhere, still use the tool script in this workspace.
if not exist "%SCRIPT_FILE%" (
    set "SCRIPT_FILE=D:\codex_dzafx\JSONtoExcel.py"
)

if not exist "%SCRIPT_FILE%" (
    echo Cannot find JSONtoExcel.py.
    echo Please put JSONtoExcel.bat and JSONtoExcel.py in the same folder,
    echo or keep JSONtoExcel.py at D:\codex_dzafx\JSONtoExcel.py.
    pause
    exit /b 1
)

set "PYTHON_EXE=python"

if exist "C:\Users\Administrator\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe" (
    set "PYTHON_EXE=C:\Users\Administrator\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"
) else (
    py -3 --version >nul 2>nul
    if %errorlevel%==0 (
        set "PYTHON_EXE=py -3"
    )
)

if "%~1"=="" (
    %PYTHON_EXE% "%SCRIPT_FILE%" "%PathJson%" "%PathExcel%" "%PathTemplate%"
) else (
    %PYTHON_EXE% "%SCRIPT_FILE%" %*
)

if errorlevel 1 (
    echo.
    echo JSON to Excel failed.
    echo If the error says openpyxl is missing, run: pip install openpyxl
    pause
    exit /b 1
)

echo.
echo Done.
pause
exit /b 0
