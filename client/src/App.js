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

function App() {
  const [isAuthed, setIsAuthed] = useState(false);
  useEffect(() => {
    localStorage.getItem('authorized') ? setIsAuthed(true) : setIsAuthed(false);
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route path='/signup' component={SignupPage} />
        <Route 
          path='/login'
          render={props => {
            return (
              <LoginPage {...props} isAuthed={isAuthed} setIsAuthed={setIsAuthed} />
            )
          }}
        />
        <PrivateRoute path='/home' isAuthed={isAuthed} component={Home} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
