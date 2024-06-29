---
title: "[Info] Information Gathering Tool"
published: 2024-04-12
description: 'Basic scout information gathering tools introductions'
tags: [Security, Attack]
category: Attack
draft: false
---

# Table of Contents
1. [dmitry](#dmitry)
2. [nikto](#nikto)
3. [sslscan](#sslscan)
4. [wafw00f](#wafw00f)
5. [wpscan](#wpscan)
6. [whatweb](#whatweb)
7. [skipfish](#skipfish)
8. [Cutycapt](#cutycapt)

# [Info] Information Gathering Tool

### `dmitry`
Passive Information Gathering Tool

- Sacn the website `example.com` and output the record in `example.txt`
```bash
dmitry -winsepo example.txt example.com
```

### `nikto`
Vulnerability Analysis Gathering Tool

#### Basic usage
- Sacn the website `192.168.1.86`
```bash
nikto -host 192.168.1.86
```

#### SSL Sacn
- SSL site scan with `192.168.1.86`
```bash
nikto -h 192.168.1.86 -ssl
```

#### With Metasploit
- Into a format that Metasploit can read when you're performing a scan.
```bash
nikto -h 192.168.1.86 -Format msf+
```


### `sslscan`
To check SSL server status

```bash
sslscan www.example.com
```

### `wafw00f`
The Web Application Firewall Fingerprinting Tool (WAF)
Check the WAF exist

```bash
wafw00f https://example.org
```

## Full Scan / Audit

### `wpscan`
WPScan WordPress Security Scanner

```bash
wpscan --url http://192.168.1.86
```

### `whatweb`
WPScan WordPress Security Scanner

- With a level `3` to scan the website
```bash
whatweb -v -a 3 http://192.168.1.86
```

### `skipfish`
Active web application security reconnaissance tool.

```bash
skipfish -o folder http://192.168.1.86
```

## Tools Base

### `cutycapt`
Cap website images

```bash
cutycapt --url=http://www.kali.org --out=kali.png
```

