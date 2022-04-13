import React from "react";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import { makeStyles } from "@material-ui/core";

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

const DashboardSubjectViewList = ({ list }) => {
  const classes = useStyles();
  return (
    <div className={classes.subjectList}>
      <p>
        <list.icon />
        <span style={{ paddingLeft: "12px" }}>{list.name}</span>{" "}
      </p>
      <ArrowRightAltIcon />
    </div>
  );
};

export default DashboardSubjectViewList;
