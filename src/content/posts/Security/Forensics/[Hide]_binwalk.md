---
title: "[Binary] Bindary Forensics tools"
published: 2024-06-17
description: 'Basic binary Forensics tools'
tags: [Security, Forensics]
category: Forensics
draft: false
---

# [Hide] binwalk
To find all hidden Header files inside a file

```bash
binwalk -e someFile.jpg
```

## analyse a binary file
```bash
binwalk -eM filename.bin
```

## analyse sample firmware
```bash
binwalk -eM wg602v3_1_2_5ww.trx
```

https://wiki.bi0s.in/hardware/firmware/introduction/  

# [Hide] stegsnow
concealing messages in text files by appending tabs and whitespaces at the end of lines.

- `-m` : Message to hidden
- `-p` : Password

```bash
stegsnow -C -m "Attack At Dawn" -p "hail-hydra" originalFile.txt newFile.txt
```