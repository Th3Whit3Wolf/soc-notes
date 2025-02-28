import "solid-js";
import { createSignal, For, Match, Show, Switch } from "solid-js";

type LogFileNetworkProtocolType =
    | "conn"
    | "dce_rpc"
    | "dhcp"
    | "dnp3"
    | "dns"
    | "ftp"
    | "http"
    | "irc"
    | "kerberos"
    | "modbus"
    | "modbus_register_change"
    | "mysql"
    | "ntlm"
    | "ntp"
    | "radius"
    | "rdp"
    | "rfb"
    | "sip"
    | "smb_cmd"
    | "smb_files"
    | "smb_mapping"
    | "smtp"
    | "snmp"
    | "socks"
    | "ssh"
    | "ssl"
    | "syslog"
    | "tunnel";
type LogFileFilesType = "files" | "ocsp" | "pe" | "x509";
type LogFileNetControlType =
    | "netcontrol"
    | "netcontrol_drop"
    | "netcontrol_shunt"
    | "netcontrol_catch_release"
    | "openflow";
type LogFileDetectionType =
    | "intel"
    | "notice"
    | "notice_alarm"
    | "signatures"
    | "traceroute";

type LogFileNetworkObservationType =
    | "known_certs"
    | "known_hosts"
    | "known_modbus"
    | "known_services"
    | "software";
type LogFileMiscellaneousType =
    | "dpd"
    | "unknown_protocols"
    | "weird"
    | "weird_stats";
type LogFileZeekDiagnosticType =
    | "broker"
    | "capture_loss"
    | "cluster"
    | "config"
    | "loaded_script"
    | "packet_filter"
    | "print"
    | "prof"
    | "reporter"
    | "stats"
    | "stderr"
    | "stdout";

type LogFileType =
    | LogFileNetworkProtocolType
    | LogFileFilesType
    | LogFileDetectionType
    | LogFileNetworkObservationType
    | LogFileNetControlType
    | LogFileMiscellaneousType
    | LogFileZeekDiagnosticType;

type LogFileOptionColumn = { name: string; type: string; description: string };
type LogFileOption = (
    | { name: LogFileNetworkProtocolType; kind: "Network Protocol" }
    | { name: LogFileFilesType; kind: "Files" }
    | { name: LogFileNetControlType; kind: "NetControl" }
    | { name: LogFileDetectionType; kind: "Detection" }
    | { name: LogFileNetworkObservationType; kind: "Network Observations" }
    | { name: LogFileMiscellaneousType; kind: "Miscellaneous" }
    | { name: LogFileZeekDiagnosticType; kind: "Zeek Diagnostic" }
) & { description: string; columns: Array<LogFileOptionColumn> };


const LogFileOptions: Array<LogFileOption> = [
    {
        name: "conn",
        kind: "Network Protocol",
        description: "TCP/UDP/ICMP connections",
        columns: [
            { name: "ts", type: "time", description: "The time when this connection started (seconds since epoch)." },
            { name: "uid", type: "string", description: "A unique identifier for this connection." },
            { name: "id.orig_h", type: "port", description: "The originator's host IP address." },
            { name: "id.orig_p", type: "int", description: "The originator's port number." },
            { name: "id.resp_h", type: "ip address", description: "The responder's host IP address." },
            { name: "id.resp_p", type: "port", description: "The responder's port number." },
            { name: "proto", type: "string", description: "The network protocol (e.g., tcp, udp)." },
            { name: "service", type: "string", description: "The service name associated with the connection (e.g., http, ftp)." },
            { name: "duration", type: "time", description: "The duration of the connection in seconds." },
            { name: "orig_bytes", type: "int", description: "The number of bytes sent by the originator." },
            { name: "resp_bytes", type: "int", description: "The number of bytes sent by the responder." },
            { name: "conn_state", type: "string", description: "The state of the connection (e.g., 'SUCCEEDED', 'FAILED')." },
            { name: "local_orig", type: "bool", description: "Whether the originator is a local host." },
            { name: "local_resp", type: "bool", description: "Whether the responder is a local host." },
            { name: "missed_bytes", type: "int", description: "The number of bytes missed due to processing limitations." },
            { name: "history", type: "string", description: "Records the state history of connections as a string of letters." },
            { name: "orig_pkts", type: "string", description: "Number of packets that the originator sent." },
            { name: "orig_ip_bytes", type: "string", description: "Number of IP level bytes that the originator sent." },
            { name: "resp_pkts", type: "string", description: "Number of packets that the responder sent." },
            { name: "resp_ip_bytes", type: "string", description: "Number of IP level bytes that the responder sent." },
            { name: "tunnel_parents", type: "string", description: "If this connection was over a tunnel, indicate the *uid* values for any encapsulating parent connections used over the lifetime of this inner connection." },
        ]
    },
    {
        name: "dce_rpc",
        kind: "Network Protocol",
        description: "Distributed Computing Environment/RPC",
        columns: [
            { name: "ts", type: "time", description: "Timestamp for when the event happened." },
            { name: "uid", type: "string", description: "Unique ID for the connection." },
            { name: "id", type: "conn_id", description: "The connection's 4-tuple of endpoint addresses/ports." },
            { name: "rtt", type: "interval", description: "Round trip time from the request to the response. If either the request or response wasn't seen, this will be null." },
            { name: "named_pipe", type: "string", description: "Remote pipe name." },
            { name: "endpoint", type: "string", description: "Endpoint name looked up from the uuid" },
            { name: "operation", type: "string", description: "Operations seen in the call." }
        ]
    },
    {
        name: "dhcp", kind: "Network Protocol", description: "DHCP Leases", columns: [
            {
                name: "ts",
                type: "time",
                description: "Timestamp of the first message in this session"
            },
            {
                name: "uids",
                type: "set[string]",
                description: "A series of unique identifiers of the connections over which DHCP is occurring."
            },
            {
                name: "client_addr",
                type: "ip address",
                description: "IP address of the client"
            },
            {
                name: "server_addr",
                type: "ip address",
                description: "IP address of the server"
            },
            {
                name: "client_port",
                type: "port",
                description: "Client port number seen at time of server handing out IP."
            },
            {
                name: "server_port",
                type: "port",
                description: "Server port number seen at time of server handing out IP."
            },
            {
                name: "mac",
                type: "string",
                description: "Client's hardware address."
            },
            {
                name: "host_name",
                type: "string",
                description: "Name given by client in Hostname option 12."
            },
            {
                name: "client_fqdn",
                type: "string",
                description: "FQDN given by client in Client FQDN option 81."
            },
            {
                name: "domain",
                type: "string",
                description: "Domain given by the server in option 15."
            },
            {
                name: "requested_addr",
                type: "ip address",
                description: "IP address assigned by the client."
            },
            {
                name: "assigned_addr",
                type: "ip address",
                description: "IP address assigned by the server."
            },
            {
                name: "lease_time",
                type: "interval",
                description: "IP address lease interval."
            },
            {
                name: "client_message",
                type: "string",
                description: "Message typically accompanied with a DHCP_DECLINE so the client can tell the server why it rejected an address."
            },
            {
                name: "server_message",
                type: "string",
                description: "Message typically accompanied with a DHCP_NAK to let the client know why it rejected the request."
            },
            {
                name: "msg_types",
                type: "vector[string]",
                description: "Types of messages exchanged in this session"
            },
            {
                name: "duration",
                type: "time",
                description: "Duration of the DHCP session from first to last message"
            },

            {
                name: "client_chaddr",
                type: "string",
                description: "The CHADDR field sent by the client"
            },
            {
                name: "last_message_ts",
                type: "time",
                description: ""
            },
            {
                name: "msg_orig",
                type: "vector[ip address]",
                description: "The address that originated each message from the `msg_types` field."
            },
            {
                name: "client_software",
                type: "string",
                description: "Software reported by the client in the `vendor_class` option."
            },
            {
                name: "server_software",
                type: "string",
                description: "Software reported by the server in the `vendor_class` option."
            },
            {
                name: "circuit_id",
                type: "string",
                description: "Identifier added by DHCP relay agents for switched or permanent circuits"
            },
            {
                name: "agent_remote_id",
                type: "string",
                description: "Globally unique identifier added by relay agents for remote hosts"
            },
            {
                name: "subscriber_id",
                type: "string",
                description: "Subscriber ID that remains consistent regardless of physical network connection"
            }
        ]
    },
    {
        name: "dnp3",
        kind: "Network Protocol",
        description: "DNP3 Requests and Replies",
        columns: [
            {
                name: "ts",
                type: "time",
                description: "Timestamp of the request"
            },
            {
                name: "uid",
                type: "string",
                description: "Unique identifier for the connection."
            },
            {
                name: "id",
                type: "conn_id",
                description: "Identifier for the connection."
            },
            {
                name: "fc_request",
                type: "time",
                description: "The name of the function message in the request."
            },
            {
                name: "fc_reply",
                type: "time",
                description: "The name of the function message in the reply."
            },
            {
                name: "iin",
                type: "count",
                description: "The response's “internal indication number”."
            },
        ]
    },
    // { name: "dns", kind: "Network Protocol", description: "DNS Activity" },
    // { name: "ftp", kind: "Network Protocol", description: "FTP Activity" },
    // {
    //     name: "http",
    //     kind: "Network Protocol",
    //     description: "HTTP Requests and Replies",
    // },
    // {
    //     name: "irc",
    //     kind: "Network Protocol",
    //     description: "IRC Commands and Responses",
    // },
    // { name: "kerberos", kind: "Network Protocol", description: "Kerberos" },
    // {
    //     name: "modbus",
    //     kind: "Network Protocol",
    //     description: "Modbus Commands and Responses",
    // },
    // {
    //     name: "modbus_register_change",
    //     kind: "Network Protocol",
    //     description: "Tracks changes to Modbus holding registers",
    // },
    // { name: "mysql", kind: "Network Protocol", description: "MySQL" },
    // {
    //     name: "ntlm",
    //     kind: "Network Protocol",
    //     description: "NT LAN Manager (NTLM)",
    // },
    // {
    //     name: "ntp",
    //     kind: "Network Protocol",
    //     description: "Network Time Protocol",
    // },
    // {
    //     name: "radius",
    //     kind: "Network Protocol",
    //     description: "RADIUS Authentication Attempts",
    // },
    // {
    //     name: "rdp",
    //     kind: "Network Protocol",
    //     description: "Remote Destop Protocol (RDP)",
    // },
    // {
    //     name: "rfb",
    //     kind: "Network Protocol",
    //     description: "Remote Framebuffer (RFB)",
    // },
    // { name: "sip", kind: "Network Protocol", description: "SIP" },
    // { name: "smb_cmd", kind: "Network Protocol", description: "SMB Commands" },
    // { name: "smb_files", kind: "Network Protocol", description: "SMB Files" },
    // { name: "smb_mapping", kind: "Network Protocol", description: "SMB Trees" },
    // {
    //     name: "smtp",
    //     kind: "Network Protocol",
    //     description: "SMTP Transactions",
    // },
    // { name: "snmp", kind: "Network Protocol", description: "SNMP Messages" },
    // {
    //     name: "socks",
    //     kind: "Network Protocol",
    //     description: "SOCKS Proxy Requests",
    // },
    // { name: "ssh", kind: "Network Protocol", description: "SSH Connections" },
    // {
    //     name: "ssl",
    //     kind: "Network Protocol",
    //     description: "SSL/TLS Handshake Information",
    // },
    // {
    //     name: "syslog",
    //     kind: "Network Protocol",
    //     description: "Syslog Messages",
    // },
    // {
    //     name: "tunnel",
    //     kind: "Network Protocol",
    //     description: "Tunneling Protocol Events",
    // },
    // { name: "files", kind: "Files", description: "File Analysis Results" },
    // {
    //     name: "ocsp",
    //     kind: "Files",
    //     description: "Online Certificate Status Protocol (OCSP)",
    // },
    // { name: "pe", kind: "Files", description: "Portable Executable (PE)" },
    // {
    //     name: "x509",
    //     kind: "Files",
    //     description: "X.509 Certificate Information",
    // },
    // {
    //     name: "netcontrol",
    //     kind: "NetControl",
    //     description: "NetControl Actions",
    // },
    // {
    //     name: "netcontrol_drop",
    //     kind: "NetControl",
    //     description: "NetControl Actions",
    // },
    // {
    //     name: "netcontrol_shunt",
    //     kind: "NetControl",
    //     description: "NetControl Shunt Actions",
    // },
    // {
    //     name: "netcontrol_catch_release",
    //     kind: "NetControl",
    //     description: "NetControl Catch and Release Actions",
    // },
    // { name: "openflow", kind: "NetControl", description: "OpenFlow Debug Log" },
    // {
    //     name: "intel",
    //     kind: "Detection",
    //     description: "Intelligence Data Matches",
    // },
    // { name: "notice", kind: "Detection", description: "Zeek Notices" },
    // {
    //     name: "notice_alarm",
    //     kind: "Detection",
    //     description: "The Alarm Stream",
    // },
    // { name: "signatures", kind: "Detection", description: "Signature Matches" },
    // {
    //     name: "traceroute",
    //     kind: "Detection",
    //     description: "Traceroute Detection",
    // },
    // {
    //     name: "known_certs",
    //     kind: "Network Observations",
    //     description: "SSL Certificates",
    // },
    // {
    //     name: "known_hosts",
    //     kind: "Network Observations",
    //     description: "Hosts That Have Completed TCP Handshakes",
    // },
    // {
    //     name: "known_modbus",
    //     kind: "Network Observations",
    //     description: "Modbus Masters and Slaves",
    // },
    // {
    //     name: "known_services",
    //     kind: "Network Observations",
    //     description: "Signatures Matches",
    // },
    // {
    //     name: "software",
    //     kind: "Network Observations",
    //     description: "Software Being Used On the Network",
    // },

    // {
    //     name: "dpd",
    //     kind: "Miscellaneous",
    //     description: "Dynamic Protocol Detection Features",
    // },
    // {
    //     name: "unknown_protocols",
    //     kind: "Miscellaneous",
    //     description:
    //         "Information about packet protocols that Zeek doesn't know how to process",
    // },
    // {
    //     name: "weird",
    //     kind: "Miscellaneous",
    //     description: "Unexpected network-level activity",
    // },
    // {
    //     name: "weird_stats",
    //     kind: "Miscellaneous",
    //     description: "Statistics about unexpected activity",
    // },

    // {
    //     name: "broker",
    //     kind: "Zeek Diagnostic",
    //     description:
    //         "Peering status events between Zeek or Broker-enabled processes",
    // },
    // {
    //     name: "capture_loss",
    //     kind: "Zeek Diagnostic",
    //     description: "Packet loss rate",
    // },
    // {
    //     name: "cluster",
    //     kind: "Zeek Diagnostic",
    //     description: "Zeek cluster messages",
    // },
    // {
    //     name: "config",
    //     kind: "Zeek Diagnostic",
    //     description: "Configuration option changes",
    // },
    // {
    //     name: "loaded_script",
    //     kind: "Zeek Diagnostic",
    //     description: "Shows all scripts loaded by Zeek",
    // },
    // {
    //     name: "packet_filter",
    //     kind: "Zeek Diagnostic",
    //     description: "List packet filters that were applied",
    // },
    // {
    //     name: "print",
    //     kind: "Zeek Diagnostic",
    //     description: "Print statements that were redirected to a log stream.",
    // },
    // {
    //     name: "prof",
    //     kind: "Zeek Diagnostic",
    //     description: "Profiling statistics",
    // },
    // {
    //     name: "reporter",
    //     kind: "Zeek Diagnostic",
    //     description: "Internal error/warning/info messages",
    // },
    // {
    //     name: "stats",
    //     kind: "Zeek Diagnostic",
    //     description: "Memory/event/packet/lag statistics",
    // },
    // {
    //     name: "stderr",
    //     kind: "Zeek Diagnostic",
    //     description:
    //         "Captures standard error when Zeek is started from ZeekControl",
    // },
    // {
    //     name: "stdout",
    //     kind: "Zeek Diagnostic",
    //     description:
    //         "Captures standard out when Zeek is started from ZeekControl",
    // },
];

const logFileTypes = {
    conn: {
        columns: [
            "ts",
            "uid",
            "id.orig_h",
            "id.orig_p",
            "id.resp_h",
            "id.resp_p",
            "proto",
            "service",
            "duration",
            "orig_bytes",
            "resp_bytes",
            "conn_state",
            "local_orig",
            "local_resp",
            "missed_bytes",
            "history",
            "orig_pkts",
            "orig_ip_bytes",
            "resp_pkts",
            "resp_ip_bytes",
            "tunnel_parents",
        ],
        types: [
            "time",
            "string",
            "addr",
            "port",
            "addr",
            "port",
            "enum",
            "string",
            "intervalcount",
            "count",
            "string",
            "bool",
            "bool",
            "count",
            "string",
            "count",
            "count",
            "count",
            "count",
            "set[string]",
        ],
    },
    dns: {
        columns: [
            "ts",
            "uid",
            "id.orig_h",
            "id.orig_p",
            "id.resp_h",
            "id.resp_p",
            "proto",
            "trans_id",
            "rtt",
            "query",
            "qclass",
            "qclass_name",
            "qtype",
            "qtype_name",
            "rcode",
            "rcode_name",
            "AA",
            "TC",
            "RD",
            "RA",
            "Z",
            "answers",
            "TTLs",
            "rejected",
        ],
        types: [
            "time",
            "string",
            "addr",
            "port",
            "addr",
            "port",
            "enum",
            "count",
            "intervalstring",
            "count",
            "string",
            "count",
            "string",
            "count",
            "string",
            "bool",
            "bool",
            "bool",
            "bool",
            "count",
            "vector[string]",
            "vector[interval]",
            "bool",
        ],
    },
    dhcp: {
        columns: [
            "ts",
            "uids",
            "client_addr",
            "server_addr",
            "mac",
            "host_name",
            "client_fqdn",
            "domain",
            "requested_addr",
            "assigned_addr",
            "lease_time",
            "client_message",
            "server_message",
            "msg_types",
            "duration",
        ],
        types: [
            "time",
            "set[string]",
            "addr",
            "addr",
            "string",
            "string",
            "string",
            "string",
            "addr",
            "addr",
            "interval",
            "string",
            "string",
            "vector[string]",
            "interval",
        ],
    },
    ntp: {
        columns: [
            "ts",
            "uid",
            "id.orig_h",
            "id.orig_p",
            "id.resp_h",
            "id.resp_p",
            "version",
            "mode",
            "stratum",
            "poll",
            "precision",
            "root_delay",
            "root_disp",
            "ref_id",
            "ref_time",
            "org_time",
            "rec_time",
            "xmt_time",
            "num_exts",
        ],
        types: [
            "time",
            "string",
            "addr",
            "port",
            "addr",
            "port",
            "count",
            "count",
            "count",
            "interval",
            "interval",
            "interval",
            "interval",
            "string",
            "time",
            "time",
            "time",
            "time",
            "count",
        ],
    },
    // Add other log file types and their columns here
    http: {
        columns: [
            "ts",
            "uid",
            "orig_h",
            "orig_p",
            "resp_h",
            "resp_p",
            "trans_depth",
            "method",
            "host",
            "uri",
            "referrer",
            "user_agent",
            "request_body_len",
            "response_body_len",
            "status_code",
            "status_message",
            "mime_type",
            "connection",
            "request_headers",
            "response_headers",
            "cookies",
            "id.orig_h",
            "id.orig_p",
            "id.resp_h",
            "id.resp_p",
            "origin",
            "country_code",
            "region",
            "city",
            "latitude",
            "longitude",
        ],
    },
};


type SelectedLogFileType = keyof typeof logFileTypes

const [selectedLogFileType, setSelectedLogFileType] = createSignal<SelectedLogFileType>("conn");
const [availableColumns, setAvailableColumns] = createSignal<Array<string>>(logFileTypes.conn.columns);
const [selectedLogFileTypeColumns, setSelectedLogFileTypeColumns] = createSignal<Array<string>>([]);

function generateZeekCutCommand(
) {
    if (!logFileTypes[selectedLogFileType()]) return "zeek-cut";
    return `cat ${selectedLogFileType()}.log | zeek-cut ${selectedLogFileTypeColumns().join(" ")}`;
}

const setHTML = () => {
    const codeEL = document.getElementById("zeekCode");
    const copyEL = document.getElementById("zeekCopy");


    copyEL.setAttribute("data-code", generateZeekCutCommand());

    const innerArr = [
        '<div class="ec-line">',
        '<div class="code">',
        '<span style="--0:#CD89E1;--1:#A626A4">cat</span>',
        '<span style="--0:#ABB2BF;--1:#383A42"> </span>',
        `<span style="--0:#E5C07B;--1:#885D01">${selectedLogFileType()}.log</span>`,
        '<span style="--0:#ABB2BF;--1:#383A42"> | </span>',
        '<span style="--0:#CD89E1;--1:#A626A4">zeek-cut</span>',
        '<span style="--0:#ABB2BF;--1:#383A42"> </span>',
        `<span style="--0:#E5C07B;--1:#885D01">${selectedLogFileTypeColumns().join(" ")}</span>`,
        '</div>',
        '</div>'
    ]
    codeEL.innerHTML = innerArr.join('')
}


const selectLogFileType = (t: SelectedLogFileType) => {
    setSelectedLogFileType(t);
    setSelectedLogFileTypeColumns([]);
    if (logFileTypes[t]?.columns) {
        setAvailableColumns(logFileTypes[t].columns.sort());
    }
    setHTML();
}


const selectLogFileTypeColumn = (col: string) => {
    setSelectedLogFileTypeColumns([...selectedLogFileTypeColumns(), col].sort());
    setHTML();
}

const removeCol = (col: string) => {
    setSelectedLogFileTypeColumns(selectedLogFileTypeColumns().filter((f) => f !== col).sort());
    setHTML();
}

export const ZeekSelectorController = () => {

    return (
        <form class="max-full mx-auto">
            <label for="logFileType" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Log File Type:</label>
            <select id="logFileType" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => selectLogFileType(e.currentTarget.value as SelectedLogFileType)}
            >
                <For each={Object.keys(logFileTypes).sort()}>
                    {(lft) => (
                        <Show
                            when={selectedLogFileType() === lft}

                            fallback={<option value={lft}>{lft}</option>}
                        >
                            <option selected>{lft}</option>
                        </Show>
                    )}
                </For>
            </select>
            <label for="columns" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Columns:</label>
            <select multiple id="columns" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => selectLogFileTypeColumn(e.currentTarget.value)}
            >
                <For each={availableColumns().sort()}>
                    {(availCol) => (
                        <Show
                            when={selectedLogFileTypeColumns().includes(availCol)}
                            fallback={<option class="p-2.5 mx-3" value={availCol}>{availCol}</option>}
                        >
                            <option class="text-[#885D01] dark:text-[#E5C07B] rounded-md p-2.5 mx-3" selected value={availCol} onClick={(e) => removeCol(e.currentTarget.value)
                            }>{availCol} </option>
                        </Show>
                    )}
                </For>
            </select>
        </form >
    );
};
