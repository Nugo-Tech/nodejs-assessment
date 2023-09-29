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
&ensp;"_id": "6516e836bc366cabbf905181",  
&ensp; "name": "john",  
&ensp; "email": "cena",  
&ensp;"address": "test addres",  
&ensp;"city": "west newbury",  
&ensp;"country": "USA",  
&ensp;"__V": 0  
}

### Add user Method : POST
Route - localhost:5000/api/users  
Request Format:  
{  
&ensp;"name": "john cena",
&ensp;"email": "cena@gmail.com",
&ensp;"address": "test address",
&ensp;"city": "west newbury",
&ensp;"country": "USA"
}  
Response Format:  
{  
&ensp;"data": {  
&ensp;"name": "john cena",  
&emsp;"email": "cena@gmail.com",  
&emsp;"address": "test address",  
&emsp;		"city": "west newbury",  
&emsp;		"country": "USA",  
&emsp;		"_id": "6516e836bc366cabbf905181",  
&emsp;		"__v": 0  
	},  
	"status": "success"  
}  

### Get User by Id Method: GET
Route - localhost:5000/api/users/:id  
Response Format:   
{  
	"data": {  
	&emsp;"name": "john cena",  
	&emsp;"email": "cena@gmail.com",  
	&emsp;"address": "test address",  
	&emsp;"city": "west newbury",  
	&emsp;"country": "USA",  
	&emsp;"_id": "6516e836bc366cabbf905181",  
	&emsp;"__v": 0  
	},  
	"status": "success"  
}

### Edit user Method : PUT
Route - localhost:5000/api/users/:id  
Request Format:  
{  
&emsp;"name": "john cena",  
&emsp;"email": "cena@gmail.com",  
&emsp;"address": "test address",  
&emsp;"city": "west newbury",  
&emsp;"country": "USA"  
}  
Response Format:  
{  
	"data": {  
	&emsp;"name": "john cena",  
	&emsp;"email": "cena@gmail.com",  
	&emsp;"address": "test address",  
	&emsp;"city": "west newbury",  
	&emsp;"country": "USA",  
	&emsp;"_id": "6516e836bc366cabbf905181",  
	&emsp;"__v": 0  
	},  
	"status": "success"  
}  

### Delete user method : DELETE
Route - localhost:5000/api/users/:id  
Response Format:  
{  
	"data":{  
		&emsp;"_id": "6516e73ebc366cabbf90517b",  
		&emsp;"name": "brock lesner",  
		&emsp;"email": "brock@gmail.com",  
		&emsp;"address": "brock new address",  
		&emsp;"city": "dakota",  
		&emsp;"country": "USA",  
		&emsp;"__v": 0  
		},  
	"status": "success"  
}  
