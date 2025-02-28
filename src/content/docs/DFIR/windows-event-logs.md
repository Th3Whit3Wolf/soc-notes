---
title: Windows Event Logs
---


## Get-WinEvent

### View all events in the live system Event Log:

```powershell
Get-WinEvent -LogName system
```

### View all events in the live security Event Log (requires administrator PowerShell):

```powershell
Get-WinEvent -LogName security
```

### View all events in the file example.evtx, format list (fl) output:

```powershell
Get-WinEvent -Path example.evtx | fl
```

### View all events in example.evtx, format GridView output:

```powershell
Get-WinEvent -Path example.evtx | Out-GridView
```

### Perform long tail analysis of example.evtx:

```powershell
Get-WinEvent -Path example.evtx | Group-Object id -NoElement | sort count
```

### Pull events 7030 and 7045 from system.evtx:

```powershell
Get-WinEvent -FilterHashtable @{Path="system.evtx"; ID=7030,7045}
```

### Same as above, but use the live system event log:

```powershell
Get-WinEvent -FilterHashtable @{logname="system"; id=7030,7045}
```

### Search for events containing the string "USB" in the file system.evtx:
```powershell
Get-WinEvent -FilterHashtable @{Path="system.evtx"} | Where {$_.Message -like "*USB*"}
```

### `grep`-style search for lines of events containing the case insensitive string "USB" in the file `system.evtx`:

```powershell
Get-WinEvent -FilterHashtable @{Path="system.evtx"} | fl | findstr /i USB
```

### Pull all errors (level=2) from `application.evtx`:

```powershell
Get-WinEvent -FilterHashtable @{Path="application.evtx"; level=2}
```

### Pull all errors (level=2) from application.evtx and count the number of lines ('wc'-style):
```powershell
Get-WinEvent -FilterHashtable @{Path="application.evtx";level=2} | Measure-Object -Line
```


## Sysmon

### Pull all Sysmon logs from the live Sysmon Event log (requires Sysmon and an admin PowerShell)

```powershell
Get-WinEvent -LogName "Microsoft-Windows-Sysmon/Operational"
```

### Pull Sysmon event ID 1 from the live Sysmon Event log

```powershell
Get-WinEvent -FilterHashtable @{logname="Microsoft-Windows-Sysmon/Operational"; id=1}
```

## Windows Defender

### Pull all live Windows Defender event logs
```powershell
Get-WinEvent -FilterHashtable @{logname="Microsoft-Windows-Windows Defender/Operational"}
```

### Pull Windows Defender event logs 1116 and 1117 from the live event log
```powershell
Get-WinEvent -FilterHashtable @{logname="Microsoft-Windows-Windows Defender/Operational";id=1116,1117}
```

### Pull Windows Defender event logs 1116 (malware detected) and 1117 (malware blocked) from a saved evtx file

```powershell
Get-WinEvent -FilterHashtable @{path="WindowsDefender.evtx";id=1116,1117}
```

## Event Logs

### Event Logs Available


```powershell
Get-EventLog -list
Get-WinEvent -Listlog * | Select RecordCount,LogName 
Get-WinEvent -Listlog *operational | Select RecordCount,LogName
wmic nteventlog list brief
```

### Event Logs per Application Source

```powershell
Get-EventLog Application | Select -Unique Source
Get-WinEvent -FilterHashtable @{ LogName='Application'; ProviderName='Outlook'}
Get-WinEvent -FilterHashtable @{ LogName='OAlerts';} | FL TimeCreated, Message
```

### Event Logs per Severity Source

**Critical Logs**

```powershell
Get-WinEvent -FilterHashtable @{ LogName='Application'; Level='1';}
```

**Error Logs**

```powershell
Get-WinEvent -FilterHashtable @{ LogName='Application'; Level='2';}
```

**Warning Logs**

```powershell
Get-WinEvent -FilterHashtable @{ LogName='Application'; Level='3';}
```

**Information Logs**

```powershell
Get-WinEvent -FilterHashtable @{ LogName='Application'; Level='4';}
```


## Event Logs for offline analysis

Event logs can be found: `%SystemRoot%\System32\winevt\Logs`

```powershell
wevtutil epl System [Location]\System.evtx
wevtutil epl Security [Location]\Security.evtx
wevtutil epl Application [Location]\Application.evtx
wevtutil epl "Windows PowerShell" [Location]\Powershell.evtx
```

OR:

```powershell
esentutl.exe /y /vss C:\Windows\System32\winevt\Logs\Security.evtx /d [Location]\Security.evtx
```

Copy all event logs:

```powershell
XCOPY C:\Windows\System32\winevt\Logs [Location] /i
XCOPY C:\WINDOWS\system32\LogFiles\ [Location] /i
```

### Quickly scan event logs with [DeepblueCLI](https://github.com/sans-blue-team/DeepBlueCLI) 

```powershell
.\DeepBlue.ps1 .\evtx\psattack-security.evtx | FL
```

## Other

### Poweshell Logs

```powershell
Get-WinEvent -LogName "Windows Powershell"
```

Common IIS logs can often be found in the below locations:

* `%SystemDrive%\inetpub\logs\LogFiles`
* `%SystemRoot%\System32\LogFiles\W3SVC1`
* `%SystemDrive%\inetpub\logs\LogFiles\W3SVC1`
  * Note: replace 1 with the number for your IIS website ID
* `%SystemDrive%\Windows\System32\LogFiles\HTTPERR`


Other logs can be found in the below, often using the Event Trace Log (ETL) format:

* `C:\Windows\System32\LogFiles`
* `C:\Windows\Panther`

ETL format can be parsed using tracerpt which is included in Windows, some examples below.

```powershell
tracerpt C:\Windows\System32\LogFiles\WMI\Terminal-Services-RPC-Client.etl
tracerpt logfile1.etl logfile2.etl -o logdump.xml -of XML
tracerpt logfile.etl -o logdmp.xml -of XML -lr -summary logdmp.txt -report logrpt.xml
tracerpt logfile1.etl logfile2.etl -o -report
tracerpt logfile.etl counterfile.blg -report logrpt.xml -df schema.xml
tracerpt -rt "NT Kernel Logger" -o logfile.csv -of CSV
```

Software specific logs are often stored in readable formats at any of the following locations.

```
%AppData%\[softwarename] (e.g. C:\Users\[username]\AppData\Roaming\[softwarename]\)
%LocalAppData%\[softwarename] (e.g. C:\Users\[username]\AppData\Local\[softwarename]\)
%programfiles%\[softwarename] (e.g. C:\Program Files\[softwarename]\)
%programfiles(x86)%\[softwarename] (e.g. C:\Program Files (x86)\[softwarename]\)
```

You may also find useful memory crashdumps at the below:

```
C:\Users\[username]\AppData\Local\CrashDumps
C:\Users\[username]\AppData\Local\Microsoft\Windows\WER\
```
