function getEventValue(event) {
  return event.target.value || '';
}

export default function eventToState(component, stateKey, parsers) {
  return (event) => {
    component.setState({
      [stateKey]: parsers ?
        parsers.reduce((value, fn) => fn(value), getEventValue(event)) :
        getEventValue(event)
    });
  };
}
