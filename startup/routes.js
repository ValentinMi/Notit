const express = require("express");
const notes = require("../routes/notes");
const users = require("../routes/users");

module.exports = function(app) {
  app.use(express.json());
  app.use("/api/notes", notes);
  app.use("/api/users", users);
};
