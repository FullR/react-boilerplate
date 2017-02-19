import {React, Component} from "component";
import classNames from "classnames";
import style from "./style.css";

export default class Field extends Component {
  render() {
    const {tags, query, className, children} = this.props;

    return (
      <div {...this.props} className={classNames(className, style.root)}>
        {query && tags && !tags.includes(query) ? null : children}
      </div>
    );
  }
}
