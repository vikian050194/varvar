const chai = require("chai");
const chaiHttp = require("chai-http");

const app = require("../src/app");

chai.should();
chai.use(chaiHttp);

describe("app - POST", () => {
    beforeEach(app.init);

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
                done();
            });
    });

    it("401 - Unauthorized", (done) => {
        const data = {
            number: 1234
        };

        chai.request(app)
            .post("/test")
            .send(data)
            .end((err, res) => {
                res.should.have.status(401);
                done();
            });
    });

    it("409 - Conflict", (done) => {
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
            .post("/test")
            .set("Authorization", "te$t")
            .send(data)
            .end((err, res) => {
                res.should.have.status(409);
                done();
            });
    });
});