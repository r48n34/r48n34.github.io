---
title: "[Linux] Misc setup"
published: 2023-12-30
description: 'Mice Linux install and setup'
tags: [Linux]
category: Linux
draft: false
---

# [Misc] Setup

## Misc stuff
```bash 
sudo apt-get install build-essential nginx htop git curl ranger
```

## Postgres
```bash
sudo apt-get install postgresql postgresql-contrib
```

## Nodejs
**Notices**: change to `18.x` to your ideal version, e.g. `20.x`

```bash 
sudo apt-get install curl
curl -sL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install nodejs

node -v
```

## Nodejs nvm

https://github.com/nvm-sh/nvm   

```bash
# Install
nvm install node # "node" is an alias for the latest version
nvm install 14.7.0 # or 16.3.0, 12.22.1, etc

# Use specific version
nvm use node
nvm use 16
nvm use 14
```