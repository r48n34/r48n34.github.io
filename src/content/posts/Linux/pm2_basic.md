---
title: "[Linux] Basic pm2 for nodejs applications"
published: 2023-12-30
description: 'Advanced process manager for production Node.js applications'
tags: [Linux, Nginx]
category: Linux
draft: false
---

# [Manager] pm2

## Install

```bash title="npm"
npm install pm2 -g
```

## Basic Command

```bash
$ pm2 start app.js
$ pm2 start --name my_app app.js # Giving a name for it

$ pm2 list

$ pm2 stop     <app_name|namespace|id|'all'|json_conf>
$ pm2 restart  <app_name|namespace|id|'all'|json_conf>
$ pm2 delete   <app_name|namespace|id|'all'|json_conf>

# Zero Downtime Reload
$ pm2 reload all

# Show logs
$ pm2 logs <app_name|namespace|id|'all'|json_conf> 

# Show more lines
$ pm2 logs <app_name|namespace|id|'all'|json_conf> --lines 30
```

## More Command

```bash
# Terminal Based Dashboard
$ pm2 monit

# Open a Cluster Mode, named "my_server" with 5 nodes
$ pm2 start dist/server.js --name my_server -i 5

# Scales `my_server` up by 3 workers
$ pm2 scale my_server +3  

 # Scales `my_server` up or down to 2 workers total     
$ pm2 scale my_server 2              
```