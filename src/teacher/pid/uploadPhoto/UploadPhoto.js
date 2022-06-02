import React, { useEffect, useState } from "react";
import { Button, makeStyles } from "@material-ui/core";
import CustomContainer from "../../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../../components/Notification";
import {
  GET_ALL_UPLOADPHOTO_RESET,
  UPLOADPHOTO_RESET,
} from "./UploadPhotoConstants";
import { API_URL } from "../../../constants";
import UploadPhotoForm from "./UploadPhotoForm";
import { getAllUploadPhotoAction } from "./UploadPhotoActions";
import { getHeaderContentAction } from "../../dashboard/DashboardActions";
import { getAllPersonalInformationAction } from "../personalinformation/PersonalInformationActions";

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

const UploadPhoto = ({ setEditPhotoPopup }) => {
  const [url, setUrl] = useState("");
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const classes = useStyles();

  const dispatch = useDispatch();

  const { allUploadPhoto, allUploadPhotoError } = useSelector(
    (state) => state.getAllUploadPhotoTeacher
  );
  const { success: uploadPhotoSuccess, error: uploadPhotoError } = useSelector(
    (state) => state.uploadPhotoTeacher
  );
  if (allUploadPhotoError) {
    setNotify({
      isOpen: true,
      message: allUploadPhotoError,
      type: "error",
    });
    dispatch({ type: GET_ALL_UPLOADPHOTO_RESET });
  }
  if (uploadPhotoSuccess) {
    setNotify({
      isOpen: true,
      message: "Successfully Uploaded",
      type: "success",
    });
    setEditPhotoPopup(false);
    dispatch({ type: UPLOADPHOTO_RESET });
    dispatch(getAllUploadPhotoAction());
    dispatch(getHeaderContentAction());
    dispatch(getAllPersonalInformationAction());
  }
  if (uploadPhotoError) {
    setNotify({
      isOpen: true,
      message: "Image Required",
      type: "error",
    });
    dispatch({ type: UPLOADPHOTO_RESET });
  }

  useEffect(() => {
    dispatch(getAllUploadPhotoAction());
  }, []);

  return (
    <CustomContainer>
      <UploadPhotoForm uploadPhoto={allUploadPhoto && allUploadPhoto} />
      <Notification notify={notify} setNotify={setNotify} />
    </CustomContainer>
  );
};

export default UploadPhoto;
