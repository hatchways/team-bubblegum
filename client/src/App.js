import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route path="/signup" component={SignupPage} />
        <Route path="/login" component={LoginPage} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
