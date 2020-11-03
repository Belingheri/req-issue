import React from "react";
import Joi from "joi-browser";
import { NavLink, Redirect } from "react-router-dom";
import { toast } from "react-toastify";

import { getcurrentUser, login } from "./../services/authService";

import Form from "./common/form";
import { decodeError } from "./../util/decode";

class LoginForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
    },
    errors: "",
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await login(data.username, data.password);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (e) {
      if (e.response && e.response.data)
        toast.error(decodeError(e.response.data));
    }
  };

  schema = {
    username: Joi.string().email().required().label("Email"),
    password: Joi.string().min(5).max(20).required().label("Password"),
  };
  render() {
    if (getcurrentUser()) return <Redirect to="/" />;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
        <NavLink to="/registra">Non sei registrato?</NavLink>
      </div>
    );
  }
}

export default LoginForm;
