// Import necessary libraries
const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const server = require("../server");
import { describe, it, beforeAll, afterAll, beforeEach, expect } from "vitest";
import request from "supertest";
import app from "../app";
import User from "../models/user";
import Employee from "../models/employee";

// Use chaiHttp for making HTTP requests in tests
chai.use(chaiHttp);

// Describe the group of tests
describe("Pizza workflow tests", () => {
  // Test for creating a pizza
  it("Register + login a user, create document and verify 1 in DB", (done) => {
    // Define a new user
    let user = {
      name: "Gabor Gabor",
      email: "mail@gabor.dk",
      password: "123456",
    };

    // Make a POST request to register the new user
    chai
      .request(server)
      .post("/user/register")
      .send(user)
      .end((err, res) => {
        // Assert that the response status is 200 and the response body is an object with no errors
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.a("object");
        expect(res.body.error).to.be.equal(null);

        // Make a POST request to login the user
        chai
          .request(server)
          .post("/user/login")
          .send({
            email: "mail@gabor.dk",
            password: "123456",
          })
          .end((err, res) => {
            // Assert that the response status is 200 and the response body has no errors
            expect(res.status).to.be.equal(200);
            expect(res.body.error).to.be.equal(null);
            let token = res.body.data.token;

            // Define a new pizza
            let Pizza = {
              name: "Test",
              description: "test, test...",
              status: "Doing",
              duration: 40,
            };

            // Make a POST request to create a new pizza
            chai
              .request(server)
              .post("/tasks")
              .set({ "auth-token": token })
              .send(Pizza)
              .end((err, res) => {
                // Assert that the response status is 201, the response body is an array with one element, and the saved pizza matches the input
                expect(res.status).to.be.equal(201);
                expect(res.body).to.be.a("array");
                expect(res.body.length).to.be.eql(1);

                let savedPizza = res.body[0];
                expect(savedPizza.task).to.be.equal(Pizza.task);
                expect(savedPizza.description).to.be.equal(Pizza.description);
                expect(savedPizza.status).to.be.equal(Pizza.status);
                expect(savedPizza.time).to.be.equal(Pizza.time);

                // Make a GET request to verify the pizza in the database
                chai
                  .request(server)
                  .get("/tasks/")
                  .end((err, res) => {
                    // Assert that the response status is 200, the response body is an array with one element
                    expect(res.status).to.be.equal(200);
                    expect(res.body).to.be.a("array");
                    expect(res.body.length).to.be.eql(1);

                    done();
                  });
              });
          });
      });
  });

  // Test for deleting a pizza
  it("Register + login a user, create document and delete it from DB", (done) => {
    // Define a new user
    let user = {
      name: "Gabor Gabor",
      email: "mail@gabor.dk",
      password: "123456",
    };
    // filepath: /Users/adamsochorec/Library/Mobile Documents/com~apple~CloudDocs/Programming/slavic.media/backend/src/test/02_employee.test.ts

    const userData = {
      name: "Employee Tester",
      email: "employee_tester@slavic.media",
      password: "password123",
    };

    const employeeData = {
      name: "John Doe",
      department: "Engineering",
      description: "Backend Developer",
      flag: "cz",
      email: "john.doe@example.com",
      birthday: "1990-01-01T00:00:00.000Z",
      linkedin: "john-linkedin",
      github: "john-github",
    };

    let token: string;
    let createdEmployeeId: string;

    beforeAll(async () => {
      await User.deleteMany({});
      await Employee.deleteMany({});
      await request(app).post("/user/register").send(userData);
      const res = await request(app)
        .post("/user/login")
        .send({ email: userData.email, password: userData.password });
      token = res.body.data.token;
    });

    afterAll(async () => {
      await User.deleteMany({});
      await Employee.deleteMany({});
    });

    beforeEach(async () => {
      await Employee.deleteMany({});
    });

    describe("Employee CRUD Operations", () => {
      it("should create an employee", async () => {
        const res = await request(app)
          .post("/employee")
          .set("Authorization", `Bearer ${token}`)
          .send(employeeData);
        expect(res.status).toBe(201);
        expect(res.body.name).toBe(employeeData.name);
        expect(res.body.email).toBe(employeeData.email);
        createdEmployeeId = res.body._id;
      });

      it("should get all employees", async () => {
        await request(app)
          .post("/employee")
          .set("Authorization", `Bearer ${token}`)
          .send(employeeData);
        const res = await request(app)
          .get("/employee")
          .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(1);
        expect(res.body[0].name).toBe(employeeData.name);
      });

      it("should update an employee", async () => {
        const createRes = await request(app)
          .post("/employee")
          .set("Authorization", `Bearer ${token}`)
          .send(employeeData);
        const empId = createRes.body._id;
        const updateRes = await request(app)
          .put(`/employee/${empId}`)
          .set("Authorization", `Bearer ${token}`)
          .send({ name: "Jane Doe" });
        expect(updateRes.status).toBe(200);
        expect(updateRes.body.name).toBe("Jane Doe");
      });

      it("should delete an employee", async () => {
        const createRes = await request(app)
          .post("/employee")
          .set("Authorization", `Bearer ${token}`)
          .send(employeeData);
        const empId = createRes.body._id;
        const deleteRes = await request(app)
          .delete(`/employee/${empId}`)
          .set("Authorization", `Bearer ${token}`);
        expect(deleteRes.status).toBe(200);
        expect(deleteRes.body.message).toMatch(/deleted/i);
        // Confirm deletion
        const getRes = await request(app)
          .get("/employee")
          .set("Authorization", `Bearer ${token}`);
        expect(getRes.body.length).toBe(0);
      });
    });
                // Assert that the response status is 201, the response body is an array with one element, and the saved pizza matches the input
                expect(res.status).to.be.equal(201);
                expect(res.body).to.be.a("array");
                expect(res.body.length).to.be.eql(1);

                let savedPizza = res.body[0];
                expect(savedPizza.task).to.be.equal(Pizza.task);
                expect(savedPizza.description).to.be.equal(Pizza.description);
                expect(savedPizza.status).to.be.equal(Pizza.status);
                expect(savedPizza.time).to.be.equal(Pizza.time);

                // Make a DELETE request to delete the pizza
                chai
                  .request(server)
                  .delete("/tasks/" + savedPizza._id)
                  .set({ "auth-token": token })
                  .end((err, res) => {
                    // Assert that the response status is 200 and the pizza was successfully deleted
                    expect(res.status).to.be.equal(200);
                    const actualVal = res.body.message;
                    expect(actualVal).to.be.equal(
                      "Document was successfully deleted."
                    );
                    done();
                  });
              });
          });
      });
  });

  // Test for invalid user input
  it("invalid user input test", (done) => {
    // Define a new user with invalid input
    let user = {
      name: "Gabor Gabor",
      email: "mail@gabor.dk",
      password: "123", //Faulty password - Joi/validation should catch this...
    };

    // Make a POST request to register the new user
    chai
      .request(server)
      .post("/user/register")
      .send(user)
      .end((err, res) => {
        // Assert that the response status is 400 and the response body is an object
        expect(res.status).to.be.equal(400); //normal expect with no custom output message
        //expect(res.status,"Status is not 400 (NOT FOUND)").to.be.equal(400); //custom output message at fail

        expect(res.body).to.be.a("object");
        //expect(res.body.error.message).to.be.equal("\"password\" length must be at least 6 characters long");
        done();
      });
  });
});
