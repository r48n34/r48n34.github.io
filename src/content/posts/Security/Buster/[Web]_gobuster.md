---
title: "[Web] Basic Web crack tools"
published: 2024-04-12
description: 'Crack web path orinput through brute force'
tags: [Security, Buster, Web]
category: Buster
draft: false
---

# [Web] gobuster
https://cybersecbits.com/gobuster-finding-web-files-and-directories  
https://github.com/OJ/gobuster  

For finding:   
- Files  
- Directories  
- Subdomains 

## Mode options
- dir: Directory / File enumeration mode (For finding `html` / `php` / `static content` ...)
- dns: DNS subdomain enumeration mode (For subdomain e.g. `www.example.com`, `mail.example.com`)
- vhost: VHOST enumeration mode (For vhost e.g. `www.example.com`, `mail.example.com`)
- fuzz: fuzzing mode for parameter (For test parameter e.g. `https://example.com?FUZZ=test`)
- s3: fuzzing aws bucket enumeration mode (For destination)

## Dir mode
### Basic usage
```bash
gobuster dir -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -u 10.10.103.116 

gobuster dir -w ~/wordlists/shortlist.txt -u https://buffered.io
```

### With Cookies
```bash
gobuster dir -w ~/wordlists/shortlist.txt -u https://buffered.io -c 'session=123456'
```

### Specific `.html` and `.php`
```bash
gobuster dir -w ~/wordlists/shortlist.txt -u https://buffered.io -x .php,.html
```

## DNS mode
You may set up the `/etc/hosts` with e.g. `103.43.132.43 hello.io` before buste the DNS

### Basic usage
```bash
gobuster dns -d thetoppers.htb -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt

gobuster dns -d google.com -w /usr/share/wordlists/dirbuster/subdomains.txt
```

### Shows ip
```bash
gobuster dns -d google.com -w ~/wordlists/subdomains.txt -i
```

## Vhost mode
### Basic usage
```bash
gobuster vhost -u https://mysite.com -w common-vhosts.txt
```

## Fuzz Mode
### Basic usage
```bash
gobuster fuzz -u https://example.com?FUZZ=test -w parameter-names.txt
```

# [Web] wfuzz 
Similar to gobuster

Using the word `FUZZ` as the variables

## Guess the file / folder, ignore 404
```bash
wfuzz -z file,/usr/share/wordlists/wfuzz/general/medium.txt http://10.129.158.135/FUZZ
```

## Guess the file / folder
```bash
wfuzz -z file,/usr/share/wordlists/wfuzz/general/medium.txt --hc 404 http://10.129.158.135/FUZZ
```

## Guess sub domain
```bash
wfuzz -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -H "Host: FUZZ.thetoppers.htb" --sc 302 http://thetoppers.htb/
```

# [Web] ffuf 
Better wfuzz

## Basic usage
### Buste a file / dir
```bash
ffuf -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -u https://target/FUZZ
```

### Buste a Query
```bash
ffuf -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -u https://target/script.php?FUZZ=test_value
```

### Buste a Query
```bash
ffuf -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -u https://target/script.php?FUZZ=test_value
```

### Buste a POST data
- `-fc`: filtering out the 401 responses

```bash
ffuf -w /path/to/postdata.txt -X POST -d "username=admin\&password=FUZZ" -u https://target/login.php -fc 401
```

### Buste a POST JSON data
`-w`: word list path
`-X`: HTTP Method
`-H`: Headers
`-d`: Data
`-fr`: Match all responses not containing text "error"
```bash
ffuf -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -u https://example.org/ -X POST -H "Content-Type: application/json" -d '{"name": "FUZZ", "anotherkey": "anothervalue"}' -fr "error"
```
