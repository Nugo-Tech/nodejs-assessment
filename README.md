# Node.js CRUD Application Assessment

## How to run the applicatiom
1. Insatall node modules - npm i
2. npm run dev
3. to run tests - npm run test

## API Routes

### Get User by Id Method: GET
Route - localhost:5000/api/users
Request Format:
{
	"data": [
		{
			"_id": "121323",
			"name": "brock lesner",
			"email": "brock@gmail.com",
			"address": "brock new address",
			"city": "dakota",
			"country": "USA",
			"__v": 0
		}
	],
	"status": "success"
}

### Add user Method : POST
Route - localhost:5000/api/users
Request Format:
{
  "name": "john cena",
  "email": "cena@gmail.com",
  "address": "test address",
	"city": "west newbury",
	"country": "USA"
}
Response Format:
{
	"data": {
		"name": "john cena",
		"email": "cena@gmail.com",
		"address": "test address",
		"city": "west newbury",
		"country": "USA",
		"_id": "6516e836bc366cabbf905181",
		"__v": 0
	},
	"status": "success"
}

### Get User by Id Method: GET
Route - localhost:5000/api/users/:id
Response Format: 
{
	"data": {
		"name": "john cena",
		"email": "cena@gmail.com",
		"address": "test address",
		"city": "west newbury",
		"country": "USA",
		"_id": "6516e836bc366cabbf905181",
		"__v": 0
	},
	"status": "success"
}

### Edit user Method : PUT
Route - localhost:5000/api/users/:id
Request Format:
{
  "name": "john cena",
  "email": "cena@gmail.com",
  "address": "test address",
	"city": "west newbury",
	"country": "USA"
}
Response Format:
{
	"data": {
		"name": "john cena",
		"email": "cena@gmail.com",
		"address": "test address",
		"city": "west newbury",
		"country": "USA",
		"_id": "6516e836bc366cabbf905181",
		"__v": 0
	},
	"status": "success"
}

### Delete user method : DELETE
Route - localhost:5000/api/users/:id
Response Format:
{
	"data": {
		"name": "john cena",
		"email": "cena@gmail.com",
		"address": "test address",
		"city": "west newbury",
		"country": "USA",
		"_id": "6516e836bc366cabbf905181",
		"__v": 0
	},
	"status": "success"
}
