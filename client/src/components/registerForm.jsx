import React from "react";
import Joi from "joi-browser";
import Form from "./commons/form";
import * as userService from "../services/userService";
import auth from "../services/authService";
import "../styles/form.css";

class RegisterForm extends Form {
  state = {
    data: {
      email: "",
      password: "",
      passwordConfirmation: ""
    },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .email()
      .required()
      .label("Email"),
    password: Joi.string()
      .min(5)
      .required()
      .label("Password"),
    passwordConfirmation: Joi.string()
      .min(5)
      .required()
      .label("Confirm your password")
  };

  doSubmit = async () => {
    try {
      // Call the server
      const res = await userService.register(this.state.data);
      auth.loginWithJwt(res.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div className="registerForm form">
        <h1 className="formName">Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput(
            "passwordConfirmation",
            "Confirm your password",
            "password"
          )}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
