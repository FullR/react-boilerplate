import "babel-polyfill";
import "index.html";
import ReactDOM from "react-dom";
import React from "react";
import Router from "router";

ReactDOM.render(<Router/>, document.querySelector("#app-container"));
