import {React, Component} from "component";
import {connect} from "react-redux";
import TodoList from "components/TodoList";
import Counter from "components/Counter";
import style from "./style.css";

export default class Application extends Component {
  render() {
    return (
      <div className={style.root}>
        <TodoList/>
        <Counter/>
      </div>
    );
  }
}
