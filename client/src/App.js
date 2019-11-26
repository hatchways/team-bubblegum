import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";

import "./App.css";

import Home from './pages/Home';

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route path="/home" component={Home} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
