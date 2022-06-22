import React, { useEffect, useState } from "react";
import {
  AppBar,
  Badge,
  IconButton,
  makeStyles,
  Toolbar,
} from "@material-ui/core";

import { useSelector } from "react-redux";
import { API_URL } from "../constants";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import SideMenu from "./SideMenu";
import { useDispatch } from "react-redux";
import { getHeaderContentAction } from "../student/dashboard/DashboardActions";
import Drawer from "@material-ui/core/Drawer";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Notification from "./Notification";
import { UPLOADPHOTO_STUDENT_RESET } from "../student/pid/uploadPhoto/UploadPhotoConstants";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#253053",
    transform: "translate(0)",
    color: "#fff",
    "& h6": {
      fontSize: "13px",
      display: "inline-block",
      paddingRight: "1.5vw",
    },
  },
  list: {
    "& li": {
      display: "inline-block",
      listStyleType: "none",
      paddingRight: "10px",
      paddingLeft: "10px",
      marginTop: "-5px",
      fontSize: "12px",
    },
    "& a": {
      color: "#000",
      textDecoration: "none",
    },
    "& li:hover": {
      borderBottom: "1px solid #000",
    },
  },
  activeList: {
    borderBottom: "1px solid #000",
  },
  wrapIcon: {
    verticalAlign: "middle",
    display: "inline-flex",
  },
  popUp: {
    textAlign: "center",
    backgroundColor: "#fff",
    boxShadow: "5px 5px 5px #d3d3d3",

    "& h4": {
      borderBottom: "1px solid #d3d3d3",
      margin: "0",
      padding: "10px",
      fontWeight: "300",
      fontSize: "14px",
      cursor: "pointer",
    },
    "& h4:hover": {
      backgroundColor: "#f4f4f4",
    },
  },
});

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const { headerContent } = useSelector((state) => state.getHeaderContent);

  const { userInfo } = useSelector((state) => state.userLogin);

  const { success: uploadPhotoSuccess } = useSelector(
    (state) => state.uploadPhotoStudent
  );

  // if (uploadPhotoSuccess) {
  // dispatch({ type: UPLOADPHOTO_STUDENT_RESET });
  // dispatch(getHeaderContentAction());
  // }

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  window.addEventListener("online", () => {});

  window.addEventListener("offline", () => {
    setNotify({
      isOpen: true,
      message: "Please Connect To Internet",
      type: "error",
    });
  });

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    if (userInfo) {
      if (!headerContent) {
        dispatch(getHeaderContentAction());
      }
    }
  }, [headerContent, dispatch, userInfo]);
  return (
    // <div style={{ marginBottom: "55px" }}>
    <div>
      <AppBar position="static">
        <Toolbar className={classes.root}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setOpenDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor={"left"}
            open={openDrawer}
            PaperProps={{
              width: "90%",
            }}
            onClose={() => setOpenDrawer(false)}
            onClick={() => setOpenDrawer(false)}
          >
            {<SideMenu header={headerContent && headerContent} />}
          </Drawer>

          <Link
            to={userInfo && userInfo.IDHRRole == 8 ? "/student-pid" : "/pid"}
          >
            <IconButton onClick={handleClick("top-end")}>
              {headerContent && (
                <img
                  src={`${API_URL}${headerContent.FullPath}`}
                  width="30px"
                  height="30px"
                  style={{ borderRadius: "50%" }}
                />
              )}
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
};

export default Header;
