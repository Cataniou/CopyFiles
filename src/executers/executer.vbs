Option Explicit
Dim PathApplication,VbsPath
VbsPath = Wscript.ScriptFullName
PathApplication = "C:\CopyFiles_Cnab\src\executers\callerLoop.bat"
Call Hidden_Run(Dblquote(PathApplication))
'*********************************************************************************
Function DblQuote(Str)
    DblQuote = Chr(34) & Str & Chr(34)
End Function
'*********************************************************************************
Function Hidden_Run(MyProgram)
    Dim ws,Result
    Set ws = CreateObject("wscript.Shell")
    Result = ws.run(MyProgram,0,True) '0 to hide the program
    Hidden_Run = Result
End Function
'*********************************************************************************