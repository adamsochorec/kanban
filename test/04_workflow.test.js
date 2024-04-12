const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const server = require("../server");

chai.use(chaiHttp);

describe("Pizza workflow tests", () => {
  // POST Create functional test
  it("should register + login a user, create Pizza and verify 1 in DB", (done) => {
    // 1) Register new user
    let user = {
      name: "Peter Petersen",
      email: "mail@petersen.com",
      password: "123456",
    };
    chai
      .request(server)
      .post("/api/user/register")
      .send(user)
      .end((err, res) => {
        // Asserts
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.a("object");
        expect(res.body.error).to.be.equal(null);

        // 2) Login the user
        chai
          .request(server)
          .post("/api/user/login")
          .send({
            email: "mail@petersen.com",
            password: "123456",
          })
          .end((err, res) => {
            // Asserts
            expect(res.status).to.be.equal(200);
            expect(res.body.error).to.be.equal(null);
            let token = res.body.data.token;

            // 3) Create new Pizza
            let Pizza = {
              task: "Test",
              description: "test, test...",
              status: "Doing",
              time: 40,
            };

            chai
              .request(server)
              .post("/api/pizzas")
              .set({ "auth-token": token })
              .send(Pizza)
              .end((err, res) => {
                // Asserts
                expect(res.status).to.be.equal(201);
                expect(res.body).to.be.a("array");
                expect(res.body.length).to.be.eql(1);

                let savedPizza = res.body[0];
                expect(savedPizza.task).to.be.equal(Pizza.task);
                expect(savedPizza.description).to.be.equal(Pizza.description);
                expect(savedPizza.status).to.be.equal(Pizza.status);
                expect(savedPizza.time).to.be.equal(Pizza.time);

                // 4) Verify one Pizza in test DB
                chai
                  .request(server)
                  .get("/api/pizzas/")
                  .end((err, res) => {
                    // Asserts
                    expect(res.status).to.be.equal(200);
                    expect(res.body).to.be.a("array");
                    expect(res.body.length).to.be.eql(1);

                    done();
                  });
              });
          });
      });
  });

  // Valid input test (register, login, )
  it("should register + login a user, create Pizza and delete it from DB", (done) => {
    // 1) Register new user
    let user = {
      name: "Peter Petersen",
      email: "mail@petersen.com",
      password: "123456",
    };
    chai
      .request(server)
      .post("/api/user/register")
      .send(user)
      .end((err, res) => {
        // Asserts
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.a("object");
        expect(res.body.error).to.be.equal(null);

        // 2) Login the user
        chai
          .request(server)
          .post("/api/user/login")
          .send({
            email: "mail@petersen.com",
            password: "123456",
          })
          .end((err, res) => {
            // Asserts
            expect(res.status).to.be.equal(200);
            expect(res.body.error).to.be.equal(null);
            let token = res.body.data.token;

            // 3) Create new Pizza
            let Pizza = {
              task: "Test Test",
              description: "test, test...",
              status: "Done",
              time: 20,
            };

            chai
              .request(server)
              .post("/api/pizzas")
              .set({ "auth-token": token })
              .send(Pizza)
              .end((err, res) => {
                // Asserts
                expect(res.status).to.be.equal(201);
                expect(res.body).to.be.a("array");
                expect(res.body.length).to.be.eql(1);

                let savedPizza = res.body[0];
                expect(savedPizza.task).to.be.equal(Pizza.task);
                expect(savedPizza.description).to.be.equal(Pizza.description);
                expect(savedPizza.status).to.be.equal(Pizza.status);
                expect(savedPizza.time).to.be.equal(Pizza.time);

                // 4) Delete Pizza
                chai
                  .request(server)
                  .delete("/api/pizzas/" + savedPizza._id)
                  .set({ "auth-token": token })
                  .end((err, res) => {
                    // Asserts
                    expect(res.status).to.be.equal(200);
                    const actualVal = res.body.message;
                    expect(actualVal).to.be.equal(
                      "Pizza was successfully deleted."
                    );
                    done();
                  });
              });
          });
      });
  });

  // Invalid input test
  it("invalid user input test", (done) => {
    // 1) Register new user with invalid inputs
    let user = {
      name: "Peter Petersen",
      email: "mail@petersen.com",
      password: "123", //Faulty password - Joi/validation should catch this...
    };
    chai
      .request(server)
      .post("/api/user/register")
      .send(user)
      .end((err, res) => {
        // Asserts
        expect(res.status).to.be.equal(400); //normal expect with no custom output message
        //expect(res.status,"Status is not 400 (NOT FOUND)").to.be.equal(400); //custom output message at fail

        expect(res.body).to.be.a("object");
        //expect(res.body.error.message).to.be.equal("\"password\" length must be at least 6 characters long");
        done();
      });
  });
});
