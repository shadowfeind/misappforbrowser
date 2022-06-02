import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import CustomContainer from "../../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../../components/Notification";
import {
  GET_ALL_UPLOADPHOTO_STUDENT_RESET,
  UPLOADPHOTO_STUDENT_RESET,
} from "./UploadPhotoConstants";
import { getAllUploadPhotoStudentAction } from "./UploadPhotoActions";
import UploadPhotoForm from "./UploadPhotoForm";
import { getHeaderContentAction } from "../../dashboard/DashboardActions";
import { getAllStudentPersonalInformationAction } from "../personalinformation/PersonalInformationActions";

const useStyles = makeStyles((theme) => ({
  searchInput: {
    width: "75%",
    fontSize: "12px",
  },
  button: {
    position: "absolute",
    right: "10px",
  },
}));

const UploadPhoto = ({ setEditStudentPhotoPopup }) => {
  const [url, setUrl] = useState("");
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const classes = useStyles();

  const dispatch = useDispatch();

  const { allUploadPhoto, allUploadPhotoError } = useSelector(
    (state) => state.getAllUploadPhotoStudent
  );
  const { success: uploadPhotoSuccess, error: uploadPhotoError } = useSelector(
    (state) => state.uploadPhotoStudent
  );
  if (allUploadPhotoError) {
    setNotify({
      isOpen: true,
      message: allUploadPhotoError,
      type: "error",
    });
    dispatch({ type: GET_ALL_UPLOADPHOTO_STUDENT_RESET });
  }
  if (uploadPhotoSuccess) {
    setNotify({
      isOpen: true,
      message: "Successfully Uploaded",
      type: "success",
    });
    setEditStudentPhotoPopup(false);
    dispatch({ type: UPLOADPHOTO_STUDENT_RESET });
    dispatch(getAllUploadPhotoStudentAction());
    dispatch(getHeaderContentAction());
    dispatch(getAllStudentPersonalInformationAction());
  }
  if (uploadPhotoError) {
    setNotify({
      isOpen: true,
      message: "Image Required",
      type: "error",
    });
    dispatch({ type: UPLOADPHOTO_STUDENT_RESET });
  }

  useEffect(() => {
    dispatch(getAllUploadPhotoStudentAction());
  }, []);

  return (
    <CustomContainer>
      <UploadPhotoForm uploadPhoto={allUploadPhoto && allUploadPhoto} />
      <Notification notify={notify} setNotify={setNotify} />
    </CustomContainer>
  );
};

export default UploadPhoto;
