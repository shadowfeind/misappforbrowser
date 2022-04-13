import React from "react";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import { makeStyles } from "@material-ui/core";
import TodayIcon from "@material-ui/icons/Today";

const useStyles = makeStyles((theme) => ({
  subjectList: {
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

const StudentAttendanceListDesign = ({ attendance, s, date, dayFromDate }) => {
  const classes = useStyles();
  return (
    <div className={classes.subjectList}>
      <p>
        <TodayIcon />
        <span style={{ paddingLeft: "12px" }}>{dayFromDate}</span>{" "}
        <span style={{ paddingLeft: "12px" }}>{date}</span>{" "}
      </p>
      <p>
        {attendance[s] != null && attendance[s] === "A" ? (
          <span style={{ color: "red" }}>Absent</span>
        ) : attendance[s] === "P" ? (
          <span style={{ color: "green" }}>Present</span>
        ) : (
          ""
        )}
      </p>
    </div>
  );
};

export default StudentAttendanceListDesign;
