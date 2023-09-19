const chai = require("chai");
const chaiHttp = require("chai-http");

const app = require("../src/app");

chai.should();
chai.use(chaiHttp);

describe("app - PUT", () => {
    beforeEach(app.init);

    it("401 - Unauthorized - token is not passed", (done) => {
        chai.request(app)
            .put("/test")
            .end((err, res) => {
                res.should.have.status(401);
                done();
            });
    });

    it("401 - Unauthorized - token not exists", (done) => {
        chai.request(app)
            .put("/test")
            .set("Authorization", "te$t")
            .end((err, res) => {
                res.should.have.status(401);
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
            .put("/test")
            .set("Authorization", "te$t")
            .send(data)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});