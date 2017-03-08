import eventToState from 'util/eventToState';

export default function stateContainer(Component) {
  return class StateContainer extends Component {
    _changeHandlers = new Map();
    handleChange(key, parsers) {
      const {_changeHandlers} = this;

      if(_changeHandlers.has(key)) {
        return _changeHandlers.get(key);
      } else {
        const changeHandler = eventToState(this, key, parsers);
        _changeHandlers.set(key, changeHandler);
        return changeHandler;
      }
    }

    handleStringChange(key) {
      return this.handleChange(key);
    }

    handleIntChange(key) {
      return this.handleChange(key, [(value) =>
        value ? parseInt(value) : 0
      ]);
    }
  }
}
