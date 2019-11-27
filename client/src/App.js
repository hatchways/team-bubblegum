import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import Dashboard from "./pages/Dashboard";
// import ButtonAppBar from "./pages/ButtonAppBar";
import SideBar from "./pages/SideBar";
import CreateReceipt from "./pages/CreateReceipt";

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route path="/signup" component={SignupPage} />
        <Route path="/login" component={LoginPage} />
        {/* <ButtonAppBar /> */}
        {/* <SideBar /> */}
        <Route exact path="/" component={Dashboard} />
        <Route path="/receipt" component={CreateReceipt} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
