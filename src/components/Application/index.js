import {React, Component} from "component";
import Router from "components/Router";
import routes from "routes";
import style from "./style.css";

export default class Application extends Component {
  render() {
    return (
      <Router routes={routes}/>
    );
  }
}
