import React, { useEffect, useState } from "react";
import { CircularProgress, makeStyles } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { login } from "./LoginActions";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Notification from "../../components/Notification";

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
  errors: {
    fontSize: "10px",
    color: "red",
  },
}));

const LoginFront = ({ setReg }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const { loading, error, userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (error) {
      setNotify({
        isOpen: true,
        message: error,
        type: "error",
      });
    }
  }, [error]);

  const dispatch = useDispatch();

  const history = useHistory();

  const validate = () => {
    let temp = {};
    temp.userName = !userName
      ? "This feild is required"
      : !userName.trim()
      ? "This feild is required"
      : "";

    temp.password = !password
      ? "This feild is required"
      : !password.trim()
      ? "This feild is required"
      : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const handleLogin = () => {
    if (validate()) {
      dispatch(login(userName, password));
    }
  };

  useEffect(() => {
    if (userInfo) {
      if (userInfo.IDHRRole === 8) {
        history.push("/student-dashboard");
      }
      if (userInfo.IDHRRole === 5) {
        history.push("/teacher-dashboard");
      }
    }
  }, [userInfo]);

  const classes = useStyles();
  return (
    <>
      <div className={classes.LoginFront}>
        <h1>School MIS</h1>
        <label>username:</label>
        <input
          type="text"
          placeholder="username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        {errors.userName && (
          <p className={classes.errors}>username is required</p>
        )}
        <label>password:</label>
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && (
          <p className={classes.errors}>password is required</p>
        )}
        {loading ? (
          <div style={{ textAlign: "center" }}>
            {" "}
            <CircularProgress />
          </div>
        ) : (
          <button onClick={handleLogin}>Sign In</button>
        )}
        <span onClick={() => setReg(true)}>forgot password</span>
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default LoginFront;
