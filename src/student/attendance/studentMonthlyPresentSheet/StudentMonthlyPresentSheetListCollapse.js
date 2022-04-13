import React from "react";
import StudentAttendanceListDesign from "./StudentAttendanceListDesign";

const StudentMonthlyPresentSheetListCollapse = ({ attendance }) => {
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
    <>
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
    </>
  );
};

export default StudentMonthlyPresentSheetListCollapse;
