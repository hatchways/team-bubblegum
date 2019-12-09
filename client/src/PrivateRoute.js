import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "./context/UserContext";

const PrivateRoute = ({ component: Component, isAuthed, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthed === true ? <Component {...props} /> : <Redirect to='/login' />
      }
    />
  );
};
export default PrivateRoute;
