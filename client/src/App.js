import React, { useState, useEffect } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import Home from "./pages/Home";
import PrivateRoute from "./PrivateRoute";

import "./App.css";
import ForgotPasswordForm from "./pages/ForgotPasswordForm";
import ResetPasswordEmailSent from "./pages/ResetPasswordEmailSent";
import ResetPasswordForm from "./pages/ResetPasswordForm";
import ResetPasswordConfirmed from "./pages/ResetPasswordConfirmed";
import WelcomeSignedUp from "./pages/WelcomeSignedUp";

function App() {
  const [isAuthed, setIsAuthed] = useState(false);
  useEffect(() => {
    localStorage.getItem("authorized") ? setIsAuthed(true) : setIsAuthed(false);
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route
          path='/signup'
          render={props => {
            return (
              <SignupPage
                {...props}
                isAuthed={isAuthed}
                setIsAuthed={setIsAuthed}
              />
            );
          }}
        />
        <Route
          path='/login'
          render={props => {
            return (
              <LoginPage
                {...props}
                isAuthed={isAuthed}
                setIsAuthed={setIsAuthed}
              />
            );
          }}
        />
        <Route path='/welcome' component={WelcomeSignedUp} />
        <Route path='/forgot-password' component={ForgotPasswordForm} />
        <Route path='/reset-password-email-sent' component={ResetPasswordEmailSent} />
        <Route path='/reset-password' component={ResetPasswordForm} />
        <Route path='/reset-password-confirmed' component={ResetPasswordConfirmed} />
        <PrivateRoute path='/home' isAuthed={isAuthed} component={Home} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
