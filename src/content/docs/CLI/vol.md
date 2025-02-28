---
title: Volatility
---

Find the imageinfo of the file, 

```bash
python3 vol.py -f /path/to/memdump.mem imageinfo
```

List the processes of a system,

```bash
python3 vol.py -f /path/to/memdump.mem --profile=PROFILE pslist
```

View the process listing in tree form,

```bash
python3 vol.py -f /path/to/memdump.mem --profile=PROFILE pstree
```

View command line of the specific process with PID XXXX,

```bash
python3 vol.py -f /path/to/memdump.mem --profile=PROFILE dlllist -p XXXX
```

View Network Connections,

```bash
python3 vol.py -f /path/to/memdump.mem --profile=PROFILE netscan
```

Dumping the process with a specific PID XXXX,

```bash
python3 vol.py -f /path/to/memdump.mem --profile=PROFILE procdump -p XXXX -D /home/ubuntu/Desktop
```

Print all available processes,

```bash
python3 vol.py -f /path/to/memdump.mem --profile=PROFILE psscan
```

Print expected and hidden processes,

```bash
python3 vol.py -f /path/to/memdump.mem --profile=PROFILE psxview
```

Create a timeline of events from the memory image,

```bash
python3 vol.py -f /path/to/memdump.mem --profile=PROFILE timeliner
```

Pull internet browsing history,

```bash
python3 vol.py -f /path/to/memdump.mem --profile=PROFILE iehistory
```

Identify any files on the system from the memory image,

```bash
python3 vol.py -f /path/to/memdump.mem --profile=PROFILE filescan
```

### Check Memory Image Information

```bash
python3 vol.py -f /path/to/memdump.mem windows.info.Info
```

### Check List of Kernel Drivers

```bash
python3 vol.py -f /path/to/memdump.mem windows.modules.Modules
```

### Dump List of Kernel Drivers to Files

```bash
python3 vol.py -f /path/to/memdump.mem windows.modscan.ModScan
```

### Dump List of Kernel Drivers to Files

```bash
python3 vol.py -f /path/to/memdump.mem windows.moddump.ModDump
```

### Dump List of Running Processes to Files

```bash
python3 vol.py -f /path/to/memdump.mem windows.procdump.ProcDump
```

### Check Process List of Running Processes

```bash
python3 vol.py -f /path/to/memdump.mem windows.pslist.PsList
```

### Check Process Tree of Running Processes

```bash
python3 vol.py -f /path/to/memdump.mem windows.pstree.PsTree
```

### Check Running Processes from EPROCESS blocks

```bash
python3 vol.py -f /path/to/memdump.mem windows.psscan.PsScan
```

### Check Running Processes for possible shellcode/injection via PAGE\_EXECUTE\_READWRITE

```bash
python3 vol.py -f /path/to/memdump.mem windows.malfind.Malfind
```

### Check processes and their command lines

```bash
python3 vol.py -f /path/to/memdump.mem windows.cmdline.CmdLine
```

### Check for files which exist in memory

```bash
python3 vol.py -f /path/to/memdump.mem windows.filescan.FileScan
```