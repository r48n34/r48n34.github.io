---
title: "[Hash] Basic hash crack tools"
published: 2023-06-16
description: 'Crack hash through brute force hashed passwords'
tags: [Security, Buster, Hash]
category: Buster
draft: false
---

# Table of Contents
1. [John](#hash-john)
2. [Hashcat](#hash-hashcat)


# [Hash] john
A tools for crack through brute force hashed passwords

## Basic usage
Create a file call `hash` in current dir.   
Then input the hash that we want to burse.

```md
5f4dcc3b5aa765d61d8327deb882cf99
e99a18c428cb38d5f260853678922e03
```

**Notices**: You may want to use `hash-identifier` to know the hash format first.

Last, using following code to bash.  
- With `raw-md5` / `md5`
```bash
john --wordlist=/usr/share/john/password.lst --format=raw-md5 ./hash
```

- With `raw-sha1`
```bash
john --wordlist=/usr/share/wordlists/rockyou.txt --format=raw-sha1 ./hash
```

- With `whirlpool`
```bash
john --wordlist=/usr/share/wordlists/rockyou.txt --format=whirlpool ./hash
```

https://bcrypt-generator.com/
- With `bcrypt`
```bash
john --wordlist=/usr/share/wordlists/rockyou.txt --format=bcrypt ./hash
```

## Avaiable format
```md
john --list=formats | grep -i 'md5'
descrypt, bsdicrypt, md5crypt, md5crypt-long, bcrypt, scrypt, LM, AFS, 
aix-ssha512, andOTP, ansible, argon2, as400-des, as400-ssha1, asa-md5, 
dahua, dashlane, diskcryptor, Django, django-scrypt, dmd5, dmg, dominosec, 
mschapv2-naive, krb5pa-md5, mssql, mssql05, mssql12, multibit, mysqlna, 
mysql-sha1, mysql, net-ah, nethalflm, netlm, netlmv2, net-md5, netntlmv2, 
netntlm, netntlm-naive, net-sha1, nk, notes, md5ns, nsec3, NT, o10glogon, 
PBKDF2-HMAC-MD4, PBKDF2-HMAC-MD5, PBKDF2-HMAC-SHA1, PBKDF2-HMAC-SHA256, 
PHPS2, pix-md5, PKZIP, po, postgres, PST, PuTTY, pwsafe, qnx, RACF, 
Raw-Keccak, Raw-Keccak-256, Raw-MD4, Raw-MD5, Raw-MD5u, Raw-SHA1, 
Stribog-256, Stribog-512, STRIP, SunMD5, SybaseASE, Sybase-PROP, tacacs-plus, 
tcp-md5, telegram, tezos, Tiger, tc_aes_xts, tc_ripemd160, tc_ripemd160boot, 
ZipMonster, plaintext, has-160, HMAC-MD5, HMAC-SHA1, HMAC-SHA224
```

## `unshadow ` and decode for linux passowrd crack
- FILE 1 - local_passwd  
Contains the /etc/passwd line for the root user:  
`root:x:0:0::/root:/bin/bash`  

- FILE 2 - local_shadow  
Contains the /etc/shadow line for the root user:  
`root:$6$2nwjN454g.dv4HN/$m9Z/r2xVfweYVkrr.v5Ft8Ws3/YYksfNwq96UL1FX0OJjY1L6l.DS3KEVsZ9rOVLB/ldTeEL/OIhJZ4GMFMGA0:18576::::::`  

```bash
unshadow local_passwd local_shadow > unshadowed.txt
```

Then feed the file to john for crack the password.  

```bash
john --wordlist=/usr/share/wordlists/rockyou.txt --format=sha512crypt unshadowed.txt
```

## single crack mode
If you're cracking hashes in single crack mode,
you need to change the file format that you're feeding john for it to understand what data to create a wordlist from.

From:  
`1efee03cdcb96d90ad48ccc7b8666033`  
To  
`mike:1efee03cdcb96d90ad48ccc7b8666033`  

```bash
john --single --format=raw-sha256 hash7.txt
```

## Crack zip / rar / ssh with pw

- `zip`
```bash
zip2john zipfile.zip > zip_hash.txt
```

- `rar`
```bash
rar2john rarfile.rar > rar_hash.txt
```

- `ssh`
```bash
ssh2john id_rsa > id_rsa_hash.txt
```

Then using join to crack. Filename change to the hash file 

```bash
john --wordlist=/usr/share/wordlists/rockyou.txt zip_hash.txt
```


## [Hash] hashcat
Better version of `john`

```bash
hashcat -a 0 -m 3200 hash /usr/share/wordlists/rockyou.txt -w 3 -O
```