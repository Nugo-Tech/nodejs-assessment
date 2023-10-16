<h2>Node.js CRUD Application</h2>
<br/>
##follow this instructions on how to run the application.

- make sure you have to install below application.
	sudo apt install nodejs
	sudo apt install mysql-server
	
- colone the repository
	git clone https://github.comdilanasiri/nodejs-assessment.git
	
- npm install

- npm start

##To save a user details make post request->

- Add User Method : POST
- url		  : http://localhost:5000/api/v1/users

Request Format:

  request body->json object 
     
	{
	  "id":"enter id",
	  "name":"enter name here",
	  "email":"enter email here",
	  "address':"enter address here",
	  "city":"enter city here",
	  "country":"enter country here"
	}

Response formats:

json

	{
	 "user": 
	 {
	  "id":1,
	  "name":"asiri",
	  "email":"asiri@gmail.com",
	  "address':"Niyangama",
	  "city":"Godakawela",
	  "country":"Sri Lanka"
	 },
	 "message": "User created"
	}

##To retrive user using id ->

- Get Single User Method : GET
- url			 : http://localhost:5000/api/v1/users/id


##To edit user details make patch request-> 

- Update Single User Method : PUT
- url			    : http://localhost:5000/api/v1/users/id

Request Format:

json

  request body->json object 
  
	{
	 "id":"enter id",
	 "name":"enter name here",
	 "email":"enter email here",
	 "address':"enter address here",
	 "city":"enter city here",
	 "country":"enter country here"
	}
Response formats:

json

	{
	 "user": 
	 {
	  "id":1,
	  "name":"asiri",
	  "email":"asiri@gmail.com",
	  "address':"Niyangama",
	  "city":"Godakawela",
	  "country":"Sri Lanka"
	 },
	 "message": "User Updated"
	}

##To delete user using id ->

- Delete User Method : DELETE
- url		     :   http://localhost:5000/api/v1/users/id

Response Format:

json
{
  "message": "User deleted"
}
