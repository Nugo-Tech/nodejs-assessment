# SETUP AND RUN THE PROJECT
This is the documentation for the RESTful API that allows you to manage user data. It provides endpoints for creating, reading, updating, and deleting user records.

## Before you begin, ensure you have met the following requirements:
Node.js (v18 or higher) and npm installed on your machine. (I'm using v18).

MySQL database server installed and running.

Postman or any API testing tool for testing the endpoints.

## Getting Started
To set up and run the API, follow these steps:

1. Clone this repository to your local machine

   HTTP
   ```
   git clone https://github.com/minshaf998/nodejs-assessment.git
   ```
   SSH
   ```
   git@github.com:minshaf998/nodejs-assessment.git
   ```
   
3. Navigate to the project directory

   ```
   cd nodejs-assessment
   ```

4. Install the dependencies
   ```
   npm install
   ```

5. Create .env file in your root directory and add proper changes in below lines
   ```
   DB_NAME=assessment
   DB_USER=root
   DB_PASSWORD=password
   DB_HOST=localhost
   DB_DIALECT=mysql

   PORT=3000
   ```
6. Make sure you created a database called assessment in your local mysql database.
7. In terminal in your root folder start the server
   ```
   npm start
   ```

   If you can able to see terminal output as below you're good to go
   ```[nodemon] restarting due to changes...
   [nodemon] starting `node src/index.js`
   Executing (default): SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_NAME = 'Users' AND TABLE_SCHEMA = 'assessment'
   Executing (default): SELECT 1+1 AS result
   Database connection has been established successfully.
   Executing (default): SHOW INDEX FROM `Users`
   Server is running on port 3002```
   

# API Documentation
## 1. Create a New User
### Request:
Method: POST

URL: 'http://localhost:3000/users'

Request Body (JSON):
```
{
  "name": "inshaf",
  "email": "inshaf@yopmail.com",
  "address": "123 Main St",
  "city": "Sample City",
  "country": "Sri Lanka"
}
```
### Response:
Status Code: 201 Created

Response Body (JSON):
```
{
  "id": 1,
  "name": "inshaf",
  "email": "inshaf@yopmail.com",
  "address": "123 Main St",
  "city": "Sample City",
  "country": "Sri Lanka"
}
```

## 2. Read User Details by User ID
### Request:
Method: GET

URL: 'http://localhost:3000/users/{userId}'

Replace {userId} with the actual user ID you want to retrieve.

### Response:
Status Code: 200 OK

Response Body (JSON):
```
{
  "id": 1,
  "name": "inshaf",
  "email": "inshaf@yopmail.com",
  "address": "123 Main St",
  "city": "Sample City",
  "country": "Sri Lanka"
}
```
## 3. Update User Information by User ID
### Request:
Method: PUT

URL: 'http://localhost:3000/users/{userId}'

Replace {userId} with the actual user ID you want to update.

Request Body (JSON):
```
{
  "name": "Updated Name",
  "email": "updatedemail@example.com"
}
```

### Response:
Status Code: 200 OK

Response Body (JSON):
```
{
  "id": 1,
  "name": "Updated Name",
  "email": "updatedemail@example.com",
  "address": "123 Main St",
  "city": "Sample City",
  "country": "Sample Country"
}

```
## 4. Delete a User by User ID

### Request:
Method: DELETE

URL: 'http://localhost:3000/users/{userId}'

Replace {userId} with the actual user ID you want to delete.

### Response:
Status Code: 204 No Content
