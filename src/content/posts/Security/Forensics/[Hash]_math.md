---
title: "[Hash] Hash base Tools"
published: 2024-06-16
description: 'Basic Hash format and tools introduction'
tags: [Security, Forensics]
category: Forensics
draft: false
---

# [Hash] Hash base Tools

## Common hash result (`Hex`, `Dec`, `Bin` or `Octal`) (Hash with `password`)
- MD5    (`5f4dcc3b5aa765d61d8327deb882cf99`)    
- Base64 (`cGFzc3dvcmQ=`)     
- SHA1   (`5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8`)    
- ASCII  (`112 97 115 115 119 111 114 100 `)    
- CRC32  (`1624d322`)  

## `hash-identifier`
Software to identify the different types of hashes used to encrypt data and especially passwords.
https://www.kali.org/tools/hash-identifier/  

```bash
hash-identifier
```
Then input the hash code to analysis

## MD5
### `md5sum`
Calculate the result of a string to md5sum

#### Hash the `password` to md5 (`-n`: no new line)  
```bash
echo -n 'password' | md5sum
```

## base64
### `openssl`
Calculate the result of a string to base64

#### Hash the `password` to md5 (`-n`: no new line)  
```bash
echo -n 'password' | openssl enc -base64
```

## CRC32
### `crc32`
Calculate the result of a string to CRC32

#### Hash the `password` to crc32 
```bash
crc32 <(echo "password")
```


# [Hash] Exam file hex

## Online viewer
https://hexed.it/

## In linux with `xxd`

### Basic usage
- Output `fa0c` ect
```bash
xxd hello.txt
```

### Binary Display
- Output `00101101` ect
```bash
xxd -b datafile.txt
```

### Hex Upper Case
- Output `FA0C` ect
```bash
xxd -u datafile.txt
```

## File signatures
- https://en.wikipedia.org/wiki/List_of_file_signatures  
- https://www.garykessler.net/library/file_sigs.html  