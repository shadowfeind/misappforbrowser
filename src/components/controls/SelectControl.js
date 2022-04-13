import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  makeStyles,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  select: {
    fontSize: "16px",
    "& div": {
      padding: "16px",
    },
  },
}));

const SelectControl = ({
  name,
  errors = null,
  label,
  value,
  onChange,
  options,
}) => {
  const classes = useStyles();
  return (
    <FormControl
      style={{ minWidth: "100%" }}
      variant="outlined"
      {...(errors && { error: true })}
    >
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        className={classes.select}
      >
        {options?.map((item) => (
          <MenuItem value={item.Key} key={item.Key}>
            {item.Value}
          </MenuItem>
        ))}
      </Select>
      {errors && <FormHelperText>{errors}</FormHelperText>}
    </FormControl>
  );
};

export default SelectControl;
