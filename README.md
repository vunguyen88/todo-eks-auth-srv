# todo-eks-auth-srv (Auth Server deploy on EKS)

This repository contains a simple Node TypeScript application configured to run inside a Docker container on port 8000.
DynamoDB for storing user credentials.

The deployment service using both ClusterIP for internal traffic and NodePort for dev purpose.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Docker](https://docs.docker.com/get-docker/)

## Getting Started

### 1. Clone the repository

Clone this repository to your local machine using the following command:

### 2. Build the app using Dockerfile
```sh
docker build -t todo-eks-auth .
```
### 3. Run and map port 3000 to React app
```sh
docker run -p 3000:3000 todo-eks-auth
```
The repo pipeline setup for both manually and automatically deployment using Github Actions to automatically perform following scripts:
  - checkout code
  - install dependencies
  - running test case
  - Build and push image to AWS ECR
  - Update Kubernetes Config file and rollout new update to Kubernetes cluster.
