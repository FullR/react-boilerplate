import { React, Component } from 'component';
import classNames from 'classnames';
import style from './style.css';

export default class Field extends Component {
  render() {
    const {tags, query, className, children, ...rest} = this.props;

    return (
      <div {...rest} className={classNames(className, style.root)}>
        {query && tags && !tags.includes(query) ? null : children}
      </div>
    );
  }
}
