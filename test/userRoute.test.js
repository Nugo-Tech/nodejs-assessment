const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/index'); // Path to  Express app file
const Users = require('../src/models/userModel'); // Path to your Mongoose model
const expect = chai.expect;

chai.use(chaiHttp);

// Test script for read user by id - http://localhost:5000/users/:Id
describe('User Routes', () => {
  describe('GET /users/:Id', () => {
    it('should get a user by Id', function (done) {
      this.timeout(5000); // Set the timeout for this test case

      const userIdToTest = 1; // Assuming a user with Id 1 in your database for testing

      chai
        .request(app) // Reference to Express app
        .get(`/users/${userIdToTest}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.User).to.be.an('object');
          expect(res.body.User.Id).to.equal(userIdToTest); // Check if the returned Id matches the requested Id
          done();
        });
    });

    it('should return 404 for a non-existent user', function (done) {
      this.timeout(5000); // Set the timeout for this test case
      
      const userIdToTest = 999; // Assuming don't have a user with Id 999 in database for testing

      chai
        .request(app) // Reference to Express app
        .get(`/users/${userIdToTest}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('User not found');
          done();
        });
    });
  });
});

// Test script for insert data - http://localhost:5000/users/insert
describe('User Routes', () => {
  describe('POST /users/insert', () => {
    it('should insert a new user and return 200 OK', function (done) {
      this.timeout(5000);

      // Define a new user data object for testing
      const newUser = {
        Id: 7, // A unique ID not already in the database
        name: 'Test User',
        email: 'test@example.com',
        address: '123 Test St',
        city: 'Test City',
        country: 'Test Country',
      };

      chai
        .request(app) // Reference to Express app
        .post('/users/insert')
        .send(newUser)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.Success).to.equal('New user saved successfully');
          done();
        });
    });

    it('should return 400 Bad Request for an invalid user data', function (done) {
      this.timeout(5000);

      // Define an invalid user data object for testing
      const invalidUser = {
        name: 'Invalid User',
        // Missing other required fields like email, address, etc.
      };

      chai
        .request(app)
        .post('/users/insert')
        .send(invalidUser)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body.errors).to.be.an('array'); // Assuming validation errors are returned as an array
          done();
        });
    });
  });
});

// Test script for update user by id - http://localhost:5000/users/update/:Id
describe('User Routes', () => {
  describe('PUT /users/update/:Id', () => {
    it('should update user data by Id', function (done) {
      this.timeout(10000);
     
      const userIdToTest = 2;  // Assuming a user with Id 2 in your database for testing
      const updatedUserData = {
        Id: 2,
        name: 'Updated user',
        email: 'updateduser@example.com',
        address: 'Updated Address',
        city: 'Updated City',
        country: 'Updated Country',
      };

      chai
        .request(app) // Reference to Express app
        .put(`/users/update/${userIdToTest}`)
        .send(updatedUserData)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.Success).to.equal('User data updated successfully');

          // Optionally, also check if the user data has been updated in the database
          Users.findOne({ Id: userIdToTest }).then((user) => {
            expect(user).to.exist;
            expect(user.name).to.equal(updatedUserData.name);
            expect(user.email).to.equal(updatedUserData.email);
            done();
          });
        });
    });

    it('should return 404 for updating a non-existent user', function (done) {
      this.timeout(5000);
     
      const userIdToTest = 100; // Assuming there is no user with Id 999 in your database for testing

      const updatedUserData = {
        Id: 100,
        name: 'Updated Name',
        email: 'updated@example.com',
        address: 'Updated Address',
        city: 'Updated City',
        country: 'Updated Country',
      };

      chai
        .request(app)
        .put(`/users/update/${userIdToTest}`)
        .send(updatedUserData)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('User not found');
          done();
        });
    });
  });
});

// Test script for delete user by id - http://localhost:5000/users/delete/:Id
// Assuming have a user with Id 6 in your database for testing
const userIdToTestDelete = 6;

describe('User Routes', () => {
  describe('DELETE /users/delete/:Id', () => {
    it('should delete a user by Id', function (done) {
      this.timeout(10000);

      chai
        .request(app)
        .delete(`/users/delete/${userIdToTestDelete}`)
        .end(async (err, res) => {
          // Check if the user was deleted successfully
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.success).to.equal(
            'User information deleted successfully'
          );

          // Verify that the user with the specified Id no longer exists in the database
          const deletedUser = await Users.findOne({ Id: userIdToTestDelete });
          expect(deletedUser).to.be.null;

          done();
        });
    });

    it('should return 404 for deleting a non-existent user', function (done) {
      this.timeout(5000);
   
      const nonExistentUserIdDelete = 999; // Assuming there is no user with Id 999 in the database

      chai
        .request(app) // Reference to Express app
        .delete(`/users/delete/${nonExistentUserIdDelete}`)
        .end((err, res) => {
          // Check that the response indicates the user was not found
          expect(res).to.have.status(404);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('User not found');
          done();
        });
    });
  });
});
