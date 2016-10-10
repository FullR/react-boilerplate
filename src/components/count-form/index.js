import React, {PropTypes} from "react";
import style from "./style.css";
import Button from "material-ui/RaisedButton";
import Screen from "components/screen";

export default function CountForm(props) {
  const {count, onIncrement, onDecrement} = props;

  return (
    <Screen className={style.root}>
      this is a bunch of text
      <Button onTouchTap={onDecrement} primary>-</Button>
        {count}
      <Button onTouchTap={onIncrement} primary>+</Button>
    </Screen>
  );
}

CountForm.propTypes = {};
CountForm.defaultProps = {};
