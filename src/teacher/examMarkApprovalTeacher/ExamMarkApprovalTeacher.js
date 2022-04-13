import React, { Suspense, lazy } from "react";

const ExamMarkApproval = lazy(() =>
  import("../examMarkApprovalTeacher/examMarkApproval/ExamMarkApproval")
);

const ExamMarkApprovalTeacher = () => {
  return (
    <div>
      <Suspense fallback={<div></div>}>
        <ExamMarkApproval />
      </Suspense>
    </div>
  );
};

export default ExamMarkApprovalTeacher;
