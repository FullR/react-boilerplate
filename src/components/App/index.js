import React, {PropTypes} from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import style from "./style.css";

export default function App(props) {
  const {children, className} = props;

  return (
    <MuiThemeProvider>
      <div {...props} className={style.root}>
        This is my app
      </div>
    </MuiThemeProvider>
  );
}
