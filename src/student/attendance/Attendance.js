import React, { Suspense, lazy } from "react";

const StudentMonthlyPresentSheet = lazy(() =>
  import("./studentMonthlyPresentSheet/StudentMonthlyPresentSheet")
);

const Attendance = () => {
  return (
    <Suspense fallback={<div></div>}>
      <StudentMonthlyPresentSheet />
    </Suspense>
  );
};

export default Attendance;
