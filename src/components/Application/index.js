import {React, Component} from "component";
import style from "./style.css";
import TodoList from "components/TodoList";
import Counter from "components/Counter";

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
