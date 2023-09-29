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



