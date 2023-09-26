# User Management API

The User Management API is a Node.js application that provides REST-ful endpoints for managing user data.

## Table of Contents

- [API Endpoints](#api-endpoints)
    - [Get All Users](#get-all-users)
    - [Get User by ID](#get-user-by-id)
    - [Create User](#create-user)
    - [Update User](#update-user)
    - [Delete User](#delete-user)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
- [Running the Application](#running-the-application)


## API Endpoints

### Get All Users

- **Endpoint URL**: `/app/api/v1/user`
- **HTTP Method**: GET
- **Request Format**: None (no request body)
- **Response Format**:
    - `id` (number): User ID
    - `name` (string): User's name
    - `email` (string): User's email address
    - `address` (string): User's address
    - `city` (string): User's city
    - `country` (string): User's country
- **Request Example**: N/A (no request body)
- **Response Example**:
  ```json
  [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "address": "123 Main St",
      "city": "Anytown",
      "country": "USA"
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "email": "jane@example.com",
      "address": "456 Elm St",
      "city": "Otherville",
      "country": "Canada"
    }
  ]
### Get User by ID

- **Endpoint URL**: `/app/api/v1/user/id`
- **HTTP Method**: GET
- **Request Format**: URL parameter `id` (number)
- **Response Format**:
    - `id` (number): User ID
    - `name` (string): User's name
    - `email` (string): User's email address
    - `address` (string): User's address
    - `city` (string): User's city
    - `country` (string): User's country
- **Request Example**: `/app/api/v1/user/1`
- **Response Example**:
  ```json
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "address": "123 Main St",
    "city": "Anytown",
    "country": "USA"
  }


### Create User

- **Endpoint URL**: `/app/api/v1/user`
- **HTTP Method**: POST
- **Request Format**:

  ```
  {
    "name": "New User",
    "email": "new@example.com",
    "address": "789 Oak St",
    "city": "Newville",
    "country": "UK"
  }

- **Response Format**:
    ```
    {
        id (number): User ID
        name (string): User's name
        email (string): User's email address
        address (string): User's address
        city (string): User's city
        country (string): User's country
    }

- **Request Example**:

    

    {
        "name": "New User",
        "email": "new@example.com",
        "address": "789 Oak St",
        "city": "Newville",
        "country": "UK"
    }

Response Example:

    

    {
      "id": 3,
      "name": "New User",
      "email": "new@example.com",
      "address": "789 Oak St",
      "city": "Newville",
      "country": "UK"
    }

### Update User

- **Endpoint URL**: `/app/api/v1/user/id`
- **HTTP Method**: PATCH
- **Request Format**:

    ```json

    {
        "name": "Updated User"
    }

- **Response Format**:

    ```json
    {
        id (number): User ID
        name (string): User's name
        email (string): User's email address
        address (string): User's address
        city (string): User's city
        country (string): User's country
    }

- **Request Example**:

    ```json

     {
      "id": 3,
      "name": "Updated User",
      "email": "new@example.com",
      "address": "789 Oak St",
      "city": "Newville",
      "country": "UK"
    }

- **Response Example**:

    ```json

    {
      "id": 3,
      "name": "Updated User",
      "email": "new@example.com",
      "address": "789 Oak St",
      "city": "Newville",
      "country": "UK"
    }

### Delete User

- **Endpoint URL**: `/app/api/v1/user/id`
- **HTTP Method**: DELETE
- **Request Format**: URL parameter `id` (number)
- **Response Format**: None
- **Request Example**: `/app/api/v1/user/3`
- **Response Example**: HTTP status code 204 (No Content)


### Getting Started
#### Prerequisites

Before running the application, make sure you have the following prerequisites installed:

   - Node.js: Download Node.js
   - MySQL Server: Download MySQL

#### Installation

   - Clone the repository:git clone <repository-url>
   - Install the project dependencies:

    
    npm install

   - create database and the table as schema.sql file
    
    
     CREATE TABLE users (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     email VARCHAR(255) NOT NULL,
     address VARCHAR(255),
     city VARCHAR(255),
     country VARCHAR(255)
     );

   - update the .env file in the project root directory and configure the following environment variables:

.env

    DB_HOST=your-database-host
    DB_PORT=your-database-port
    DB_DATABASE=your-database-name
    DB_USERNAME=your-database-username
    DB_PASSWORD=your-database-password

### Running the Application

- To start the application, run the following command:

  ```
  npm start

- Your API will be accessible at http://localhost:8080/app/api/v1/user.

nimanthika abeyrathna - nimanthikaabeyrathna@gmail.com

