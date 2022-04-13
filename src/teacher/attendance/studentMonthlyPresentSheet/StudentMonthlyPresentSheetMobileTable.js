import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import CustomContainer from "../../../components/CustomContainer";
import LoadingComp from "../../../components/LoadingComp";
import StudentMonthlyPresentSheetTableCollapse from "./StudentMonthlyPresentSheetTableCollapse";

const StudentMonthlyPresentSheetMobileTable = () => {
  const history = useHistory();
  const { getListStudentPresent,loading, error: getListStudentPresentError } =
    useSelector((state) => state.getListStudentPresent);

  return (
    <div style={{ padding: "16px" }}>
    {loading ? (
          <LoadingComp />
        ) : (
          <>
      <h3 onClick={() => history.push("/attendance")}>Go Back</h3>
      {getListStudentPresent ? (
        <StudentMonthlyPresentSheetTableCollapse
          students={getListStudentPresent && getListStudentPresent}
        />
      ) : (
        "No data"
      )}
      </>
        )}
    </div>
  );
};

export default StudentMonthlyPresentSheetMobileTable;
