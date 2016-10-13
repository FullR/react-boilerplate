import "babel-polyfill";
import "index.html";
import "base.css";
import ReactDOM from "react-dom";
import React from "react";
import injectTapEventPlugin from "react-tap-event-plugin";
import ready from "util/ready";
import App from "components/App";

function entry() {
  ReactDOM.render(<App/>, document.querySelector("#app"));
}

injectTapEventPlugin();
ready.then(entry);
