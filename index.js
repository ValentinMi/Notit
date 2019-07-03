const config = require("config");
const express = require("express");
const app = express();
const cron = require("node-cron");
const User = require("./models/user");

require("./startup/cors")(app);
require("./startup/routes")(app);
require("./startup/db")();

const port = process.env.PORT || config.get("port");
const server = app.listen(port, () =>
  console.log(`Notit app listening on port ${port}!`)
);

module.exports = server;
