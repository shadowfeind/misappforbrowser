import React from "react";

const MobileBody = ({ children }) => {
  return (
    <div
      style={{
        marginBottom: "62px",
        minHeight: "80vh",
        maxHeight: "100%",
        backgroundColor: "#f3f3f3",
      }}
    >
      {children}
    </div>
  );
};

export default MobileBody;
