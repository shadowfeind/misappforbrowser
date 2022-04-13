import React, { Suspense, lazy } from "react";

const Assignment = lazy(() => import("../assignment/assignment/Assignment"));

const AssignmentFront = () => {
  return (
    <Suspense fallback={<div></div>}>
      <Assignment />
    </Suspense>
  );
};

export default AssignmentFront;
