---
title: "[Services] General Services"
published: 2024-06-16
description: 'A brief intro to general linux networking conntetion services tools'
tags: [Security, Networking, SSH]
category: Networking
draft: false
---

# Table of Contents
1. [SSH](#ssh-connect)
2. [DNS](#dns)
3. [Ftp](#ftp)
4. [SMB](#smb-server-message-block)
5. [Telnet](#telnet)

# [Services] General Services

## SSH connect

### Basic connect
```bash
ssh root@192.168.1.1
```

### Connect with port
```bash
ssh root@192.168.1.1 -p 8082
```

### Connect with `.pem` key 
```bash
ssh -i someKey.pem ubuntu@192.168.1.1
```

## DNS

### `nslookup`
To check the regarding domain ip actual address

#### Basic usage
```bash
nslookup google.com
```

#### Other DNS
- Using dns `8.8.8.8` to check `google.com` ip
```bash
nslookup google.com 8.8.8.8
```

### `dig`
To check the regarding domain ip actual address, but more details

#### Basic usage
```bash
dig google.com
```

#### Other DNS
- Using dns `8.8.8.8` to check `google.com` ip
```bash
dig google.com @8.8.8.8
```

#### Reverse DNS checking
- Using dns `8.8.8.8` to check `google.com` ip
```bash
dig -x 172.217.24.78
```

### `dnsenum`
Enumerate DNS information of a domain and to discover non-contiguous ip blocks.

```bash
dnsenum google.com
```

### Linux DNS `/etc/hosts`

Something may add the ip and domain name for access in `etc/hosts`

```bash
103.43.132.43 hello.io
```

## FTP

### Login 
```bash
ftp 1.1.1.1
```

### Download stuff 
```bash
get <file_name>
get hello.txt
```

## SMB (Server Message Block)

### Dum login 
```bash
smb -L //1.1.1.1/ -U " "
```

### Download stuff  
```bash
get <file_name>
get hello.txt
```

## telnet
To connect to a windows server, using `telnet`

### Login 
```bash
telnet 1.1.1.1
```

The default username is `root`