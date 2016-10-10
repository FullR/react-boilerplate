import "babel-polyfill";
import "index.html";
import "base.css";
import injectTapEventPlugin from "react-tap-event-plugin";
import ReactDOM from "react-dom";
import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Router from "router";
import ready from "util/ready";
require("./base.css");

function entry() {
  ReactDOM.render(
    <MuiThemeProvider>
      <Router/>
    </MuiThemeProvider>,
    document.querySelector("#app")
  );
}

injectTapEventPlugin();
ready.then(entry);
