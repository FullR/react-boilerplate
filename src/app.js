import "babel-polyfill";
import "index.html";
import "base.css";
import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import ready from 'util/ready';
import Application from 'components/Application';
import { createCharacter } from './store/actions/characters';
import store from './store';

// create test character
store.dispatch(createCharacter());

function entry() {
  ReactDOM.render(<Provider store={store}><Application/></Provider>, document.querySelector("#app"));
}

injectTapEventPlugin();
ready.then(entry);
