import {snakeCase, last} from "lodash";

const requireReducer = require.context("./reducers", false, /\.js$/);
const actions = requireReducer.keys().map((filename) => {
  const name = last(filename.replace(/\.js$/, "").split("/"));
  let actionDefinition = requireReducer(filename).default;
  if(!Array.isArray(actionDefinition)) {
    actionDefinition = [actionDefinition];
  }
  const {actions, reduce} = action(name, ...actionDefinition);
  return {name, reduce, actions};
});

export const reducers = actions.reduce((map, action) => {
  map[action.name] = action.reduce;
  return map;
}, {});

export const createActionMap = actions.reduce((map, action) => {
  map[action.name] = action.actions;
  return map;
}, {});

function action(name, initialState, actionMap) {
  Object.entries(actionMap).forEach(([actionName, action]) => {
    action.type = snakeCase(`${name}-${actionName}`).toUpperCase();
    action.create = supplyActionType(action.type, action.create || defaultCreateFn);
  });

  const actions = Object.entries(actionMap).reduce((createMap, [actionName, actionObj]) => {
    createMap[actionName] = actionObj.create;
    return createMap;
  }, {});

  const typeReduceMap = Object.values(actionMap).reduce((map, actionObj) => {
    map[actionObj.type] = actionObj.reduce;
    return map;
  }, {});

  function reduce(state=initialState, action) {
    const reduceFn = typeReduceMap[action.type];
    if(reduceFn) {
      return reduceFn(state, action);
    }
    return state;
  }

  return {actions, reduce};
}

function defaultCreateFn() {
  return {};
}

function supplyActionType(type, createFn) {
  function create() {
    const action = createFn.apply(null, arguments) || {};
    action.type = type;
    return action;
  };
  create.dispatcher = function createDispatcher(dispatch) {
    return function createAndDispatch() {
      dispatch(create.apply(null, arguments));
    };
  }
  return create;
}
