import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import CreateReceipt from "./pages/CreateReceipt";

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route path="/" component={CreateReceipt} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
