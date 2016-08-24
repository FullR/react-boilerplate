import "babel-polyfill";
import "index.html";
import ReactDOM from "react-dom";
import React from "react";
import {Provider} from "react-redux";
import store from "store";
import CountForm from "containers/count-form";
import request from "superagent";

request
  .get("/api/foo")
  .end((error, res) => {
    console.log(error || res);
  });

ReactDOM.render(
  <Provider store={store}>
    <CountForm/>
  </Provider>,
  document.querySelector("#app-container")
);
