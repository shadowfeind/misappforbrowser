import React, { Suspense, lazy } from "react";

const NewResourcesStudent = lazy(() =>
  import("../resources/newResourcesStudent/NewResourcesStudent")
);

const Resources = () => {
  return (
    <Suspense fallback={<div></div>}>
      <NewResourcesStudent />
    </Suspense>
  );
};

export default Resources;
