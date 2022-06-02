import React from "react";
import { Button, Collapse, makeStyles } from "@material-ui/core";
import StudentAttendanceListDesign from "./StudentAttendanceListDesign";

const useStyles = makeStyles((theme) => ({
  collapse: {
    padding: "16px 16px 16px 24px",
    borderBottom: "1px solid #d3d3d3",
    "& span": {
      fontWeight: "bolder",
    },
    "& p": {
      margin: "0",
      paddingBottom: "4px",
      fontSize: "12px",
    },
  },
  button: {
    marginRight: "10px",
    padding: "5px 16px",
    minWidth: "10px",
    fontSize: "10px",
    marginBottom: "10px",
  },
  listWrapper: {
    display: "flex",
    alignItems: "center",
  },
}));

const StudentMonthlyPresentSheetListCollapse = ({ attendance }) => {
  const classes = useStyles();
  const attendanceObjectFromArray = attendance && attendance.dbModelLst[0];

  const arrayFromKeys =
    attendance.dbModelLst.length > 0 &&
    Object.keys(attendanceObjectFromArray).filter((x) => x[0] === "C");

  const addDays = (originalDate, days) => {
    let cloneDate = new Date(originalDate.valueOf());
    cloneDate.setDate(cloneDate.getDate() + days);
    return cloneDate;
  };

  return (
    <div
      style={{
        padding: "6px 6px 0 6px",
      }}
    >
      <div style={{ backgroundColor: "#fff" }}>
        {arrayFromKeys.length > 0 &&
          arrayFromKeys.map((s, i) => {
            let newDate =
              attendance && new Date(attendance.searchFilterModel.fromDate);
            let newDateWithDayAdded = addDays(newDate, i);
            let date = newDateWithDayAdded.getDate();
            let dayFromDate = newDateWithDayAdded.toString().split(" ")[0];

            return (
              <StudentAttendanceListDesign
                attendance={
                  attendance.dbModelLst.length > 0 && attendance.dbModelLst[0]
                }
                s={s}
                key={s}
                date={date}
                dayFromDate={dayFromDate}
              />
            );
          })}
      </div>
    </div>
  );
};

export default StudentMonthlyPresentSheetListCollapse;
