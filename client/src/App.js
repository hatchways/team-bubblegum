import React, { useState } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
// import ButtonAppBar from "./pages/ButtonAppBar";
import SideBar from "./pages/SideBar";
import CreateReceipt from "./pages/CreateReceipt";
import { UserContext } from "./context/UserContext";

import "./App.css";
import PrivateRoute from "./PrivateRoute";

function App() {
  const [user, setUser] = useState(null);
  return (
    <MuiThemeProvider theme={theme}>
      <UserContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <Route path='/signup' component={SignupPage} />
          <Route path='/login' component={LoginPage} />
          {/* <ButtonAppBar /> */}
          {/* <SideBar /> */}
          <Route exact path='/' component={Dashboard} />
          <Route path='/receipt' component={CreateReceipt} />
          <PrivateRoute path='/home/' component={Home} />
        </BrowserRouter>
      </UserContext.Provider>
    </MuiThemeProvider>
  );
}

export default App;
