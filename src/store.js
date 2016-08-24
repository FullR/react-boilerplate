import {combineReducers, createStore} from "redux";
import reducers from "./reducers";
import {routerReducer} from "react-router-redux";

export default createStore(
  combineReducers(
    Object.assign({}, reducers, {
      routing: routerReducer
    })
  )
);
