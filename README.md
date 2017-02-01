# NodeAuthenticationSystem
Node/Express Authentication System built with PassportJS and MongoDB.

Before running the project, make you have the mongo db in your system and it's running
 Please install the mongo db from the below given site
 https://www.mongodb.com/download-center#community
 

 Steps to install the project.
 
 1. Clone the code from the repository
 2. Once cloned, go into cloned folder and type "npm install"
 3. This starts your node server
 
 
 Description:
 
 This project builds Authentication API using PassportJS, where users can regsiter by providing the email and password.
 The given password will be encrypted using bcryptJS before being saved into the database. Once the user signs up, API 
 responds with JWT token. The next incoming request authorization header should carry this token for secured request. 
 Otherwise, request will be considered unauthorized


