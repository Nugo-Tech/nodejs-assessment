# User Management API

This Node.js application provides a simple CRUD API for managing user records. It includes the following operations:

- Create a new user
- Read user details by ID
- Update user information
- Delete a user

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [Create a New User](#create-a-new-user)
  - [Read User Details by ID](#read-user-details-by-id)
  - [Update User Information](#update-user-information)
  - [Delete a User](#delete-a-user)
- [Running Tests](#running-tests)


## Installation

1. Clone the repository to your local machine:

   ```bash
   $ git clone https://github.com/tkdeshan/nodejs-assessment.git
   $ cd nodejs-assessment

2. Create .env File

   * duplicate .env.example in backend folder and rename it to .env
   
3. Setup MongoDB:
   
   * Local MongoDB
     * Install it from here
     * In .env file update MONGODB_URI=mongodb://localhost/your-db-connection
   * OR Atlas Cloud MongoDB
     * Create database at https://cloud.mongodb.com
     * In .env file update MONGODB_URI=mongodb+srv://your-db-connection
    
6. Start the Node.js application:

    ```bash
   $ npm install
   $ npm start

* The application should now be running on http://localhost:5000.

## Usage

* You can use tools like Postman to interact with the API endpoints. Below are the details of the available endpoints:

## API Endpoints

### Create a New User

 * URL: /users/insert
 * Method: POST
 * Request Body:
 * JSON object with the following properties:
   * Id (integer): User ID (required)
   * name (string): User's name (required)
   * email (string): User's email (required, must be a valid email address)
   * address (string): User's address (required)
   * city (string): User's city (required)
   * country (string): User's country (required)    
 * Sample Request:

   ```bash
   {
      "Id": 1,
      "name": "John Doe",
      "email": "johndoe@example.com",
      "address": "123 Main St",
      "city": "New York",
      "country": "USA"
   }

 * Response Format:
   * 200 OK: User created successfully.
   * 400 Bad Request: Invalid request body or missing fields.

### Read User Details by ID

 * URL: /users/:Id
 * Method: GET
 * Request Parameters:
 * Id (integer): User ID (required)
 * Sample Request: /users/1  
 * Response Format:
   * 200 OK: User found
   * 404 Not Found: User not found

### Update User Information

 * URL: /users/update/:Id
 * Method: PUT
 * Request Parameters:
   * Id (integer): User ID (required)
 *  Request Body:
   * JSON object with the following properties (any combination can be updated):
      * name (string): User's name
      * email (string): User's email (must be a valid email address)
      * address (string): User's address
      * city (string): User's city
      * country (string): User's country
 * Sample Request:
    ```bash
    {
      "name": "Updated Name",
      "email": "updated@example.com"
    }

 * Response Format:
   * 200 OK: User information updated successfully.
   * 404 Not Found: User not found.

### Delete a User
 * URL: /users/delete/:Id
 * Method: DELETE
 * Request Parameters:
   * Id (integer): User ID (required)
 * Sample Request: /users/delete/1
 * Response Format: 
   * 200 OK: User deleted successfully.
   * 404 Not Found: User not found.

## Running Tests

   * To run tests for the API endpoints, you can use the following command. This will execute the unit tests and provide feedback on the API's functionality.:

 ```bash
 $ npm test
