import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";

//import logo from "./logo.svg";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { getcurrentUser } from "./services/authService";
import UserContext from "./context/userContext";

import NotFound from "./components/common/notFound";
import NavBar from "./components/navbar";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import Home from "./components/home";

function App() {
  const [user] = useState(getcurrentUser());
  return (
    <UserContext.Provider value={user}>
      <ToastContainer />
      <NavBar />
      <main className="container">
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/logout" component={Logout} />
          <Route path="/registra" component={RegisterForm} />
          <Route path="/home" component={Home} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/home" />
          <Redirect to="not-found" />
        </Switch>
      </main>
    </UserContext.Provider>
  );
}

export default App;
