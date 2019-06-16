const bcrypt = require("bcrypt");
const moment = require("moment");
const auth = require("../middleware/auth");
const { User, validate } = require("../models/user");
const express = require("express");
const router = express.Router();

// GET ME
router.get("/me", [auth], async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

// POST TO REGISTER
router.post("/", async (req, res) => {
  // Check if body is valid
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if user is already registered
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered");

  // Create new User and hash his password
  user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    registerDate: moment().toJSON()
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  // Create JWT
  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(user, ["id", "firstname", "lastname", "email"]));
});

module.exports = router;
