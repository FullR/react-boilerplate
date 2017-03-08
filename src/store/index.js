import { createStore, combineReducers, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import createLogger from 'redux-logger';
import reducers from './reducers';

export default createStore(combineReducers(reducers), applyMiddleware(
  promiseMiddleware,
  createLogger({collapsed: true}),
));
