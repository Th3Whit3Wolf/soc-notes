---
title: TShark
template: doc
hero: 
    title: 'TShark'
    tagline: "a terminal oriented version of Wireshark designed for capturing and displaying packets when an interactive user interface isn't necessary or available"
---

## Basic Commands

Print a summary of each frame in a PCAP file

```bash
tshark -r <pcap file>
```

Pipe the data through “less” so that the data can be navigated using the spacebar, page up, page down, and arrow keys (press “q” to quit display)

```bash
tshark -r <pcap file> | less
```

Make output easier to read by removing line wrap

```bash
tshark -r <pcap file> | less -S
```

Print the first `<number>` lines of output (default is 10)

```bash
tshark -r <pcap file> | head -n <number>
```
Print the last `<number>` lines of output (default is 10)

```bash
tshark -r <pcap file> | tail -n <number>
```

Disable name resolution

```bash
tshark -n -r <pcap file>
```

Print all frame fields (verbose output)

```bash
tshark -V -r <pcap file>
```

Print absolute (instead of relative) timestamps

```bash
tshark -t -a -r <pcap file>
```

Display only specific frame fields

```bash
tshark -r <pcap file> -T fields -e <field 1> -e <field 2>
```

**Example:** Get the source and destination IP address, but only when the SYN flag is set

```bash
tshark -n -r <pcap file> -T fields -e ip.src -e ip.dst.tcp.flags==2
```

**Example** Extract the TCP payloads being exchanged between two IP addresses

```bash
tshark -n -r <pcap file> -T fields -e tcp.payload.ip.addr==<First IP> and ip.addr=<Second IP>
```

**Example** Extract the HTTP traffic between two specified IP addresses, convert the Hex output to ASCII, and pause output

```bash
tshark -n -r <pcap file> -T fields -e tcp.payload ip.addr==192.168.1.10 and ip.addr==1.2.3.4 and tcp.port==80 | xxd -r -p | less -S
```

**Example** Extract the ICMP traffic between two specified IP addresses, convert the Hex output to ASCII, and pause output

```bash
tshark -n -r <pcap file> -T fields -e data.data ip.addr==192.168.1.10 and ip.addr==1.2.3.4 and icmp | xxd -r -p | less -S
```

Use the `-Y` options specifies a display filter to help organize packet captures and filter out specific data such as protocols or host information.
```bash
tshark -r <pcap file> -Y [wireshark display filter]
```

You can further filter the packets using the -tfields and -e option. With these you can specify different layers of filters using Wireshark syntax. -T determines the format of the text output of tshark, -e will allow you to specify different fields of a packet to be printed.

```bash
tshark- r <pcap file> -Y [wireshark display filter] -T fields -e [field]
```


Display filters also use BPF syntax, can be applied after the capture and can be extremely useful when used correctly. Display/BPF filters use primitives in the arguments (&&, ||, !).

**Example:** Get all HTTP traffic (TCP & UDP port 80)
```bash
tshark -r <pcap file> tcp.port == 80 || udp.port == 80
```

**Example:** Get traffic sent & received from a specific host

```bash
tshark -r <pcap file> ip.address==10.0.0.204
```

**Example:** Get traffic where the Time to Live is equal to 64
```bash
tshark -r <pcap file> ip.ttl==64
```

**Example:** Get traffic where the TCP Reset flag is turned on
```bash
tshark -r <pcap file> tcp.flags.reset!=0
```

Get frames with a display field that is case sensitive

```bash
tshark -r <pcap file> <display filter> contains <value>
```

**Example:** Get URIs that contain the string “windowsupdate”:

```bash
tshark -r <pcap file> http.request.uri contains "windowsupdate"
```

## Advanced TShark 

**sort** - Sort the output data from left to right alphanumerically. Use the “-n” switch to sort numerically.

Use “-r” to sort in reverse order. Use “-k” to offset where to start sorting.

**uniq** - Collapse multiple repeating lines into a single line. Use “-c” to count the number of lines that have been collapsed.

**datamash** - Perform basic statistical operations on a range of numbers. This can include counting or adding up a series of numbers, identifying the min or max value, or calculating the range or standard deviation of a series of numbers.

### Count the number of TCP connections between two IP addresses:

```bash
tshark -r <pcap file> -T fields -e ip.src -e ip.dst tcp.flags==2 and ip.src==192.168.1.10 and ip.dst==1.2.3.4 | datamash count 1
```

### Get the delta time between each session for a specified pair of IP addresses

```bash
tshark -r <pcap file> -T fields -e ip.src -e ip.dst -e frame.time_delta_displayed tcp.flags==2 and ip.src==192.168.1.10 and ip.dst==1.2.3.4 | less
```

### Identify the minimum and maximum delta time between connections for a specified pair of IP addresses that have connected multiple times

Further, calculate the mean and the standard deviation (good for hunting beacons)

```bash
tshark -r <pcap file> -T fields -e ip.src -e ip.dst -e frame.time_delta_displayed tcp.flags==2 and ip.src==192.168.1.10 and ip.dst==1.2.3.4 | datamash -g 1,2 min 3 max 3 mean 3 sstdev 3
```

### Identify which 10 internal systems are sending the most data out to the internet, and to which destination IP address


```bash
tshark -r <pcap file> -T fields -e ip.src -e ip.dst -e ip.len ip.proto==6 and ip.src == 192.168.0.0/16 or ip.src == 10.0.0.0/8 or ip.src == 172.16.0.0/12 | sort | datamash -g 1,2 sum 3 | sort -k 3 -rn | head
```


## Utility Commands

### Merging multiple pcap files

**Note:** [mergecap](https://www.wireshark.org/docs/man-pages/mergecap.html)

```bash
mergecap /<directory>/*.pcap -w /<directory>/capture.pcap
```

### List Unique IP Sources in Pcap

```bash
tshark -T fields -r 'capture.pcap' -e ip.src | sort -u
```

### List Unique IP Sources and Destination for HTTP traffic
```bash
tshark -T fields -r 'capture.pcap' -e ip.src -e ip.dst -Y "http" | sort -u
```

### Live DNS Request and Responses on WiFi

```bash
tshark -i wlan0 -T fields -f "src port 53" -n -e dns.qry.name -e dns.resp.addr	
```

### Extract All Objects/Files from Supported Protocols

:::note
This will create a folder called ‘exported’ and put the results in there
:::

```bash
tshark -r 'capture.pcap' --export-objects http,exported
tshark -r 'capture.pcap' --export-objects dicom,exported
tshark -r 'capture.pcap' --export-objects imf,exported
tshark -r 'capture.pcap' --export-objects smb,exported
tshark -r 'capture.pcap' --export-objects tftp,exported
```

### List URIs Accessed

```bash
tshark -T fields -r capture.pcap -e http.host -e ip.dst -e http.request.full_uri -Y "http.request"
```

### Get HTTP POST Requests and Output to JSON

```bash
tshark -T json -r capture.pcap -Y "http.request.method == POST"
```

### Get HTTP User-Agents

```bash
tshark -nr capture.pcap -R "http.user_agent" -Tfields -e http.user_agent
```

### Get X.509 Certificates

```bash
tshark -r capture.pcap -T fields -R "ssl.handshake.certificate" -e x509sat.printableString
```

### Get TCP Packets NOT Sent to Port 80

```bash
tshark -r capture.pcap -n -R "not tcp.port==80 and tcp.flags == 0x0002"
```

### Get Number of Packets

```bash
tshark -r capture.pcap | wc -l
```


### Resources

- [List of all possible display filters](_wireshark.org/docs/dfref/)
- Attribution: [Cool Tshark Tricks by Chris Brenton](https://www.promptzine.com/threat-hunting-zine/cool-tshark-tricks)
