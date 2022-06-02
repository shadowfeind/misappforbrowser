import { makeStyles, Paper } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    height: "100%",
  },
}));

const CustomContainer = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.pageContent}>{children}</div>;
};

export default CustomContainer;
