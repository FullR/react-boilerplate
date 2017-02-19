import "babel-polyfill";
import "index.html";
import "base.css";
import injectTapEventPlugin from "react-tap-event-plugin";
import React from "react";
import {Provider} from "react-redux";
import ReactDOM from "react-dom";
import ready from "util/ready";
import store from "store";
import {characters} from "store/actions";
import Application from "components/Application";

// create test character
store.dispatch(characters.create());

function entry() {
  ReactDOM.render(<Provider store={store}><Application/></Provider>, document.querySelector("#app"));
}

injectTapEventPlugin();
ready.then(entry);
