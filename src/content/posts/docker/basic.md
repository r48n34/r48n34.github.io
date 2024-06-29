---
title: "[Docker] Basic command checklist"
published: 2023-12-30
description: 'Docker Basic command checklist in general control'
tags: [Docker]
category: Docker
draft: false
---

Docker Basic command checklist in general control

## Links

Download the git from:
https://www.docker.com/

## Commands


### - build
```bash
docker build -t <tag_name> .
docker build -t docker-example .
```

### - run
Care `hostPort:containerPort` => `map_to_target_port:my_current_port`
- `<Port-to-outside>:<Inside-port>`  

:::tip

For example, you got a express.js port to 8080, and you want your user to access with `http://www.myapi:32145`, you have to set:  
- `32145:8080`  

:::


```bash
docker run -d -it -p 8080:8080 <tag_name>
docker run -d -it -p 8080:8080 docker-example
```

### - Docker Compose
```bash
docker-compose up

# pull the images that the `docker-compose` will use
docker-compose pull

# Run in background
docker-compose up -d

docker-compose stop
docker-compose rm -rf <name> # Delete
```

### - List container
```bash
docker ps
docker ps -a # With hidden / stopped container

docker logs <CONTAINER_ID / IMAGE_NAME> 
docker logs 841851bc7e31 
```

### - Go inside the images
```bash
docker exec -it <CONTAINER_ID / IMAGE_NAME> bash 
```


### - Docker swarm
The build-in load balancing for docker.  

```bash
docker swarm init

$ docker swarm init
Swarm initialized: current node (jijr57zap1bxuo6xo7f4i9uig) is now a manager.

To add a worker to this swarm, run the following command:

    docker swarm join --token xxxxxxxxxxxxxx 192.168.65.3:2377  

To add a manager to this swarm, run 'docker swarm join-token manager' and follow the instructions.
```

```bash
# Create a swarm
# docker service create --replicas <number> --name=<you_name_it_a_name> <image_name>
docker service create --replicas 3 --name=mvc-test mvc-test:latest
docker service create --replicas 3 --name=my_nginx nginx --publish 8123:80

# View services
docker service ls
docker service rm my_nginx

# Update
# docker service update [OPTIONS] SERVICE
docker service update --publish-add 80 my_nginx
```