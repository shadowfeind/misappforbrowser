import React, { useEffect, useState } from "react";
import { Button, makeStyles } from "@material-ui/core";
import CustomContainer from "../../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../../components/Notification";
import {
  GET_ALL_UPLOADPHOTO_STUDENT_RESET,
  UPLOADPHOTO_STUDENT_RESET,
} from "./UploadPhotoConstants";
import {
  getAllUploadPhotoStudentAction,
  uploadPhotoActionAction,
} from "./UploadPhotoActions";
import { API_URL } from "../../../constants";
import UploadPhotoForm from "./UploadPhotoForm";

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

const UploadPhoto = () => {
  const [url, setUrl] = useState("");
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const classes = useStyles();

  const dispatch = useDispatch();

  const { allUploadPhoto, allUploadPhotoError } = useSelector((state) => state.getAllUploadPhotoStudent);
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
    dispatch({ type: UPLOADPHOTO_STUDENT_RESET });
    dispatch(getAllUploadPhotoStudentAction());
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
    dispatch({ type: "GET_LINK", payload: "/" });
    if (!allUploadPhoto) {
      dispatch(getAllUploadPhotoStudentAction());
    }
  }, [dispatch, allUploadPhoto]);

//   useEffect(()=>{
// if (uploadPhotoSuccess){
//   setUrl(`${API_URL}${uploadPhotoSuccess.FullPath}`);
// }
//   },[uploadPhotoSuccess]);

  return (
    <CustomContainer>
      upload Photo
      <br />
      {/* {photo && <img src={`${API_URL}${photo.dbModel.FullPath}`} />} */}
      <UploadPhotoForm
        uploadPhoto={
          allUploadPhoto && allUploadPhoto
        }
      />
      <Notification notify={notify} setNotify={setNotify} />
    </CustomContainer>
  );
};

export default UploadPhoto;
