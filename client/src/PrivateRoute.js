import React from "react";
import { Route, Redirect } from "react-router-dom";

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
