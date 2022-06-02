import { makeStyles, TextField } from "@material-ui/core";

import React from "react";

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

const InputControl = ({
  name,
  label,
  value,
  errors = null,
  onChange,
  ...other
}) => {
  const classes = useStyles();
  return (
    <TextField
      variant="outlined"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      className={classes.input}
      // style={{ fontSize: "12px" }}
      {...other}
      {...(errors && { error: true, helperText: errors })}
    />
  );
};

export default InputControl;
