const chai = require("chai");
const chaiHttp = require("chai-http");
const index = require("../index");

chai.should();
chai.use(chaiHttp);

describe("GET Users Api", () => {
    it("Should return a single user by ID", (done) => {
      const userId = "UserID"; // Replace with a valid user ID from your database

      chai.request(index)
        .get(`/api/users/${userId}`)
        .end((err, response) => {
          if (err) {
            return done(err);
          }
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("message");
          response.body.should.have.property("user");    
          done();
        });
    }).timeout(10000);
})

describe("POST Users Api", () => {
    it("It Should Post a new User",(done)=>{
        const user = {
            name:"Data",
            email:"Email",
            address:"Address",
            city:"City",
            country:"Country"
        }
        chai.request(index)
            .post('/api/users')
            .send(user)
            .end((err,response) => {
                response.should.have.status(201)
                response.body.should.be.a('object')
                response.body.should.have.property("message");
                response.body.should.have.property("user");
                done();
            }
    )})
});

describe("PUT Users Api", () => {
    it("It Should Put a updating User",(done)=>{
        const userId = "6512ec86b5565d82a5e4510c"
        const user = {
            name:"UpdatedName",
            email:"UpdatedEmail",
            address:" UpdatedAddress",
            city:"UpdatedCity",
            country:"UpdatedNameCountry"
        }
        chai.request(index)
            .put(`/api/users/${userId}`)
            .send(user)
            .end((err,response) => {
                response.should.have.status(200)
                response.body.should.be.a('object')
                response.body.should.have.property("message");
                response.body.should.have.property("updatedUser");
                done();
            }
    )})

});

describe("DELETE Users Api", () => {
    it("Should delete a single user by ID", (done) => {
      const userId = "UserID"; 
      chai.request(index)
        .delete(`/api/users/${userId}`)
        .end((err, response) => {
            response.should.have.status(200);
            done();
        });
    }).timeout(5000)
})
