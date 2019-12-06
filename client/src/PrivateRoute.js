import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "./context/UserContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { id } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={props =>
        id ? <Component {...props} /> : <Redirect to='/login' />
      }
    />
  );
};
export default PrivateRoute;
