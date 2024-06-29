---
title: "[Docker] Basic Dockerfile with Github action"
published: 2024-04-09
description: 'Build your own nodejs application and deploy via Github action'
tags: [Docker, Github, Github Action, Nodejs]
category: Docker
draft: false
---

## Dockerfile
Normal dockerfile for a nodejs applications, and we assume a simple node.js express code can be build with the folllowing dockerfile.

Inside `dockerfile`
```dockerfile title="dockerfile"
FROM node:lts
WORKDIR /usr/src/app
COPY . .
EXPOSE 8080
CMD yarn install && \
    node index.js
```

We have assume the `express.js` open the port at `8080`, and run with `node index.js`. Depends on your code, you may change this `dockerfile` content to your elements.  

## Run file
In `Terminal`, build with the following command.
```bash title="Terminal"
docker build -t <your-image-tag> .

# e.g.
docker build -t nodeserver .
```

## With postgresql images

Inside `docker-compose.yml`
```yaml title="docker-compose.yml"
version: '3'

services:
  nodeserver:
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: dummy_db
      POSTGRES_HOST: db
      NODE_ENV: production
      PORT: 8080
    depends_on:
      - db
    build:
      context: ./
      dockerfile: ./Dockerfile
    image: 'nodeserver:latest'
    ports:
      - '8080:8080'
  db:
    image: postgres:15.1-alpine3.16
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: dummy_db
    ports:
      - '25432:5432'
    volumes:
      - ./pgdata:/var/lib/postgresql/data
```

## With Github Action and Docker Hub

The following section focus in how to build your own code in github action runtime, build the images in github VM and push to `Docker hub`.

In your `Github repo`, the struction should be like this: 
```md title="Github repo"
.
├──.github
│   └── workflows
│       └── ci.yml
├── backend
│   ├── Dockerfile
│   └── Other stuff...
├── frontend
│   └── Other stuff...
└── docker-compose.yml
```

The `{{ secrets.DOCKERHUB_USERNAME }}` and `{{ secrets.DOCKERHUB_TOKEN }}` should be setup in the repo first.

Inside `ci.yml`
```yml title="ci.yml"
name: docker-build

on:
  push:
    branches:
      - "main"
  workflow_dispatch:

env:
  DOCKER_CONTAINER_NAME: <your-container-name>       # server-mvc:latest
  DOCKER_REPO_NAME: <your_username>/<your-repo-name> # reemo/server-mvc:latest

jobs:
  test-server:
    runs-on: ubuntu-latest
    container: node:lts-alpine
    steps:
      - uses: actions/checkout@v3
      - name: Install npm deps
        working-directory: backend
        run: |
          yarn install
          yarn test
          rm -rf node_modules
      - name: archive built files
        uses: actions/upload-artifact@v3
        with:
          name: server_code
          path: backend

  build-server:
    needs: test-server
    runs-on: ubuntu-latest
    container: docker:20.10.21-alpine3.16
    steps:
      - uses: actions/checkout@v3
      - name: restore built files server
        uses: actions/download-artifact@v3
        with:
          name: server_code
          path: backend
      - name: Login to Docker Hub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}
      - name: Do Docker tag and push
        working-directory: backend
        run: |
          docker build -t ${{ env.DOCKER_CONTAINER_NAME }} .
          docker tag ${{ env.DOCKER_CONTAINER_NAME }} ${{ env.DOCKER_REPO_NAME }}
          docker push ${{ env.DOCKER_REPO_NAME }}
```

:::tip

Remember to setup your `secrets` in Github repo.

:::