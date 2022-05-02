import { Button, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomContainer from "../../components/CustomContainer";
import LoadingComp from "../../components/LoadingComp";
import MobileTopSelectContainer from "../../components/MobileTopSelectContainer";
import {
  studentGetListLeaveRequestAction,
  studentGetSingleCreateLeaveRequestAction,
} from "./StudentLeaveRequestActions";
import StudentLeaveRequestListCollapse from "./StudentLeaveRequestListCollapse";
import AddBoxIcon from "@material-ui/icons/AddBox";
import Notification from "../../components/Notification";
import Popup from "../../components/Popup";
import {
  STUDENT_DELETE_LEAVE_REQUESTS_RESET,
  STUDENT_DOWNLOAD_DOC_LEAVE_REQUESTS_RESET,
  STUDENT_GET_SINGLE_TO_CREATE_LEAVE_REQUESTS_RESET,
  STUDENT_GET_SINGLE_TO_EDIT_LEAVE_REQUESTS_RESET,
  STUDENT_POST_LEAVE_REQUESTS_RESET,
  STUDENT_PUT_LEAVE_REQUESTS_RESET,
} from "./StudentLeaveRequestConstants";
import StudentLeaveRequestForm from "./StudentLeaveRequestForm";
import StudentLeaveRequestDelete from "./StudentLeaveRequestDelete";

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: "10px",
    padding: "5px",
    minWidth: "10px",
    fontSize: "12px",
  },
}));

const StudentLeaveRequest = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopupDelete, setOpenPopupDelete] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const { allLeaveRequest, error, loading } = useSelector(
    (state) => state.studentGetAllLeaveRequest
  );

  const { singleCreateLeaveRequest, error: singleCreateLeaveRequestError } =
    useSelector((state) => state.studentGetSingleCreateLeaveRequest);

  const { success: postLeaveRequestSuccess, error: postLeaveRequestError } =
    useSelector((state) => state.studentPostLeaveRequest);

  const { singleDeleteLeaveRequest, error: singleDeleteLeaveRequestError } =
    useSelector((state) => state.studentGetSingleDeleteLeaveRequest);

  const { success: deleteLeaveRequestSuccess, error: deleteLeaveRequestError } =
    useSelector((state) => state.studentDeleteLeaveRequest);

  const { singleEditLeaveRequest, error: singleEditLeaveRequestError } =
    useSelector((state) => state.studentGetSingleEditLeaveRequest);

  const { success: putLeaveRequestSuccess, error: putLeaveRequestError } =
    useSelector((state) => state.studentPutLeaveRequest);

  const { error: downloadDocError } = useSelector(
    (state) => state.studentDownloadLeaveRequest
  );

  const {
    listLeaveRequest,
    listLeaveRequestError,
    loading: listLeaveRequestLoading,
  } = useSelector((state) => state.studentGetListLeaveRequest);

  if (singleCreateLeaveRequestError) {
    setNotify({
      isOpen: true,
      message: singleCreateLeaveRequestError,
      type: "error",
    });
    dispatch({ type: STUDENT_GET_SINGLE_TO_CREATE_LEAVE_REQUESTS_RESET });
  }
  if (deleteLeaveRequestSuccess) {
    setNotify({
      isOpen: true,
      message: "Successfully Deleted",
      type: "success",
    });
    dispatch(studentGetListLeaveRequestAction());
    setOpenPopupDelete(false);
    dispatch({ type: STUDENT_DELETE_LEAVE_REQUESTS_RESET });
  }
  if (deleteLeaveRequestError) {
    setNotify({
      isOpen: true,
      message: deleteLeaveRequestError,
      type: "error",
    });
    setOpenPopupDelete(false);
    dispatch({ type: STUDENT_DELETE_LEAVE_REQUESTS_RESET });
  }
  if (singleDeleteLeaveRequestError) {
    setNotify({
      isOpen: true,
      message: singleDeleteLeaveRequestError,
      type: "error",
    });
    setOpenPopupDelete(false);
    dispatch({ type: STUDENT_DELETE_LEAVE_REQUESTS_RESET });
  }

  if (putLeaveRequestSuccess) {
    setOpenPopup(false);
    dispatch(studentGetListLeaveRequestAction());
    setNotify({
      isOpen: true,
      message: "Successfully Update",
      type: "success",
    });
    dispatch({ type: STUDENT_PUT_LEAVE_REQUESTS_RESET });
  }

  if (postLeaveRequestError) {
    setNotify({
      isOpen: true,
      message: postLeaveRequestError,
      type: "error",
    });
    dispatch({ type: STUDENT_POST_LEAVE_REQUESTS_RESET });
  }

  if (downloadDocError) {
    setNotify({
      isOpen: true,
      message: downloadDocError,
      type: "error",
    });
    dispatch({ type: STUDENT_DOWNLOAD_DOC_LEAVE_REQUESTS_RESET });
  }

  if (postLeaveRequestSuccess) {
    setNotify({
      isOpen: true,
      message: "Leave Request Send Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch(studentGetListLeaveRequestAction());
    dispatch({ type: STUDENT_POST_LEAVE_REQUESTS_RESET });
  }

  if (singleEditLeaveRequestError) {
    setNotify({
      isOpen: true,
      message: singleEditLeaveRequestError,
      type: "error",
    });
    dispatch({ type: STUDENT_GET_SINGLE_TO_EDIT_LEAVE_REQUESTS_RESET });
  }

  useEffect(() => {
    dispatch(studentGetListLeaveRequestAction());
  }, []);

  const createHandler = () => {
    dispatch(studentGetSingleCreateLeaveRequestAction());
    setOpenPopup(true);
    dispatch({ type: STUDENT_GET_SINGLE_TO_EDIT_LEAVE_REQUESTS_RESET });
  };
  return (
    <>
      <CustomContainer>
        <MobileTopSelectContainer>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span
              style={{
                textAlign: "center",
                marginTop: "0",
                fontSize: "16px",
                fontWeight: "bolder",
              }}
            >
              Leave Requests
            </span>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={createHandler}
            >
              <AddBoxIcon style={{ fontSize: 12 }} />
            </Button>
          </div>
          {listLeaveRequestLoading && <LoadingComp />}
        </MobileTopSelectContainer>
        {listLeaveRequest &&
          listLeaveRequest.dbModelLst.map((item) => (
            <StudentLeaveRequestListCollapse
              item={item}
              key={item.$id}
              setOpenPopUp={setOpenPopup}
              setOpenPopupDelete={setOpenPopupDelete}
            />
          ))}
      </CustomContainer>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Leave Request"
      >
        <StudentLeaveRequestForm
          leaveRequestEdit={singleEditLeaveRequest && singleEditLeaveRequest}
          leaveRequestCreate={
            singleCreateLeaveRequest && singleCreateLeaveRequest
          }
          setOpenPopUp={setOpenPopup}
        />
      </Popup>
      <Popup
        openPopup={openPopupDelete}
        setOpenPopup={setOpenPopupDelete}
        title="Leave Request Delete"
      >
        <StudentLeaveRequestDelete
          leaveRequestDelete={
            singleDeleteLeaveRequest && singleDeleteLeaveRequest.dbModel
          }
          setOpenPopUp={setOpenPopupDelete}
        />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default StudentLeaveRequest;
