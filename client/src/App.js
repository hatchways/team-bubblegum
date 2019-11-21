import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import Dashboard from "./pages/Dashboard";
import ButtonAppBar from "./pages/ButtonAppBar";
import SideBar from "./pages/SideBar";

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <ButtonAppBar />
        <SideBar />
        <Route path="/" component={Dashboard} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
