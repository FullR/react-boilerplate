import {React, Component} from "component";
import {connect} from "react-redux";
import {count} from "store/actions";
import style from "./style.css";

@connect(
  ({count}) => ({count}),
  (dispatch) => ({
    onIncrement: count.increment.dispatcher(dispatch),
    onDecrement: count.decrement.dispatcher(dispatch)
  })
)
export default class Counter extends Component {
  render() {
    const {count, onIncrement, onDecrement} = this.props;

    return (
      <div className={style.root}>
        <button onClick={onIncrement}>+</button>
        <div>{count}</div>
        <button onClick={onDecrement}>-</button>
      </div>
    );
  }
}
