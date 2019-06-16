const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  lastname: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100
  },
  firstname: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      isAdmin: this.isAdmin
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = {
    lastname: Joi.string()
      .min(1)
      .max(50)
      .required(),
    firstname: Joi.string()
      .min(1)
      .max(50)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .email()
      .required(),
    password: Joi.string()
      .min(5)
      .max(1024)
      .required()
  };

  return Joi.validate(user, schema);
}

exports.userSchema = userSchema;
exports.User = User;
exports.validate = validateUser;
