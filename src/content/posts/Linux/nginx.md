---
title: "[Linux] Basic nginx setting and tools"
published: 2023-12-30
description: 'Basic nginx set up for https, reverse proxy and sub domain'
tags: [Linux, Nginx]
category: Linux
draft: false
---

# Table of Contents
1. [Basic nginx](#1-basic-nginx)
2. [Reverse Proxy Nodejs](#2-reverse-proxy-nodejs)
3. [Set HTTPS](#3-set-https)
4. [Sub Domain Setting](#4-sub-domain-setting)


# 1. Basic nginx

```bash
sudo service nginx start
sudo service nginx stop
sudo service nginx restart

nginx -t # Check the nginx congif is correct or not
```

# 2. Reverse Proxy Nodejs

## Step 1: Open file
Enter the default file
```bash
sudo nano /etc/nginx/sites-available/default
```

## Step 2: Replace content
Replace the content with:
```bash title="default"
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    root /var/www/html;
    index index.html index.htm index.nginx-debian.html;

    server_name _;
    client_max_body_size 100M; 

    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

}
```

## Step 3: Restart services
```bash
sudo nginx -t
sudo service nginx restart
```

# 3. Set HTTPS

## Step 0: Domain setup
Make sure you have register a domain and have set `server_name` in `/etc/nginx/sites-available/default`
```bash title="/etc/nginx/sites-available/default"
server_name api.hello.io;
```

## Step 1: Install stuff
```bash
sudo apt-get update
sudo apt-get install software-properties-common
sudo add-apt-repository universe
sudo apt-get update
sudo apt-get install python3-certbot-nginx
```

## Step 2: Run certbot
```bash
sudo certbot --nginx
```

And select the regarding domain for register.  

# 4. Sub Domain Setting

## Step 0: Set up A record in AWS / Linode / Other platform

Set a `A/AAAA Record` in your cloud services like the following:  

- `api.r48n34.me`  
- `blog.r48n34.me`  

## Step 1: Settings
Goto `/etc/nginx/sites-available/default` and add the following code in `default`

```bash
sudo nano /etc/nginx/sites-available/default
```

```bash
server{
    listen 80;

    server_name api.r48n34.me; # Sub domain name
    client_max_body_size 100M; # Optional for form uplaoding, can skip it

    location / {
        proxy_pass http://localhost:8085;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

server{
    listen 80;

    server_name blog.r48n34.me; # other Sub domain name
    client_max_body_size 100M; 

    location / {
        proxy_pass http://localhost:8086;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Step 2: Restart services
```bash
sudo nginx -t
sudo service nginx restart
```