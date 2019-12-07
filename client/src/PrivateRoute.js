import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const checkToken = () => {
    let user;
    try {
      user = jwt_decode(localStorage.getItem("token"));
    } catch {
      user = null;
    }
    return user;
  };
  return (
    <Route
      {...rest}
      render={props =>
        checkToken() ? <Component {...props} /> : <Redirect to='/login' />
      }
    />
  );
};
export default PrivateRoute;
