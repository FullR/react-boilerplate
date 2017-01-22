import {React, Component} from "component";
import style from "./style.css";

export default class LobbyPage extends Component {
  render() {
    const {children} = this.props;

    return (
      <div className={style.root}>
        {children}
      </div>
    );
  }
}
