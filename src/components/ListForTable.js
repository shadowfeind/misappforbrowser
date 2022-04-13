import { makeStyles } from "@material-ui/core";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  listStyle: {
    padding: "16px",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid #d3d3d3",
    justifyContent: "space-between",
    margin: "0",
    "& p": {
      margin: "0",
      "& svg": {
        marginBottom: "-6px",
      },
    },
    "& svg": {
      color: "#253053",
    },

    "& :hover": {
      backgroundColor: "#f3f3f3",
    },
  },
}));

const ListForTable = ({ children, onClick }) => {
  const classes = useStyles();
  return (
    <div className={classes.listStyle} onClick={onClick}>
      {children}
    </div>
  );
};

export default ListForTable;
