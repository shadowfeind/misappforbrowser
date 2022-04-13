import React from "react";
import { NavLink } from "react-router-dom";
import { makeStyles, Typography } from "@material-ui/core";
import {
  School,
  Accessible,
  PeopleOutline,
  ChromeReaderMode,
  Face,
  Assessment,
  Settings,
  PostAdd,
  RecordVoiceOver,
} from "@material-ui/icons";

const useStyles = makeStyles({
  root: {
    "& h6": {
      fontSize: "14px",
      paddingLeft: "10px",
    },
    "& h6:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.3)",
      textDecoration: "none",
    },
    "& a:hover": { textDecoration: "none" },
    "& a": { textDecoration: "none" },
  },
  textBox: {
    padding: "10px 20px",
    color: "#fff",
    textAlign: "left",
    display: "block",
    width: "100%",
    "& svg": {
      fontSize: "16px",
      marginBottom: "-1%",
      marginRight: "10px",
    },
  },
});

const TeacherNavigationSideMenu = () => {
  const classes = useStyles();
  const isActive = {
    color: "#253053",
    backgroundColor: "#eaeff5",
    textDecoration: "none",
  };
  return (
    <div className={classes.root}>
      <NavLink
        to={"/teacher-dashboard"}
        exact={true}
        activeStyle={isActive}
        className={classes.textBox}
      >
        <Typography variant="h6">
          {" "}
          <ChromeReaderMode fontSize="small" />
          DashBoard
        </Typography>
      </NavLink>
      <NavLink
        to={"/academic-grading"}
        activeStyle={isActive}
        className={classes.textBox}
      >
        <Typography variant="h6">
          {" "}
          <School fontSize="small" />
          Academic Grading
        </Typography>
      </NavLink>
      <NavLink
        to={"/exam-division"}
        activeStyle={isActive}
        className={classes.textBox}
      >
        <Typography variant="h6">
          {" "}
          <Accessible fontSize="small" />
          Exam Division
        </Typography>
      </NavLink>
      {/* <NavLink to={"/exam-schedule"} activeStyle={isActive} className={classes.textBox}>
        <Typography variant="h6">
          {" "}
          <PeopleOutline fontSize="small" />
           Exam Schedule
        </Typography>
      </NavLink> */}

      <NavLink
        to={"/attendance"}
        activeStyle={isActive}
        className={classes.textBox}
      >
        <Typography variant="h6">
          <Assessment fontSize="small" />
          Attendance
        </Typography>
      </NavLink>
      <NavLink to={"/pid"} activeStyle={isActive} className={classes.textBox}>
        <Typography variant="h6">
          {" "}
          <Settings fontSize="small" />
          Pid
        </Typography>
      </NavLink>
      <NavLink
        to={"/quick-links"}
        activeStyle={isActive}
        className={classes.textBox}
      >
        <Typography variant="h6">
          {" "}
          <Face fontSize="small" />
          Quick Links
        </Typography>
      </NavLink>
      <NavLink
        to={"/resources"}
        activeStyle={isActive}
        className={classes.textBox}
      >
        <Typography variant="h6">
          <PostAdd fontSize="small" />
          Resources
        </Typography>
      </NavLink>
      <NavLink
        to={"/class-schedule"}
        activeStyle={isActive}
        className={classes.textBox}
      >
        <Typography variant="h6">
          {" "}
          <PeopleOutline fontSize="small" />
          Class Routine
        </Typography>
      </NavLink>
      <NavLink
        to={"/assignment"}
        activeStyle={isActive}
        className={classes.textBox}
      >
        <Typography variant="h6">
          <PostAdd fontSize="small" />
          Assignment
        </Typography>
      </NavLink>
      <NavLink
        to={"/exam-mark-approval"}
        activeStyle={isActive}
        className={classes.textBox}
      >
        <Typography variant="h6">
          {" "}
          <Accessible fontSize="small" />
          Mark Approval
        </Typography>
      </NavLink>
      <NavLink
        to={"/syllabus"}
        activeStyle={isActive}
        className={classes.textBox}
      >
        <Typography variant="h6">
          <RecordVoiceOver fontSize="small" />
          Syllabus
        </Typography>
      </NavLink>
      <NavLink
        to={"/old-questions"}
        activeStyle={isActive}
        className={classes.textBox}
      >
        <Typography variant="h6">
          {" "}
          <Accessible fontSize="small" />
          Old Questions
        </Typography>
      </NavLink>
      <NavLink
        to={"/video-conference"}
        activeStyle={isActive}
        className={classes.textBox}
      >
        <Typography variant="h6">
          {" "}
          <Accessible fontSize="small" />
          Video Conference
        </Typography>
      </NavLink>
    </div>
  );
};

export default TeacherNavigationSideMenu;
