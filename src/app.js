import "babel-polyfill";
import "index.html";
import ReactDOM from "react-dom";
import React from "react";
import Router from "router";
import ready from "util/ready";

function entry() {
  ReactDOM.render(<Router/>, document.querySelector("#app-container"));
}

ready.then(entry);
