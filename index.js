const config = require("config");
const express = require("express");
const app = express();

// Db
require("./startup/db")();
// Routes
require("./startup/routes")(app);

const port = process.env.PORT || config.get("port");
const server = app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);

module.exports = server;
