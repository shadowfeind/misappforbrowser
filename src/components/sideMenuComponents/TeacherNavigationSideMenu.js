import React from "react";
import { NavLink } from "react-router-dom";
import { makeStyles, Typography } from "@material-ui/core";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import VideocamIcon from "@material-ui/icons/Videocam";
import ReportProblemIcon from "@material-ui/icons/ReportProblem";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import DescriptionIcon from "@material-ui/icons/Description";
import SystemUpdateAltIcon from "@material-ui/icons/SystemUpdateAlt";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import BookIcon from "@material-ui/icons/Book";
import DvrRoundedIcon from "@material-ui/icons/DvrRounded";
import DashboardIcon from "@material-ui/icons/Dashboard";
import HowToRegRoundedIcon from "@material-ui/icons/HowToRegRounded";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";

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
          <DashboardIcon fontSize="small" />
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
          <TrendingUpIcon fontSize="small" />
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
          <DvrRoundedIcon fontSize="small" />
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
        to={"/leaverequest-teacher"}
        activeStyle={isActive}
        className={classes.textBox}
      >
        <Typography variant="h6">
          {" "}
          <ReportProblemIcon fontSize="small" />
          Leave Request
        </Typography>
      </NavLink>
      <NavLink
        to={"/attendance"}
        activeStyle={isActive}
        className={classes.textBox}
      >
        <Typography variant="h6">
          <HowToRegRoundedIcon fontSize="small" />
          Attendance
        </Typography>
      </NavLink>
      {/* <NavLink to={"/pid"} activeStyle={isActive} className={classes.textBox}>
        <Typography variant="h6">
          {" "}
          <Settings fontSize="small" />
          Pid
        </Typography>
      </NavLink> */}
      {/* <NavLink
        to={"/quick-links"}
        activeStyle={isActive}
        className={classes.textBox}
      >
        <Typography variant="h6">
          {" "}
          <Face fontSize="small" />
          Quick Links
        </Typography>
      </NavLink> */}
      <NavLink
        to={"/resources"}
        activeStyle={isActive}
        className={classes.textBox}
      >
        <Typography variant="h6">
          <BookIcon fontSize="small" />
          E-Material
        </Typography>
      </NavLink>
      <NavLink
        to={"/class-schedule"}
        activeStyle={isActive}
        className={classes.textBox}
      >
        <Typography variant="h6">
          {" "}
          <CalendarTodayIcon fontSize="small" />
          Class Routine
        </Typography>
      </NavLink>
      <NavLink
        to={"/assignment"}
        activeStyle={isActive}
        className={classes.textBox}
      >
        <Typography variant="h6">
          <AssignmentTurnedInIcon fontSize="small" />
          Assignment/Homework
        </Typography>
      </NavLink>
      <NavLink
        to={"/exam-mark-approval"}
        activeStyle={isActive}
        className={classes.textBox}
      >
        <Typography variant="h6">
          {" "}
          <SystemUpdateAltIcon fontSize="small" />
          Marks Entry/Update
        </Typography>
      </NavLink>
      <NavLink
        to={"/syllabus"}
        activeStyle={isActive}
        className={classes.textBox}
      >
        <Typography variant="h6">
          <DescriptionIcon fontSize="small" />
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
          <MenuBookIcon fontSize="small" />
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
          <VideocamIcon fontSize="small" />
          Video Conference
        </Typography>
      </NavLink>
    </div>
  );
};

export default TeacherNavigationSideMenu;
