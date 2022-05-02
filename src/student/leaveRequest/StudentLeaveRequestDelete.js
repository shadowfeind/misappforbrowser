import { Button } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { studentDeleteLeaveRequestAction } from "./StudentLeaveRequestActions";

const StudentLeaveRequestDelete = ({ leaveRequestDelete, setOpenPopUp }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(studentDeleteLeaveRequestAction(leaveRequestDelete));
  };

  return leaveRequestDelete ? (
    <div>
      <p>
        <span>Date</span> : {leaveRequestDelete.FromDate?.slice(0, 10)} /{" "}
        {leaveRequestDelete.ToDate?.slice(0, 10)}
      </p>
      <p>
        <span>Status</span> : {leaveRequestDelete.Status}
      </p>
      <p>
        <span>Description</span> : {leaveRequestDelete.LeaveDecription}
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          paddingTop: "10px",
          marginTop: "10px",
          borderTop: "1px solid #f3f3f3",
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setOpenPopUp(false)}
          style={{ margin: "10px 0 0 10px" }}
        >
          CANCEL
        </Button>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ margin: "10px 0 0 10px" }}
          onClick={handleDelete}
        >
          DELETE
        </Button>
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default StudentLeaveRequestDelete;
