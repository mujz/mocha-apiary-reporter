"use strict";
const express = require('express');
var bodyParser = require('body-parser')
const app = express();

let user = {
  id: 1,
  name: "John Doe",
  email: "jdoe@example.com"
}
let cat = {
  id: 1,
  name: "Garfield",
  ownerId: 1
}

app.use(bodyParser.json());

// => User
// Get mock user
app.get('/user', (req, res) => res.status(200).json(user));

// Create new user
app.post('/user', (req, res) => {
  let stat, body;
  if (!req.body || !req.body.name || !req.body.email) {
    stat = 400;
    body = "Must send a request body containing user's name and email";
  } else if (req.body.email === user.email) {
    stat = 409;
    body = "Email " + req.body.email + " is already in use.";
  } else {
    stat = 200;
    body = req.body;
    body.id = 2;
  }
  return res.status(stat).send(body)
});

// => Cats
// Get mock cat
app.get('/cat', (req, res) => res.status(200).json(cat));

// Create new cat
app.post('/cat', (req, res) => {
  let stat, body;
  if (!req.body || !req.body.name || !req.body.ownerId) {
    stat = 400;
    body = "Must send a request body containing cat's name and ownerId";
  } else if (req.body.ownerId !== user.id) {
    stat = 400;
    body = "Owner ID " + req.body.ownerId + " does not exist";
  } else {
    stat = 200;
    body = req.body;
    body.id = 2;
  }
  return res.status(stat).send(body);
});

// Update existing cat
app.put("/cat/:id", (req, res) => {
  let stat, body;
  if (parseInt(req.params.id) === 1) {
    stat = 200;
    body = Object.assign(cat, req.body);
  } else {
    stat = 404;
    body = "Cat not found";
  }
  return res.status(stat).send(body);
});

module.exports = app;
