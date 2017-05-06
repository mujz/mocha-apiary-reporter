Apiary Documentation for your Node.js RESTful API

![Apairy Screenshot](/screenshot.png)

`mocha-apiary-reporter` is a [Mocha](https://github.com/visionmedia/mocha) reporter that understands [Supertest](https://github.com/visionmedia/supertest) to generate reliable and up-to-date API samples. It allows you to:

- define concrete request/response examples in your test suite
- if you need to, use mocks to make sure you fully control the API responses
- add a few explanations
- get high-level API documentation that's beautiful and always up-to-date!

*Works with any Node.js `http.Server`, like [Express](https://github.com/visionmedia/express) or [Restify](https://github.com/mcavage/node-restify)*

## Results

Check out [the demo docs](http://docs.catsapi1.apiary.io/) to see the final result.

## Setup

```
npm install mocha-apiary-reporter --save-dev
```

You also need to specify documentation options in a **mocha-apiary.json** file at the root. This file has to be valid JSON, but also supports comments:

```js
{
  "baseUrl": "http://example.com/",
  "name": "Cats API",
  "description": "Cats is a super simple API of cats and their human owners. Check out docs at: https://app.apiary.io/catsapi1",

  // Mocha reporter to display test results
  // e.g. Dot, TAP, Spec...
  "reporter": "Spec",
}
```

## Usage

Have a look at the [test example](http://github.com/mujz/mocha-apiary-reporter/blob/master/test/index.js) to get started.

Simply use nested `describe` blocks, and it will generate the request/response documentation for you! The first `describe` is the header of a collection of endpoints. The next `describe` is each endpoints header. The 3rd, and final, `describe` is the description of that endpoint.

```js
let app = require("./server");
let req = require("supertest")(app);

describe("User Collection [/user]", () => {
  describe("Create a new user", () =>
    describe("A description of what this API endpoint does", () => {
      it("creates the user", done =>
        req.post("/user")
        .body(userInfo)
        .expect("Content-Type", /json/)
        .expect(200, done)
      );

      it("fails due to bad email", done =>
        req.post("/user")
        .body(userInfoWithBadEmail)
        .expect("Content-Type", /text/)
        .expect(400, done)
      );
    })
  );
})
```

Then run your tests:

```bash
./node_modules/.bin/mocha --reporter mocha-apiary-reporter path/to/tests
```

Note that the text of the `it` doesn't show up in the docs.

## Credits and More

Huge thanks go to the authors of [supersamples](https://github.com/rprieto/supersamples). I used a lot of ideas from their work.

If you're looking to generate API docs in Markdown, HTML, or JSON format, you check [supersamples](https://github.com/rprieto/supersamples) out.

## Contributions

Any kind of contribution would be highly appreciated. You are welcome, and encouraged, to use the pull requests and issues sections of this repo :)

