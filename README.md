# NoSQL-SocialNetworkAPI [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
### Module 18 Challenge

## Description 
The purpose of this challenge was to build an API for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list. The following technologies were used to create this social network API: ExpressJS, NodeJs, Mongoose, and Mongoose ODM.

## Installation
To install this application, clone the repository in your local machine. 
- Once cloned, open the terminal and cd into the root directory.
- Run 'npm install' to install all dependencies and packages that are required.
- Next, start the application by running 'node server.js'.
- Now you can perform CRUD operations on the app via Insomnia, or Postman.

## Usage
The following endpoints are available for testing. <br>
**User Routes**

- `/api/users`
    - GET: retrieves all users
    - POST: creates new user

- `/api/users/:userId`
  - GET: retrieves single user with given :userId
  - DELETE: deletes user with given :userId
  - PUT: updates user info based on :userId  

- `/api/users/:userId/friends/:friendId`
  - POST: adds :friendId to given :userId's friend list
  - DELETE: removes :friendId from given :userId's friend list

**Thought Routes**

- `/api/thoughts`
  - GET: retrieves all thoughts
  - POST: creates new thought

- `/api/thoughts/:thoughtId`
  - GET: retrieves single thought with :thoughtId
  - DELETE: deletes thought with given :thoughtId
  - PUT: updates thought with given :thoughtId

- `/api/thoughts/:thoughtId/reactions`
  - POST: posts new reaction

- `/api/thoughts/:thoughtId/reactions/:reactionId`
  - DELETE: deletes reaction with given :reactionId

## Demo Video
The following video shows the functionality of the finished application. You can perform basic CRUD operations on the social-network-api database.
- [Demo Video Link](https://drive.google.com/file/d/1xiREAsCIYBScw4gbPQf1Cgc3XZ9DCdK6/view)

## Contribution
The following articles helped me understand how to build this application.
- [Chat GPT](https://chatgpt.com/)
Helped me debug & improve my original code that wasn't fully functioning.
- [Connect MongoDB to Node using Mongoose](https://www.topcoder.com/thrive/articles/how-to-connect-mongodb-to-node-js-using-mongoose)
- [Sequelize with Node.js & MySQL](https://www.digitalocean.com/community/tutorials/how-to-use-sequelize-with-node-js-and-mysql)
- [Getting Started with Mongoose](https://www.mongodb.com/developer/languages/javascript/getting-started-with-mongodb-and-mongoose/)

## License
This application is covered under the MIT license. 

