process.env.NODE_ENV = "test";

import chai from "chai";

const expect = chai.expect;

describe("/First Trst Collection", function () {
  it("should test two values...", function () {
    // actual test content in here
    let expectedVal = 10;
    let actualVal = 5;

    expect(actualVal).to.be.equal(expectedVal);
  });
});
