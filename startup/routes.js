const express = require("express");
const auth = require("../routes/auth");
const notes = require("../routes/notes");
const users = require("../routes/users");
const error = require("../middlewares/error");

module.exports = function(app) {
  app.use(express.json());
  app.use("/api/notes", notes);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use(error);
};
