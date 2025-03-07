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

### Identify Running Services (in seperate window)

Quickly identify running services on the system in a nice separate window,

```powershell
Get-Service | Where Status -eq "Running" | Out-GridView
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

### Get Scheduled Tasks

```powershell
Get-ScheduledTask
```

### Get Specific Scheduled Tasks and Display All of its Properties

```powershell
Get-ScheduledTask -TaskName 'PutANameHere' | Select *
```

### Changing the Execution Policy Applied to our User

```powershell
Set-ExecutionPolicy Bypass -Scope CurrentUser
```
