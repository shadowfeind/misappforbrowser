import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../../components/Notification";
import {
  GET_LIST_LEAVE_REQUESTS_RESET,
  GET_SINGLE_TO_EDIT_LEAVE_REQUESTS_RESET,
  PUT_LEAVE_REQUESTS_RESET,
} from "../TeacherLeaveRequestConstants";
import InboxListCollapse from "./InboxListCollapse";
import Popup from "../../../components/Popup";
import { getListLeaveRequestAction } from "../TeacherLeaveRequestActions";
import TeacherLeaveRequestApproveForm from "../TeacherLeaveRequestApproveForm";
import MobileBody from "../../../components/MobileBody";

const TeacherLeaveRequestInbox = () => {
  const [approvalPopUp, setApprovalPopUp] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const dispatch = useDispatch();

  const { listLeaveRequest, listLeaveRequestError } = useSelector(
    (state) => state.getListLeaveRequest
  );
  const { singleEditSentLeaveRequest, error: singleEditSentLeaveRequestError } =
    useSelector((state) => state.getSingleEditSentLeaveRequest);

  const { success: putLeaveRequestSuccess, error: putLeaveRequestError } =
    useSelector((state) => state.putLeaveRequest);

  if (listLeaveRequestError) {
    setNotify({
      isOpen: true,
      message: listLeaveRequestError,
      type: "error",
    });
    dispatch({ type: GET_LIST_LEAVE_REQUESTS_RESET });
  }

  if (singleEditSentLeaveRequestError) {
    setNotify({
      isOpen: true,
      message: singleEditSentLeaveRequestError,
      type: "error",
    });
    dispatch({ type: GET_SINGLE_TO_EDIT_LEAVE_REQUESTS_RESET });
  }

  if (putLeaveRequestError) {
    setNotify({
      isOpen: true,
      message: putLeaveRequestError,
      type: "error",
    });
    dispatch({ type: PUT_LEAVE_REQUESTS_RESET });
  }

  if (putLeaveRequestSuccess) {
    dispatch(getListLeaveRequestAction());
    setNotify({
      isOpen: true,
      message: "Leave Request Edited Succesfully",
      type: "success",
    });
    setApprovalPopUp(false);
    dispatch({ type: PUT_LEAVE_REQUESTS_RESET });
  }

  return (
    <>
      <h4 style={{ textAlign: "center", margin: "5px" }}>
        Leave Approve(Inbox)
      </h4>
      <MobileBody>
        {listLeaveRequest &&
          listLeaveRequest?.dbModelReceiverLst?.map((item) => (
            <InboxListCollapse
              key={item.$id}
              item={item}
              setOpenPopUp={setApprovalPopUp}
            />
          ))}
      </MobileBody>
      <Popup
        openPopup={approvalPopUp}
        setOpenPopup={setApprovalPopUp}
        title="Leave Approval Form"
      >
        <TeacherLeaveRequestApproveForm
          leaveRequestEditApproval={
            singleEditSentLeaveRequest && singleEditSentLeaveRequest
          }
          setOpenPopUp={setApprovalPopUp}
        />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default TeacherLeaveRequestInbox;
