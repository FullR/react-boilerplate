import { connect } from 'react-redux';
import { transform } from 'lodash';

export default function wrappedConnect(mapStateToProps, mapPropsToDispatch, ...rest) {
  if(typeof mapStateToProps === "string") mapStateToProps = [mapStateToProps];
  if(Array.isArray(mapStateToProps)) {
    const stateKeys = mapStateToProps;
    mapStateToProps = (state) => stateKeys.reduce((props, stateKey) => {
      props[stateKey] = state[stateKey];
      return props;
    }, {});
  } else if(typeof mapStateToProps === "object") {
    const stateKeyMap = mapStateToProps;
    mapStateToProps = (state) => transform(stateKeyMap, (props, propKey, stateKey) => {
      props[propKey] = state[stateKey];
      return props;
    });
  }

  if(typeof mapPropsToDispatch === "object") {
    const propActionMap = mapPropsToDispatch;
    mapPropsToDispatch = (dispatch) => transform(propActionMap, (props, action, propKey) => {
      props[propKey] = action.dispatcher(dispatch);
      return props;
    }, {});
  }

  return connect(mapStateToProps, mapPropsToDispatch, ...rest);
}
