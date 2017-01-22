import {React, Component} from "component";
import {inject} from "mobx-react";
import routes from "./routes";

@inject("router")
export default class Router extends Component {
  render() {
    const {router} = this.props;
    return (
      <div>
        {router.route}
      </div>
    );
  }
}
