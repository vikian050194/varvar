const chai = require("chai");
const chaiHttp = require("chai-http");

const app = require("../src/app");

chai.should();
chai.use(chaiHttp);

describe("app - GET", () => {
    beforeEach(app.init);

    it("400 - Bad Request", (done) => {
        chai.request(app)
            .get("/test/test")
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it("404 - Not Found", (done) => {
        chai.request(app)
            .get("/test")
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });

    it("200 - OK", (done) => {
        const data = {
            number: 1234
        };

        chai.request(app)
            .post("/test")
            .set("Authorization", "te$t")
            .send(data)
            .end((err, res) => {
                res.should.have.status(200);
            });

        chai.request(app)
            .get("/test")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("number", 1234);
                done();
            });
    });
});