---
title: Incident Response
---

## Network Analysis 

use Wireshark to import .pcap, .pcapng files.

## CMD

Command prompt can be used to view the valuable information


### Get Network Configuration

```cmd
ipconfig /all
```

### Check Running Processes

```bash
tasklist
```

### Display Running Processes and the Associated Binary that Create the Process

```cmd
wmic process get description, executablepath
```

### View All Number of Users

```bash
net users
```

### List All Users in the Administrators Group

```bash
net localgroup administrators
```

### List All Users in the RDP Group

```cmd
net localgroup "Remote Desktop Users"
```

### List All Services with Detailed Information

```bash
sc query | more
```

### List All Open Ports on a System

```cmd
netstat -ab
```

## Powershell

Can also be used often retrieve much more information.

### Get Network Related Information

```powershell
Get-NetIPConfiguration
Get-NetIPAddress
```

#### Show All Open Connections
```PowerShell
Get-NetTCPConnection -State Established
```

#### Show Connections Made By Office Applications
```PowerShell
Get-ItemProperty -Path HKCU:\SOFTWARE\Microsoft\Office\16.0\Common\Internet\Server Cache*
```

If this command returns an error check if your version is correct. If that is the case then no connection was made from office.

#### Network Shares
```PowerShell
Get-ChildItem -Path HKCU:\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\MountPoints2\
```

#### SMB Shares
```PowerShell
Get-SmbShare
```

#### RDP Sessions
```PowerShell
qwinsta /server:localhost
```

### List All Local Users

```powershell
Get-LocalUser
```

Display all user and display when they last logged on

```powershell
Get-LocalUser | Select-Object Name, LastLogon
```

Provide a specific user to the command to only get information about them

```powershell
Get-LocalUser -Name me | select *
```

### List All Local Users With Admin Privilieges

```powershell
Get-LocalGroupMember -Group "Administrators"
```

### Identify Running Services (in seperate window)

Quickly identify running services on the system in a nice separate window,

```powershell
Get-Service | Where Status -eq "Running" | Out-GridView
```

### Detailed Proces Information by Procesname
```PowerShell
Get-Process explorer | Format-List *
```

### Group Running Processes by Priority

```powershell
Get-Process | Format-Table -View priority
```

### Collect Specific Information from a Service

This will grab the process with the `ID` idhere and display all of that process's information 

```powershell
Get-Process -Id 'idhere' | Select *
```

### Process CommandLine
```PowerShell
Get-WmiObject Win32_Process | Select-Object Name,  ProcessId, CommandLine, Path | Format-List
```

### Get Scheduled Tasks

```powershell
Get-ScheduledTask
```

### Scheduled Task List
```PowerShell
Get-ScheduledTask | Where-Object {$_.State -ne "Disabled"} | Format-List
```

### Scheduled Task List Run Status
```PowerShell
Get-ScheduledTask | Where-Object {$_.State -ne "Disabled"} | Get-ScheduledTaskInfo
```

### Get Specific Scheduled Tasks and Display All of its Properties

```powershell
Get-ScheduledTask -TaskName 'PutANameHere' | Select *
```

### Changing the Execution Policy Applied to our User

```powershell
Set-ExecutionPolicy Bypass -Scope CurrentUser
```

### Persistence

#### Collect All Startup Files
```PowerShell
Get-CimInstance -ClassName Win32_StartupCommand |
  Select-Object -Property Command, Description, User, Location |
  Out-GridView
```

### Windows Security Events

#### Collect The Last 10 Windows Security Event Logs Filter on EventID
```PowerShell
Get-WinEvent -FilterHashtable @{LogName='Security';ID=4688} -MaxEvents 10 | Format-List *
```

#### Count By Event Last 2 Days
```PowerShell
$SecurityEvents = Get-EventLog -LogName security -After (Get-Date).AddDays(-2)
$SecurityEvents | Group-Object -Property EventID -NoElement | Sort-Object -Property Count -Descending
```

#### Collect Detailed Information All Windows Security Events Last 2 Days
```PowerShell
$SecurityEvents = Get-EventLog -LogName security -After (Get-Date).AddDays(-2)
$SecurityEvents | Group-Object -Property EventID -NoElement | Sort-Object -Property Count -Descending
```

#### Windows Security Events to CSV
```PowerShell
$ExecutionDate = $(get-date -f yyyy-MM-dd)
$OutputName = "SecurityEvents-$ExecutionDate.csv"
Get-EventLog -LogName Security | Export-Csv -Path $OutputName -NoTypeInformation
if (Test-Path -Path $OutputName) {
    $folderPath = (Get-Item $OutputName).DirectoryName
    Write-Host "Output File Location: $folderPath\$OutputName"
} else {
    Write-Host "File does not exist."
}
```

### Defender Exclusions
List the defender exclusions that are defined for your (local) machine.

#### IP
```PowerShell
Get-MpPreference | Select-Object -ExpandProperty ExclusionIpAddress
```
#### FolderPath
```PowerShell
Get-MpPreference | Select-Object -ExpandProperty ExclusionPath
```

#### Process

```PowerShell
Get-MpPreference | Select-Object -ExpandProperty ExclusionProcess
```

#### Extension
```PowerShell
Get-MpPreference | Select-Object -ExpandProperty ExclusionExtension
```
