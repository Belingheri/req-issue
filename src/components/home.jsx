import React, { useContext, Fragment } from "react";

import UserContext from "./../context/userContext";
import { NavLink } from "react-router-dom";

function Home() {
  const user = useContext(UserContext);
  return (
    <Fragment>
      <h1>Benvenuto {user && user.name ? user.name : "straniero"} !</h1>
      <NavLink to="/login">Effettua il login</NavLink>
    </Fragment>
  );
}

export default Home;
