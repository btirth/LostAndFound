<h1 align="center" width="100%" style="text-align: center;">
    <a href="http://172.17.0.80:3000/"><img alt="project" height=200px width="33%" title="#About" src="./frontend/lost-and-found/src/Assets/Images/lostandfound.png" /></a>
</h1>

<h1 align="center" width="100%" style="text-align: center; color:green;">
  <a href="http://172.17.0.80:3000/"> Lost And Found </a>
</h1>

<h3 align="center" width="100%" style="text-align: center;">We help you find your lost items!</h3>


<p align="center" width="100%" style="text-align: center;">
 <a href="#about">About</a> •
 <a href="#features">Features</a> •
 <a href="#how-it-works">How it works</a> • 
 <a href="#tech-stack">Tech Stack</a> •  
 <a href="#user-scenarios">User Scenarios</a> •  
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


---

## User Scenarios

1. **Sign-up Screen**
  ![Signup](https://firebasestorage.googleapis.com/v0/b/lostnfound-7c21c.appspot.com/o/github-readme%2Fimage19.png?alt=media&token=3fa8d262-9194-456b-892c-012b64ff603e)
  <span>
  <span>
2. **Login Screen**
  ![login](https://firebasestorage.googleapis.com/v0/b/lostnfound-7c21c.appspot.com/o/github-readme%2Fimage11.png?alt=media&token=c742bf48-2bd1-476a-8ee1-cd6ce59267d3)
  <span>
  <span>

3. **Verify Email before login**
   ![verify](https://firebasestorage.googleapis.com/v0/b/lostnfound-7c21c.appspot.com/o/github-readme%2Fimage11.png?alt=media&token=c742bf48-2bd1-476a-8ee1-cd6ce59267d3)
  <span>
  <span>

4. **Reset password**
   ![reset](https://firebasestorage.googleapis.com/v0/b/lostnfound-7c21c.appspot.com/o/github-readme%2Fimage16.png?alt=media&token=a7e2b74d-d64e-4eb4-b361-569dce7e1ea5)
   
   ![emailreset](https://firebasestorage.googleapis.com/v0/b/lostnfound-7c21c.appspot.com/o/github-readme%2Fimage13.png?alt=media&token=abba4ca5-5e71-4433-b239-8cd8a756eb66)
   <span>
   <span>
5. **Report Lost Item**
   <span>
  User can report lost items by entering following details:
   - Name of item
   - Item Description
   - Category
   - Upload images/videos related to item
   - Last seen location of item
  Users can edit the details of posted lost items
   ![postlost](https://firebasestorage.googleapis.com/v0/b/lostnfound-7c21c.appspot.com/o/github-readme%2Fimage6.png?alt=media&token=dfc6a691-fdf5-442a-9bf7-f9dab501d6a7)
   <span>
   <span>
6. **Report Found Item**
   <span>
   User can report found items by entering following details:
   - Name of item
   - Item Description
   - Category
   - Upload images/videos related to item
   - Location at which item was found
  
   ![founditem](https://firebasestorage.googleapis.com/v0/b/lostnfound-7c21c.appspot.com/o/github-readme%2Fimage9.png?alt=media&token=a0ce72a9-90f9-4778-ab44-2717c94cbaaa)
   <span>
   <span>

7.   **List of claim request received**
   <span>
    1.  **List of request received and user can also filter based on status (Requested, Accepted, Rejected)**
        ![received](https://firebasestorage.googleapis.com/v0/b/lostnfound-7c21c.appspot.com/o/github-readme%2Fimage12.png?alt=media&token=35b86b00-f861-4dbe-b917-b5780819a02d)
    2.  **See the details of linked lost item**
        <span>
        Based on the details of linked lost item, user can decide whether to approve or reject claim request
      ![lostitem](https://firebasestorage.googleapis.com/v0/b/lostnfound-7c21c.appspot.com/o/github-readme%2Fimage5.png?alt=media&token=8cd5fa3c-7adf-48a9-8be9-af108b004289)
    <span>
   <span>

8.  **List of Claim request raised**
      <span>
      User can revoke claim request posted by them
    ![raised](https://firebasestorage.googleapis.com/v0/b/lostnfound-7c21c.appspot.com/o/github-readme%2Fimage1.png?alt=media&token=6adcfaca-74e6-48e5-b037-3a6195294069)
    <span>
   <span>

9.  **Chats**
      <span>
    1.  **Users can only chat with users only if claim request is accepted**
        ![approve](https://firebasestorage.googleapis.com/v0/b/lostnfound-7c21c.appspot.com/o/github-readme%2Fimage10.png?alt=media&token=912b8c0b-29a3-4b2c-84d7-b0553b28255d)
      <span>
    2.  **Founder can approve the user as owner after chatting**
         
         ![approve](https://firebasestorage.googleapis.com/v0/b/lostnfound-7c21c.appspot.com/o/github-readme%2Fimage14.png?alt=media&token=8753b2ed-167f-441a-837d-42ae94fbbaae)
      <span>
    3.  **Owner confirming the return of item**
         ***Requested user can only see confirm return button, when founder approves the requester as owner***
         
         ![return](https://firebasestorage.googleapis.com/v0/b/lostnfound-7c21c.appspot.com/o/github-readme%2Fimage15.png?alt=media&token=1038d1e1-6736-49f3-8c2f-2db889e53576)

         ![returnMsg](https://firebasestorage.googleapis.com/v0/b/lostnfound-7c21c.appspot.com/o/github-readme%2Fimage2.png?alt=media&token=1e089beb-bc82-48ab-8ce7-c7050e9cfd2e)
    <span>
   <span>

10.  **Receive reward**
    <span>
    Once the owner confirms the return of item, founder will receive reward
    ![rewards](https://firebasestorage.googleapis.com/v0/b/lostnfound-7c21c.appspot.com/o/github-readme%2Fimage7.png?alt=media&token=530e7679-af20-42fc-aa96-33b4d4343837)
    <span>
   <span>