import {camelCase} from "lodash";

export default function actionRouter(initialState, actions) {
  function actionRouterFn(state=initialState, action) {
    if(action.type in actions) {
      return actions[action.type].reduce(state, action);
    }
    return state;
  }

  actionRouterFn.actions = Object.entries(actions).reduce((actions, [name, {create}]) => {
    actions[camelCase(name)] = create;
    return actions;
  }, []);

  return actionRouterFn;
}
