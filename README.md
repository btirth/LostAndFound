<h1 align="center" width="100%" style="text-align: center;">
    <a href="http://172.17.0.80:3000/"><img alt="project" height=200px width="33%" title="#About" src="./frontend/lost-and-found/src/Assets/Images/lostandfound.png" /></a>
</h1>

<h1 align="center" width="100%" style="text-align: center; color:green;">
  <a href="http://172.17.0.80:3000/"> Lost And Found </a>
</h1>

<h3 align="center" width="100%" style="text-align: center;">Upload • Claim • Reunit</h3>


<p align="center" width="100%" style="text-align: center;">
 <a href="#about">About</a> •
 <a href="#features">Features</a> •
 <a href="#how-it-works">How it works</a> • 
 <a href="#tech-stack">Tech Stack</a> 
 </p>

## About

Lost and found website is designed to help users find lost items by allowing them to report lost items, search for found items, and connect with others in their community.

---

## Features

- [x] Users can post any item they found
- [x] Users can search in item lost catalogue and request the user for return.
- [x] Connect and chat with the item founder and approved user
- [x] Return the found item and earn rewards


---

## How it works

The project is divided into two parts:

1. Backend 
2. Frontend 



### Pre-requisites

Before you begin, you will need to have the following tools installed on your machine:

- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/en/) v14.21.3
- [Java](https://www.oracle.com/java/technologies/downloads/) v17
- [Docker](https://www.docker.com/products/docker-desktop/)

### Preferred IDE
- Frontend - [VS Code](https://code.visualstudio.com/download)
- Backend - [Intellj IDEA](https://www.jetbrains.com/edu-products/download/other-IIE.html)


#### Cloning project

```bash

# Clone this repository
$ git clone https://git.cs.dal.ca/courses/2023-fall/csci-5308/Group07

```

#### Running the web application (Frontend)

```bash

# Access the project folder in your terminal
$ cd frontend/lost-and-found

# Install the dependencies
$ npm install

# Run the application in development mode
$ npm run start

# The application will open on the port: 3000 - go to http://localhost:3000
```

#### Build and deploy web application using docker

```bash
# Create docker image of frontend application
$ docker build -t <your_dockerhub_username>/lost-and-found:latest-fe -f ./frontend/LostAndFound/Dockerfile ./frontend/LostAndFound    

# Push the docker image to Docker hub.
$ docker push lost-and-found:latest-fe

# Pull the docker image from Docker hub to your server.
$ docker pull docker.io/<your_dockerhub_username>/lost-and-found:latest-fe

# Run the docker command to start the frontend application on your server.
$ docker run -d -p 3000:3000 --name lost-and-found-frontend docker.io/<your_dockerhub_username>/lost-and-found:latest-fe

```

#### Running the springboot application (Backend)

```bash    

# Access the project folder in your terminal
$ cd Backend/LostAndFound  

# Build the project    
$ mvn clean install     
    
# Run the Spring Boot application 
$ mvn spring-boot:run    
```

#### Build and deploy springboot application using docker

```bash
# Create docker image of backend application
$ docker build -t <your_dockerhub_username>/lost-and-found:latest-be -f ./Backend/LostAndFound/Dockerfile ./Backend/LostAndFound    

# Push the docker image to Docker hub.
$ docker push lost-and-found:latest-be

# Pull the docker image from Docker hub to your server.
$ docker pull docker.io/<your_dockerhub_username>/lost-and-found:latest-be

# Run the docker command to start the backend application on your server.
$ docker run -d -p 8080:8080 --name lost-and-found-backend docker.io/<your_dockerhub_username>/lost-and-found:latest-be

  ```


---


## Tech Stack

The following tools were used in the construction of the project:

<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" alt="React" height="20"> **React**
- A JavaScript library for building user interfaces.

<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/spring/spring-original.svg" alt="Spring Boot" height="20"> **Spring Boot**
- A Java-based framework for building web applications and microservices.

<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg" alt="MongoDB" height="20"> **MongoDB**
- A NoSQL database for storing and retrieving data.