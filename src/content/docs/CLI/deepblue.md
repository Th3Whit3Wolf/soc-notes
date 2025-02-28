---
title: DeepBlueCLI
template: doc
hero: 
    title: 'DeepBlueCLI'
    tagline: a PowerShell Module for Threat Hunting via Windows Event Logs
---

## Usage:

```powershell
.\DeepBlue.ps1 <event log name> <evtx filename>
```

### Process local Windows security event log (PowerShell must be run as Administrator):

```powershell
.\DeepBlue.ps1
```

or:

```powershell
.\DeepBlue.ps1 -log security
```


### Process local Windows system event log:

```powershell
.\DeepBlue.ps1 -log system
```


### Process evtx file:

```powershell
.\DeepBlue.ps1 .\evtx\new-user-security.evtx
```

## Windows Event Logs processed

- Windows Security 
- Windows System
- Windows Application
- Windows PowerShell 
- Sysmon

### Command Line Logs processed

See [Logging setup](#logging-setup) section below for how to configure these logs

- Windows Security event ID 4688 
- Windows PowerShell event IDs 4103 and 4104
- Sysmon event ID 1


## Examples

|Event|Command|
|-----|-------|
|Event log manipulation|`.\DeepBlue.ps1 .\evtx\disablestop-eventlog.evtx`|
|Metasploit native target (security)|`.\DeepBlue.ps1 .\evtx\metasploit-psexec-native-target-security.evtx`|
|Metasploit native target (system)|`.\DeepBlue.ps1 .\evtx\metasploit-psexec-native-target-system.evtx`|
|Metasploit PowerShell target (security)|` .\DeepBlue.ps1 .\evtx\metasploit-psexec-powershell-target-security.evtx`|
|Metasploit PowerShell target (system)|` .\DeepBlue.ps1 .\evtx\metasploit-psexec-powershell-target-system.evtx`|
|Mimikatz `lsadump::sam`|`.\DeepBlue.ps1 .\evtx\mimikatz-privesc-hashdump.evtx`|
|New user creation|`.\DeepBlue.ps1 .\evtx\new-user-security.evtx`|
|Obfuscation (encoding)|`.\DeepBlue.ps1 .\evtx\Powershell-Invoke-Obfuscation-encoding-menu.evtx`|
|Obfuscation (string)|`.\DeepBlue.ps1 .\evtx\Powershell-Invoke-Obfuscation-string-menu.evtx`|
|Password guessing|`.\DeepBlue.ps1 .\evtx\smb-password-guessing-security.evtx`|
|Password spraying|`.\DeepBlue.ps1 .\evtx\password-spray.evtx`|
|PowerSploit (security)|`.\DeepBlue.ps1 .\evtx\powersploit-security.evtx`|
|PowerSploit (system)|`.\DeepBlue.ps1 .\evtx\powersploit-system.evtx`|
|PSAttack|`.\DeepBlue.ps1 .\evtx\psattack-security.evtx`|
|User added to administrator group|`.\DeepBlue.ps1 .\evtx\new-user-security.evtx`|

## Output

DeepBlueCLI outputs in PowerShell objects, allowing a variety of output methods and types, including JSON, HTML, CSV, etc.

For example:

|Output Type|Syntax|
|-----------|------|
|CSV|`.\DeepBlue.ps1 .\evtx\psattack-security.evtx \| ConvertTo-Csv`|
|Format list (default)|`.\DeepBlue.ps1 .\evtx\psattack-security.evtx \| Format-List`|
|Format table|`.\DeepBlue.ps1 .\evtx\psattack-security.evtx \| Format-Table`|
|GridView|`.\DeepBlue.ps1 .\evtx\psattack-security.evtx \| Out-GridView`|
|HTML|`.\DeepBlue.ps1 .\evtx\psattack-security.evtx \| ConvertTo-Html`|
|JSON|`.\DeepBlue.ps1 .\evtx\psattack-security.evtx \| ConvertTo-Json`|
|XML|`.\DeepBlue.ps1 .\evtx\psattack-security.evtx \| ConvertTo-Xml`|

## Logging setup

### Security event 4688 (Command line auditing):

Enable Windows command-line auditing: https://support.microsoft.com/en-us/kb/3004375 

### Security event 4625 (Failed logons):

Requires auditing logon failures: https://technet.microsoft.com/en-us/library/cc976395.aspx
### PowerShell auditing (PowerShell 5.0):

DeepBlueCLI uses module logging (PowerShell event 4103) and script block logging (4104). It does not use transcription.

See: https://www.fireeye.com/blog/threat-research/2016/02/greater_visibilityt.html

To get the PowerShell commandline (and not just script block) on Windows 7 through Windows 8.1, add the following to `\Windows\System32\WindowsPowerShell\v1.0\profile.ps1`

```powershell
$LogCommandHealthEvent = $true
$LogCommandLifecycleEvent = $true
```
See the following for more information:
 - https://logrhythm.com/blog/powershell-command-line-logging/
 - http://hackerhurricane.blogspot.com/2014/11/i-powershell-logging-what-everyone.html

### Sysmon

Install Sysmon from Sysinternals: https://docs.microsoft.com/en-us/sysinternals/downloads/sysmon

DeepBlue and DeepBlueHash currently use Sysmon events, 1, 6 and 7.

Log SHA256 hashes. Others are fine; DeepBlueHash will use SHA256.

