---
title: "[Linux] Linux Uncomplicated Firewall (ufw)"
published: 2023-12-30
description: 'Basic ufw setup and usage for easy firewalls'
tags: [Linux, ufw, Security]
category: Linux
draft: false
---

# [Security] ufw

## Command

```bash
# Check status
sudo ufw status verbose 

# Allow port enter
sudo ufw allow <port_number> 
e.g. sudo ufw allow 22

# Common port list
# 22 (FTP / SSH)
# 25 (SMTP)
# 53 (DNS)
# 80 (HTTP)
# 443 (HTTPS)
# 587 (secure SMTP)
# 3306 (MySQL)
# 5432 (PostgreSQL)

# Deny port enter
sudo ufw deny <port_number> 
e.g. sudo ufw deny5432

sudo ufw default deny incoming
sudo ufw default allow outgoing

# Enable number
sudo ufw enable

# Shows list
sudo ufw status numbered

# Delete specific rules
sudo ufw delete <rule-number>

e.g. sudo ufw delete 2

# Block / Allow ip
sudo ufw deny from <IP> to any 
e.g. sudo ufw deny from 192.168.1.5 to any

# Block / Allow ip from specific port
sudo ufw allow from <IP> to any port <port-number>
sudo ufw deny from <IP> to any port <port-number>

e.g. sudo ufw allow from 102.32.100.42 to any port 80
```