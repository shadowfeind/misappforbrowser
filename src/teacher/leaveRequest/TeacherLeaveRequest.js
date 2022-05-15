import { Chip } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import TeacherLeaveRequestInbox from "./inbox/TeacherLeaveRequestInbox";
import TeacherLeaveRequestSent from "./sent/TeacherLeaveRequestSent";
import TeacherLeaveRequestForm from "./TeacherLeaveRequestForm";
import Notification from "../../components/Notification";
import { useDispatch } from "react-redux";
import { getListLeaveRequestAction } from "./TeacherLeaveRequestActions";
import { GET_SINGLE_TO_EDIT_LEAVE_REQUESTS_RESET } from "./TeacherLeaveRequestConstants";

const TeacherLeaveRequest = () => {
  const [currentPage, setCurretPage] = useState("inbox");
  const page = [
    { id: 1, value: "Leave Approve", page: "inbox" },
    { id: 2, value: "Leave Request", page: "sent" },
  ];
  const dispatch = useDispatch();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    dispatch(getListLeaveRequestAction());
  }, []);

  return (
    <>
      <div style={{ textAlign: "center", margin: "8px 0" }}>
        {page?.map((s) => (
          <Chip
            key={s.id}
            label={s.value}
            variant="outlined"
            style={{ marginRight: "5px", marginBottom: "5px" }}
            onClick={() => setCurretPage(s.page)}
          />
        ))}
      </div>

      {currentPage === "inbox" && <TeacherLeaveRequestInbox />}
      {currentPage === "sent" && <TeacherLeaveRequestSent />}

      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default TeacherLeaveRequest;
