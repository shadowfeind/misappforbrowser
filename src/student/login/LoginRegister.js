import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  LoginFront: {
    "& h1": {
      fontSize: "32px",
      margin: "0",
      padding: "20px",
      color: "#253053",
      textAlign: "center",
    },
    "& label": {
      display: "block",
      paddingBottom: "8px",
    },
    "& input": {
      display: "block",
      padding: "14px 10px",
      marginBottom: "12px",
      border: "none",
      backgroundColor: "#d3d3d3",
      borderRadius: "10px",
      width: "100%",
    },
    "& span": {
      display: "block",
      textDecoration: "underline",
      color: "#253053",
      textAlign: "center",
      marginTop: "16px",
    },
    "& button": {
      padding: "12px 20px",
      backgroundColor: "#253053",
      color: "#fff",
      borderRadius: "8px",
      marginTop: "12px",
      border: "none",
      width: "100%",
    },
  },
}));

const LoginRegister = ({ setReg }) => {
  const classes = useStyles();
  return (
    <div className={classes.LoginFront}>
      <h1>School MIS</h1>
      <label>username:</label>
      <input type="text" placeholder="username" />
      <button>Reset Password</button>
      <span onClick={() => setReg(false)}>Go back</span>
    </div>
  );
};

export default LoginRegister;
