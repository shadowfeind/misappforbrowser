import React from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  input: {
    "& input": {
      fontSize: "12px",
      // padding: "12px",
    },
    "& label": {
      fontSize: "12px",
      // padding: "12px",
    },
  },
}));

const DatePickerControl = ({ name, label, value, onChange, errors = null }) => {
  const converToDefaultEventPara = (name, value) => ({
    target: {
      name,
      value,
    },
  });
  const classes = useStyles();
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="dd-MM-yyyy"
        inputVariant="outlined"
        label={label}
        name={name}
        value={value}
        className={classes.input}
        onChange={(date) => {
          onChange(converToDefaultEventPara(name, date));
        }}
        {...(errors && { error: true, helperText: errors })}
        style={{ width: "80%", fontSize: "12px" }}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePickerControl;
