import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, makeStyles } from "@material-ui/core";
import Notification from "../../../components/Notification";
import {
  DELETE_LEAVE_REQUESTS_RESET,
  GET_LIST_LEAVE_REQUESTS_RESET,
  GET_SINGLE_TO_CREATE_LEAVE_REQUESTS_RESET,
  GET_SINGLE_TO_DELETE_LEAVE_REQUESTS_RESET,
  GET_SINGLE_TO_EDIT_LEAVE_REQUESTS_RESET,
  POST_LEAVE_REQUESTS_RESET,
  PUT_LEAVE_REQUESTS_RESET,
} from "../TeacherLeaveRequestConstants";
import SentListCollapse from "./SentListCollapse";
import AddBoxIcon from "@material-ui/icons/AddBox";
import Popup from "../../../components/Popup";
import TeacherLeaveRequestForm from "../TeacherLeaveRequestForm";
import {
  getListLeaveRequestAction,
  getSingleCreateLeaveRequestAction,
} from "../TeacherLeaveRequestActions";
import TeacherLeaveRequestDelete from "../TeacherLeaveRequestDelete";
import MobileBody from "../../../components/MobileBody";

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: "10px",
    marginLeft: "10px",
    padding: "5px",
    minWidth: "10px",
    fontSize: "12px",
  },
}));

const TeacherLeaveRequestSent = () => {
  const [requestPopUp, setRequestPopUp] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const classes = useStyles();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const dispatch = useDispatch();

  const { listLeaveRequest, listLeaveRequestError } = useSelector(
    (state) => state.getListLeaveRequest
  );

  const { singleCreateLeaveRequest, error: singleCreateLeaveRequestError } =
    useSelector((state) => state.getSingleCreateLeaveRequest);

  const { singleEditLeaveRequest, error: singleEditLeaveRequestError } =
    useSelector((state) => state.getSingleEditLeaveRequest);

  const { singleDeleteLeaveRequest, error: singleDeleteLeaveRequestError } =
    useSelector((state) => state.getSingleDeleteLeaveRequest);

  const { success: postLeaveRequestSuccess, error: postLeaveRequestError } =
    useSelector((state) => state.postLeaveRequest);

  const { success: putLeaveRequestSuccess, error: putLeaveRequestError } =
    useSelector((state) => state.putLeaveRequest);

  const { success: deleteLeaveRequestSuccess, error: deleteLeaveRequestError } =
    useSelector((state) => state.deleteLeaveRequest);

  if (listLeaveRequestError) {
    setNotify({
      isOpen: true,
      message: listLeaveRequestError,
      type: "error",
    });
    dispatch({ type: GET_LIST_LEAVE_REQUESTS_RESET });
  }

  if (singleCreateLeaveRequestError) {
    setNotify({
      isOpen: true,
      message: singleCreateLeaveRequestError,
      type: "error",
    });
    dispatch({ type: GET_SINGLE_TO_CREATE_LEAVE_REQUESTS_RESET });
  }

  if (singleEditLeaveRequestError) {
    setNotify({
      isOpen: true,
      message: singleEditLeaveRequestError,
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

  if (singleDeleteLeaveRequestError) {
    setNotify({
      isOpen: true,
      message: singleDeleteLeaveRequestError,
      type: "error",
    });
    setOpenDeletePopup(false);
    dispatch({ type: GET_SINGLE_TO_DELETE_LEAVE_REQUESTS_RESET });
  }

  if (deleteLeaveRequestError) {
    setNotify({
      isOpen: true,
      message: deleteLeaveRequestError,
      type: "error",
    });
    setOpenDeletePopup(false);
    dispatch({ type: DELETE_LEAVE_REQUESTS_RESET });
  }

  if (postLeaveRequestError) {
    setNotify({
      isOpen: true,
      message: postLeaveRequestError,
      type: "error",
    });
    dispatch({ type: POST_LEAVE_REQUESTS_RESET });
  }

  if (putLeaveRequestSuccess) {
    dispatch(getListLeaveRequestAction());
    setNotify({
      isOpen: true,
      message: "Leave Request Edited Succesfully",
      type: "success",
    });
    setRequestPopUp(false);
    dispatch({ type: PUT_LEAVE_REQUESTS_RESET });
  }
  if (postLeaveRequestSuccess) {
    setNotify({
      isOpen: true,
      message: "Leave Request Send Succesfully",
      type: "success",
    });
    setRequestPopUp(false);
    dispatch(getListLeaveRequestAction());
    dispatch({ type: POST_LEAVE_REQUESTS_RESET });
  }

  if (deleteLeaveRequestSuccess) {
    dispatch(getListLeaveRequestAction());
    setNotify({
      isOpen: true,
      message: "Deleted Succesfully",
      type: "success",
    });
    setOpenDeletePopup(false);
    dispatch({ type: DELETE_LEAVE_REQUESTS_RESET });
  }

  const createHandler = () => {
    dispatch(getSingleCreateLeaveRequestAction());
    setRequestPopUp(true);
    dispatch({ type: GET_SINGLE_TO_EDIT_LEAVE_REQUESTS_RESET });
  };

  return (
    <>
      <h4 style={{ textAlign: "center", margin: "5px" }}>
        Leave Request(Sent){"  "}
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={createHandler}
        >
          <AddBoxIcon style={{ fontSize: 14 }} />
        </Button>
      </h4>
      <MobileBody>
        {listLeaveRequest &&
          listLeaveRequest?.dbModelLst?.map((item) => (
            <SentListCollapse
              key={item.$id}
              item={item}
              setOpenPopUp={setRequestPopUp}
              setOpenDeletePopup={setOpenDeletePopup}
            />
          ))}
      </MobileBody>
      <Popup
        openPopup={requestPopUp}
        setOpenPopup={setRequestPopUp}
        title="Leave Request Form"
      >
        <TeacherLeaveRequestForm
          leaveRequestEdit={singleEditLeaveRequest && singleEditLeaveRequest}
          leaveRequestCreate={
            singleCreateLeaveRequest && singleCreateLeaveRequest
          }
          setOpenPopUp={setRequestPopUp}
        />
      </Popup>
      <Popup
        openPopup={openDeletePopup}
        setOpenPopup={setOpenDeletePopup}
        title="Leave Request Delete"
      >
        <TeacherLeaveRequestDelete
          leaveRequestDelete={
            singleDeleteLeaveRequest && singleDeleteLeaveRequest.dbModel
          }
          setOpenDeletePopup={setOpenDeletePopup}
        />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default TeacherLeaveRequestSent;
