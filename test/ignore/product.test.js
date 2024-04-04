process.env.NODE_ENV = "test";
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = rewrite('chai-http')
const server = require('../../server');

import chai from "chai";


describe("/First Trst Collection", function () {
  it("should test two values...", function () {
    // actual test content in here
    let expectedVal = 10;
    let actualVal = 5;

    expect(actualVal).to.be.equal(expectedVal);
  });
});

/* describe('Product workflow tests', () => {
  it('should reguster + login a user, create product and VERIFY 1 in DB'(done) => {
    .end((err, res) => {

    }
  })
}) */