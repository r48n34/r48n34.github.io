---
title: "[Kubernetes] Kubernetes Ymal config setting"
published: 2024-04-09
description: 'Basic Kubernetes Ymal config setting checklist'
tags: [Kubernetes, Ymal]
category: Kubernetes
draft: false
---

# [Basic] Ymal for usage

References from:  
https://github.com/guangzhengli/k8s-tutorials  

## Basic Pod

```ymal title='nginx.yaml'
apiVersion: v1
kind: Pod
metadata:
  name: nginx
  labels:
    app: nginx
spec:
  containers:
    - name: nginx-container
      image: nginx
```

```bash title='Terminal'
kubectl apply -f nginx.yaml
kubectl get pods

kubectl port-forward nginx 4000:80
```

## Basic Deployment with NodePort

- `ClusterIP`: Pod-to-Pod communication.    
- `NodePort`: External client-to-Pod (No load balancing between nodes).    
- `LoadBalancer`: External client-to-Pod (Load balancing between nodes) (Require cloud services).     

```ymal title='deployment.yaml'
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hellok8s-deployment
spec:
  replicas: 3 # For 3 pots open
  selector:
    matchLabels:
      app: hellok8s
  template:
    metadata:
      labels:
        app: hellok8s
    spec:
      containers:
        - image: guangzhengli/hellok8s:v3
          name: hellok8s-container
```

```ymal title='service-hellok8s-nodeport.yaml'
apiVersion: v1
kind: Service
metadata:
  name: service-hellok8s-nodeport
spec:
  type: NodePort
  selector:
    app: hellok8s
  ports:
  - port: 3000
    nodePort: 30000
```

```bash title='Terminal'
kubectl apply -f deployment.yaml
kubectl apply -f service-hellok8s-nodeport.yaml
kubectl get pods

# For Windows 10
minikube service list

|-------------|---------------------------|--------------|-----|
|  NAMESPACE  |           NAME            | TARGET PORT  | URL |
|-------------|---------------------------|--------------|-----|
| default     | kubernetes                | No node port |     |
| default     | service-hellok8s-nodeport |         3000 |     |
| kube-system | kube-dns                  | No node port |     |
|-------------|---------------------------|--------------|-----|

minikube service --url service-hellok8s-nodeport

http://127.0.0.1:28741
❗  Because you are using a Docker driver on windows, the terminal needs to be open to run it.
```

## Basic Deployment with Ingress

Simple deployment wiht one service only

```bash title='Terminal'
minikube addons enable ingress
kubectl delete deployment,service --all
```

```ymal title='hellok8s.yaml'
apiVersion: v1
kind: Service
metadata:
  name: service-hellok8s-clusterip
spec:
  type: ClusterIP
  selector:
    app: hellok8s
  ports:
  - port: 3000
    targetPort: 3000

---

apiVersion: apps/v1
kind: Deployment
metadata:
  name: hellok8s-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: hellok8s
  template:
    metadata:
      labels:
        app: hellok8s
    spec:
      containers:
        - image: guangzhengli/hellok8s:v3
          name: hellok8s-container
```


```ymal title='ingress.yaml'
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: hello-ingress
spec:
  rules:
    - http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: service-hellok8s-clusterip
                port:
                  number: 3000
```

```bash title='Terminal'
kubectl apply -f hellok8s.yaml                 
kubectl apply -f ingress.yaml

kubectl get ingress  
kubectl get pods

# For Windows 10
minikube service list

|---------------|------------------------------------|--------------|-----|
|   NAMESPACE   |                NAME                | TARGET PORT  | URL |
|---------------|------------------------------------|--------------|-----|
| default       | kubernetes                         | No node port |     |
| default       | service-hellok8s-clusterip         | No node port |     |
| ingress-nginx | ingress-nginx-controller           | http/80      |     |
|               |                                    | https/443    |     |
| ingress-nginx | ingress-nginx-controller-admission | No node port |     |
| kube-system   | kube-dns                           | No node port |     |
|---------------|------------------------------------|--------------|-----|

minikube service --url ingress-nginx-controller -n ingress-nginx

http://127.0.0.1:29829
http://127.0.0.1:29830
❗  Because you are using a Docker driver on windows, the terminal needs to be open to run it.
```