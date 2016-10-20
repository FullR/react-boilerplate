import {React, Component} from "component";
import style from "./style.css";

export default class Application extends Component {
  render() {
    return (
      <div className={style.root}>
        This is my app
      </div>
    );
  }
}
