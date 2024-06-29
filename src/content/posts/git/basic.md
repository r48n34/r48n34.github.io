---
title: "[Git] Basic Git setup and usage"
published: 2024-04-09
description: 'Quick basic Git setup and usage'
tags: [Git]
category: Git
draft: false
---

# Table of Contents
1. [Config SSH](#config)
2. [Undo git add](#undo-git-add)

## Links

Download the git from https://git-scm.com/downloads

## Config

### - SSH

Set the ssh from Github:  
https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent  

```bash title="Terminal"
ssh-keygen

cat .ssh/id_rsa.pub
```

### - Local config

For windows, install the nano from `choco` is the easiest way. Install `choco` with `node.js` first.

```bash title="Terminal"
choco install -y nano
```

```bash title="Terminal"
git config --global core.editor "nano"
git config --global user.name "Peter"
git config --global user.email "peter123@gmail.com"
```

## Command
Basic command for:  
- Git adding file changes
- Git commit current added file
- Git pull for any curretn branch changes
- Git push if current branch is up-to-date

```bash
git add . # git add -A
git commit -m "message"

git pull
git push
```

## branches

### Create a new branch
```bash
git checkout -b <brance_name>

git checkout -b development
```

### Goto exist branch
```bash
git checkout <brance_name>

git checkout development
```

# Undo git add
The following command is used to revoke a `git add .` in CLI.  

## Undo all
Assume you have `git add` couple times.
```bash
git reset
```

## Undo one
undo one `git add`
```bash
git reset <file>
```

## Undo one commit only
Used to revoke one `git commit` with soft reset.  
```bash
git reset --soft HEAD~1
```