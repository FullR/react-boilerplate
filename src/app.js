import "babel-polyfill";
import "index.html";
import "base.css";
import injectTapEventPlugin from "react-tap-event-plugin";
import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "mobx-react";
import ready from "util/ready";
import socket from "socket";
import Application from "components/Application";
import store from "store";

require("./base.css");

function entry() {
  ReactDOM.render((
    <Provider {...store}>
      <Application/>
    </Provider>
  ), document.querySelector("#app"));

  socket.on("log", log);
}

injectTapEventPlugin();
ready.then(entry);
