import React from "react";
import { Redirect, Route } from "react-router-dom";
import { getcurrentUser } from "../../services/authService";

function ProtectedRoutes({ component: Component, render, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!getcurrentUser())
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
}

export default ProtectedRoutes;
