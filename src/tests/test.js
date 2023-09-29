const User = require("../models/userModel");
const chai = require("chai");
const chaiHttp = require("chai-http");
const index = require("../index");
chai.should();

chai.use(chaiHttp);


describe("/GET users API", () => {
    it("it should return all the users", (done) => {
        chai
            .request(index)
            .get("/api/users")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    })
});

describe("/POST user", () => {
    it("it should new add a user", (done) => {
        let user = {
            name: "test",
            email: "test@gmail.com",
            address: "test",
            city: "test",
            country: "test"
        };
        chai
            .request(index)
            .post("/api/users")
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.data.should.be.a("object");
                res.body.status.should.be.eql("success");
                done();
            });
    })
});


describe("/GET/:id user", () => {
    it("it should get a user by the id", (done) => {
        const userId = "6516e73ebc366cabbf90517b"
        chai
            .request(index)
            .get(`/api/users/${userId}`)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    })
});

describe("/PUT/:id user", () => {
    it("it should UPDATE a user given the id", (done) => {
        const userId = "6516e73ebc366cabbf90517b"
        let user = new User({
            name: "test",
            email: "test@gmail.com",
            address: "test",
            city: "test",
            country: "test"
        });
        chai
            .request(index)
            .put("/api/users/" + userId)
            .send({
                name: "test",
                email: "test@gmail.com",
                address: "test",
                city: "test",
                country: "test"
            })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});

describe("/DELETE/:id user", () => {
    it("it should DELETE a user given the id", (done) => {
        const userId = "6516e73ebc366cabbf90517b"
        let user = new User({
            name: "test",
            email: "test@gmail.com",
            address: "test",
            city: "test",
            country: "test"
        });
        chai
            .request(index)
            .delete("/api/users/" + userId)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});
