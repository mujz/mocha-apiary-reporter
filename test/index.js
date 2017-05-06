"use strict";
let app = require('./server');
let req = require('supertest')(app);

// User Collection
describe("User Collection [/user]", () => {
  // Endpoint
  describe("Create a new user", () =>
    // Endpoint description
    describe(`Creates a new user with 0 cats. If no email or name are specified, a 400 error is returned.`, () => {
      // Request
      it("Creates the user successfully", done => {
        req.post("/user")
          .send({
            name: "Mike Doe",
            email: "mdoe@example.com"
          })
          .expect(200, done);
      });

      // Request
      it("Errors 400 for no name", done => {
        req.post("/user")
          .send({ email: "mdoe@example.com" })
          .expect(400, done);
      });

      // Request
      it("Errors 400 for no email", done => {
        req.post("/user")
          .send({ name: "Mike Doe" })
          .expect(400, done);
      });
    })
  );

  // Endpoint
  describe("Get User Information", () =>
    describe(`Gets the information of the user`, () => {
      it("gets user successfully", done => {
        req.get("/user")
          .expect(200, done);
      });
    })
  )
});

// Collection
describe("Cat Collection [/cat]", () => {
  // Endpoint
  describe("Create Cat", () =>
    // Endpoint description
    describe(`Creates a new cat and associates it to the user with ownerId`, () => {
      // Request
      it("creates the cat successfully", done => {
        req.post("/cat")
          .send({
            name: "Tom",
            ownerId: 1
          })
          .expect(200, done);
      });

      // Request
      it("fails with 400 for non-existent ownerId", done => {
        req.post("/cat")
          .send({
            name: "Tom",
            ownerId: 3
          })
          .expect(400, done);
      });
    })
  );

  describe("Update Cat", () =>
    describe(`Update the information of an already created cat.`, () => {
      it("updates cat successfully", done => {
        req.put("/cat/1")
          .send({ name: "Tom" })
          .expect(200, done);
      });

      it("fails with 404 for non-existent cat", done => {
        req.put("/cat/2")
          .send({ name: "Tom" })
          .expect(404, done);
      });
    })
  );
});
