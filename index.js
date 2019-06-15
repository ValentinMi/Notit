const config = require("config");
const express = require("express");
const app = express();
const port = process.env.PORT || config.get("port");

require("./startup/db")();

const server = app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);

module.exports = server;
