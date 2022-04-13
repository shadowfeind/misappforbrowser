import { makeStyles } from "@material-ui/core";
import React from "react";
import { API_URL } from "../../constants";

const useStyles = makeStyles({
  profileContainer: {
    padding: "26px",
    color: "#fff",
    "& h2": {
      color: "#fff",
      margin: "10px 0",
    },
    "& p": {
      margin: "5px 0",
    },
  },
});

const NavProfileContainer = ({ header }) => {
  const classes = useStyles();
  return (
    <div className={classes.profileContainer}>
      {header && (
        <>
          <img
            src={`${API_URL}${header.FullPath}`}
            width="60px"
            height="60px"
            style={{ borderRadius: "50%" }}
          />

          <h2>{header.FullName}</h2>
          <p>mis@gmail.com</p>
        </>
      )}
    </div>
  );
};

export default NavProfileContainer;
