import {createStore} from "redux";
import {combineReducers} from "redux";
import {reducers} from "./reducerParser";

export default createStore(combineReducers(reducers));
