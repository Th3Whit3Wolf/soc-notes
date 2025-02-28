---
title: TShark
template: doc
hero: 
    title: 'TShark'
    tagline: "a terminal oriented version of Wireshark designed for capturing and displaying packets when an interactive user interface isn't necessary or available"
---

## Basic Commands

```bash
tshark -r <file>
```

```bash
tshark -r <file> -Y [wireshark display filter]
```
- The -Y options specifies a display filter to help organize packet captures and filter out specific data such as protocols or host information.

```bash
tshark- r <file> -Y [wireshark display filter] -T fields -e [field]
```
- You can further filter the packets using the -tfields and -e option. With these you can specify different layers of filters using Wireshark syntax. -T determines the format of the text output of tshark, -e will allow you to specify different fields of a packet to be printed.

```bash
tshark -r <file> tcp.port == 80 || udp.port == 80
```
- Display filters also use BPF syntax, can be applied after the capture and can be extremely useful when used correctly. Display/BPF filters use primitives in the arguments (&&, ||, !).

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