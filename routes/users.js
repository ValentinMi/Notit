const _ = require("lodash");
const bcrypt = require("bcrypt");
const moment = require("moment");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
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
    email: req.body.email,
    password: req.body.password,
    registerDate: moment().toJSON(),
    thisDayNoted: false
  });

  // Config salt
  const salt = await bcrypt.genSalt(10);

  // Hash passwords
  user.password = await bcrypt.hash(user.password, salt);

  const passwordConfirmation = await bcrypt.hash(
    req.body.passwordConfirmation,
    salt
  );

  // Compare them
  if (user.password !== passwordConfirmation) {
    return res
      .status(400)
      .send("Password confirmation and Password must match");
  }

  await user.save();

  // Create JWT
  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(user, ["id", "firstname", "lastname", "email"]));
});

// UPDATE NOTE BOOLEAN
router.put("/daynoted", [auth], async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).send("User not found");

  user.thisDayNoted = true;

  await user.save();

  res.send(user);
});

// RESET ALL NOTE BOOLEAN
router.put("/resetdaynoted", [auth], [admin], async (req, res) => {
  const users = await User.find();

  users.forEach(async user => {
    user.thisDayNoted = false;
    await user.save();
  });

  res.send(users);
});

module.exports = router;
