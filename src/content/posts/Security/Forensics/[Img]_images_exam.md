---
title: "[Ima] Images Forensics tools"
published: 2024-04-12
description: 'Basic images Forensics tools and technique'
tags: [Security, Forensics]
category: Forensics
draft: false
---

# [Img] Images exam tools 

## Metadata viewer
- https://www.metadata2go.com/ 

## Exif 
### Exif viewer exiftool
- https://exiftool.org/  

### Exif remove
- https://www.imgonline.com.ua/eng/delete-exif.php

### `exiftool`

```bash
exiftool <file-name>
```

# [Img] jsteg

## LSB (least-significant bits)

accomplished by copying each bit of the data into the least-significant bits (LSB) of the image / file.

## `jsteg`

### hide
```bash
jsteg hide <in.jpg> <secret file name> <out.jpg>
```

### reveal
```bash
jsteg reveal <in.jpg> <output file name>
```

## `zsteg`
https://wiki.bi0s.in/steganography/zsteg/  
Zsteg is also a tool like Jsteg but it is used to detect LSB steganography only in the case of `PNG` and `BMP` images.  

```bash
zsteg <filename>
```
