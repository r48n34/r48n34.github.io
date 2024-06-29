---
title: "[Linux] static-web-server for web hosting"
published: 2023-12-30
description: 'Basic rust runtime static web server for web hosting'
tags: [Linux, static-web-server]
category: Linux
draft: false
---

# [Web] static-web-server

https://github.com/static-web-server/static-web-server  

## Basic host

```bash
static-web-server --port <number> --root <root_path>

e.g. 
static-web-server --port 8787 --root ./my-public-dir
```

## HTTP Authentication

```bash
# Use 'htpasswd' to generate password hash first
htpasswd -nBC10 <username>
htpasswd -nBC10 "reemo"

# New password: 123 
# Re-type new password: 123
# reemo:$2y$10$8phm28BB4YpKPDjOpdTT8eUcfVDw0xc85VZPxg2zae1GR8EQqus3i


static-web-server \
    --port 8787 \
    --root ./my-public-dir \
    --basic-auth 'reemo:$2y$10$8phm28BB4YpKPDjOpdTT8eUcfVDw0xc85VZPxg2zae1GR8EQqus3i'
```