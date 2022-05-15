import React from "react";
import { NavLink } from "react-router-dom";
import { makeStyles, Typography } from "@material-ui/core";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import VideocamIcon from "@material-ui/icons/Videocam";
import ReportProblemIcon from "@material-ui/icons/ReportProblem";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import AnnouncementRoundedIcon from '@material-ui/icons/AnnouncementRounded';
import DescriptionIcon from "@material-ui/icons/Description";
import SystemUpdateAltIcon from "@material-ui/icons/SystemUpdateAlt";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import BookIcon from "@material-ui/icons/Book";
import DvrRoundedIcon from "@material-ui/icons/DvrRounded";
import DashboardIcon from "@material-ui/icons/Dashboard";
import HowToRegRoundedIcon from "@material-ui/icons/HowToRegRounded";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import { ChromeReaderMode, PeopleOutline } from "@material-ui/icons";

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

const NavigationSideMenu = () => {
  const classes = useStyles();
  const isActive = {
    color: "#253053",
    backgroundColor: "#eaeff5",
    textDecoration: "none",
  };
  return (
    <div className={classes.root}>
      <NavLink
        to={"/student-dashboard"}
        exact={true}
        activeStyle={isActive}
        className={classes.textBox}
      >
        <Typography variant="h6">
          {" "}
          <DashboardIcon fontSize="medium" />
          DashBoard
        </Typography>
      </NavLink>
      <NavLink
        to={"/student-pid"}
        activeStyle={isActive}
        className={classes.textBox}
      >
        <Typography variant="h6">
          <ChromeReaderMode fontSize="medium" />
          Profile
        </Typography>
      </NavLink>
      {/* <NavLink
        to={"/academic-grading"}
        activeStyle={isActive}
        className={classes.textBox}
      >
        <Typography variant="h6">
          <School fontSize="medium" />
          Grading
        </Typography>
      </NavLink>
      <NavLink
        to={"/exam-division"}
        activeStyle={isActive}
        className={classes.textBox}
      >
        <Typography variant="h6">
          <Accessible fontSize="medium" />
          Exam Division
        </Typography>
      </NavLink> */}

      <NavLink
        to={"/student-class-schedule"}
        activeStyle={isActive}
        className={classes.textBox}
      >
        <Typography variant="h6">
          <PeopleOutline fontSize="medium" />
          Class Schedule
        </Typography>
      </NavLink>
      <NavLink
        to={"/student-leaverequest"}
        activeStyle={isActive}
        className={classes.textBox}
      >
        <Typography variant="h6">
          <ReportProblemIcon fontSize="medium" />
          Leave Requests
        </Typography>
      </NavLink>
      {/* <NavLink
        to={"/quick-links"}
        activeStyle={isActive}
        className={classes.textBox}
      >
        <Typography variant="h6">
          {" "}
          <Face fontSize="medium" />
          Quick Links
        </Typography>
      </NavLink> */}
      <NavLink
        to={"/student-resources"}
        activeStyle={isActive}
        className={classes.textBox}
      >
        <Typography variant="h6">
          <BookIcon fontSize="medium" />
          E-Material
        </Typography>
      </NavLink>
      <NavLink
        to={"/student-assignment-front"}
        activeStyle={isActive}
        className={classes.textBox}
      >
        <Typography variant="h6">
          <AssignmentTurnedInIcon fontSize="medium" />
          Assignment
        </Typography>
      </NavLink>
      <NavLink
        to={"/student-syllabus"}
        activeStyle={isActive}
        className={classes.textBox}
      >
        <Typography variant="h6">
          <DescriptionIcon fontSize="medium" />
          Syllabus
        </Typography>
      </NavLink>
      <NavLink
        to={"/student-old-questions"}
        activeStyle={isActive}
        className={classes.textBox}
      >
        <Typography variant="h6">
          {" "}
          <MenuBookIcon fontSize="medium" />
          Old Questions
        </Typography>
      </NavLink>

      <NavLink
        to={"/student-announcement"}
        activeStyle={isActive}
        className={classes.textBox}
      >
        <Typography variant="h6">
          {" "}
          <AnnouncementRoundedIcon fontSize="medium" />
          Announcement
        </Typography>
      </NavLink>

      <NavLink
        to={"/student-attendance"}
        activeStyle={isActive}
        className={classes.textBox}
      >
        <Typography variant="h6">
          <HowToRegRoundedIcon fontSize="medium" />
          Attendance
        </Typography>
      </NavLink>
    </div>
  );
};

export default NavigationSideMenu;
