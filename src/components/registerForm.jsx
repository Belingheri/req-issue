import React from "react";
import Joi from "joi-browser";

import Form from "./common/form";

import { register } from "./../services/userService";

import { toast } from "react-toastify";
import { loginWithJwt } from "../services/authService";
import { NavLink } from "react-router-dom";

class RegisterForm extends Form {
  state = {
    data: {
      username: "",
      name: "",
      password: "",
    },
    errors: {},
  };

  doSubmit = async () => {
    try {
      const { headers } = await register(this.state.data);
      loginWithJwt(headers["x-auth-token"]);
      window.location = "/";
    } catch (err) {
      if (err.response && err.response.status === 400)
        toast.error(err.response.data);
    }
  };

  schema = {
    username: Joi.string().email().required().label("Username"),
    name: Joi.string()
      .min(5)
      .max(20)
      .required()
      .regex(/^[A-Z,a-z]{5,20}$/)
      .label("Nome"),
    password: Joi.string().min(5).max(20).required().label("Password"),
  };
  render() {
    return (
      <div>
        <h1>Registra</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Nome")}
          {this.renderButton("Registra")}
        </form>
        <NavLink to="/login">Sei gia registrato ?</NavLink>
      </div>
    );
  }
}

export default RegisterForm;
