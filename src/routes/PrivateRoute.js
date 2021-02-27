import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../context/users/userContext";

const PrivateRoute = ({ component: Component, ...props }) => {
  const userContext = useContext(UserContext);
  const { sesion, authenticatedUser } = userContext;

  useEffect(() => {
    authenticatedUser();
    // eslint-disable-next-line
  }, []);

  return (
    <Route
      {...props}
      render={(props) =>
        !sesion ? <Redirect to="/" /> : <Component {...props} />
        
      }
    />
  );
};

export default PrivateRoute;
