import React from "react";
import { Snackbar, Typography, createTheme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const theme = createTheme();
const useStyles = makeStyles((theme) => ({
  alert: {
    color: "black",
    backgroundColor: "#4bb543",
    fontSize: "16px",
    borderRadius: "5px",
    padding: "10px",
    fontFamily: "Roboto Condensed",
  },
  error: {
    backgroundColor: "#FF9494",
    color: "black",
    fontSize: "16px",
    borderRadius: "5px",
    padding: "10px",
    fontFamily: "Roboto Condensed",
  },
}));

export default function CustomSnackBar(props) {
  const { open, close, message, error } = props;
  const classes = useStyles();
  return (
    <Snackbar open={open} autoHideDuration={2500} onClose={close}>
      <div className={error ? classes.error : classes.alert} onClose={close}>
        <Typography>{message}</Typography>
      </div>
    </Snackbar>
  );
}
