import { makeStyles } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../student/login/LoginActions";
import NavigationSideMenu from "./sideMenuComponents/NavigationSideMenu";
import NavProfileContainer from "./sideMenuComponents/NavProfileContainer";
import TeacherNavigationSideMenu from "./sideMenuComponents/TeacherNavigationSideMenu";

const useStyles = makeStyles((theme) => ({
  sideMenu: {
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    width: 280,
    height: "100%",
    backgroundColor: "#253053",
    "& h4": {
      margin: "30px auto 10px",
      padding: "6px 16px",
      backgroundColor: "#eaeff5",
      borderRadius: "10px",
      color: "#253053",
      textAlign: "center",
      width: "80%",
    },
  },
}));

const SideMenu = ({ header }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userLogin);

  return (
    <div className={classes.sideMenu}>
      <NavProfileContainer header={header} />
      {userInfo && userInfo.IDHRRole == 5 && <TeacherNavigationSideMenu />}
      {userInfo && userInfo.IDHRRole == 8 && <NavigationSideMenu />}

      <h4 onClick={() => dispatch(logout())}>Log out</h4>
    </div>
  );
};

export default SideMenu;
