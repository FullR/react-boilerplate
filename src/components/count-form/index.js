import React, {PropTypes} from "react";
import cx from "./style.css";
import Button from "components/button";
import Screen from "components/screen";

export default function CountForm(props) {
  const {count, onIncrement, onDecrement, className} = props;
  const classNames = cx(className, "root");

  return (
    <Screen className={classNames}>
      <Button onClick={onDecrement}>-</Button>
        {count}
      <Button onClick={onIncrement}>+</Button>
    </Screen>
  );
}

CountForm.propTypes = {};
CountForm.defaultProps = {};
