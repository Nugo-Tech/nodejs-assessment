# API End Points

## Running the Application

To run the application, use the following commands:

```bash
npm i
nodemon index.js
Running Tests
To run the tests, use the following commands:

bash
Copy code
npm i
npm test
Add User Method : POST
Route: /api/users

Results of Unit Test on Add User POST Users Api
Validation Errors: []

It Should Post a new User (303ms)
Request Format:

json
Copy code
{
  "name": "John",
  "email": "Bala@gmail.com",
  "address": "Sivan Street",
  "city": "Trinco-Col",
  "country": "USA"
}
Response formats:

json
Copy code
{
  "user": {
    "name": "John",
    "email": "Bala@gmail.com",
    "address": "Sivan Street",
    "city": "Trinco-Col",
    "country": "USA",
    "_id": "61212312adf12312",
    "createdAt": "2023-09-26T15:24:30.724Z",
    "updatedAt": "2023-09-26T15:24:30.724Z",
    "__v": 0
  },
  "message": "User created successfully"
}
Get Single User Method : GET
Route: /api/users/:id

Results of Unit Test on GET Single User GET Users Api

Should return a single user by ID (4307ms)
Update Single User Method : PUT
Route: /api/users/:id

Request Format:

json
Copy code
{
  "name": "John",
  "email": "Bala@gmail.com",
  "address": "Sivan Street",
  "city": "Trinco-Col",
  "country": "USA"
}
Response formats:

json
Copy code
{
  "updatedUser": {
    "_id": "6512asdasasdasdasd",
    "name": "NithushanUpdatedasdasdd",
    "email": "Nithu@gmail.com",
    "address": "Sivan Street",
    "city": "asd",
    "country": "Sri Lanka",
    "createdAt": "2023-09-26T15:29:14.121Z",
    "updatedAt": "2023-09-26T15:29:48.100Z",
    "__v": 0
  },
  "message": "User updated successfully"
}
Results of Unit Test on Update User PUT Users Api
Validation Errors: []

It Should Put an updating User (517ms)
Delete User Method : DELETE
Route: /api/users/:id

Response Format:

json
Copy code
{
  "message": "User deleted successfully"
}
Results of Unit Test on DELETE User DELETE Users Api

Should delete a single user by ID (516ms)