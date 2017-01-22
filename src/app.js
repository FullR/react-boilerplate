import "babel-polyfill";
import "index.html";
import "base.css";
import injectTapEventPlugin from "react-tap-event-plugin";
import React from "react";
import ReactDOM from "react-dom";
import ready from "util/ready";
import socket from "socket";
import Application from "components/Application";

require("./base.css");

function entry() {
  ReactDOM.render(<Application/>, document.querySelector("#app"));

  socket.on("log", log);
}

injectTapEventPlugin();
ready.then(entry);
