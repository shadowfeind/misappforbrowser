import axios from "axios";
import { API_URL,tokenConfig } from "../../../constants";

import {
  GET_ALL_UPLOADPHOTO_STUDENT_FAIL,
  GET_ALL_UPLOADPHOTO_STUDENT_REQUEST,
  GET_ALL_UPLOADPHOTO_STUDENT_SUCCESS,
  UPLOADPHOTO_STUDENT_FAIL,
  UPLOADPHOTO_STUDENT_REQUEST,
  UPLOADPHOTO_STUDENT_SUCCESS,
} from "./UploadPhotoConstants";

export const getAllUploadPhotoStudentAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_UPLOADPHOTO_STUDENT_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/PID_PhotoUpload/GetSingleToEditPhoto`,
      tokenConfig()
    );

    dispatch({
      type: GET_ALL_UPLOADPHOTO_STUDENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_UPLOADPHOTO_STUDENT_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const putUploadPhotoStudentAction =
  (image, dbData) => async (dispatch) => {
    try {
      dispatch({ type: UPLOADPHOTO_STUDENT_REQUEST });

      let formData = new FormData();
      formData.append("ImageUploaded", image);

      const { data: imageData } = await axios.post(
        `${API_URL}/api/PID_PhotoUpload/FileUpload`,
        formData,
        tokenConfig()
      );

      if (imageData) {
        const newData = {
          ...dbData,
          imagename: imageData.imagename,
          thumbimagename: imageData.thumbimagename,
        };
        const jsonData = JSON.stringify({
          hrEmployeeModel: newData,
        });
        console.log(jsonData);
        await axios.put(
          `${API_URL}/api/PID_PhotoUpload/PutPhoto`,
          jsonData,
          tokenConfig()
        );
      }

      dispatch({
        type: UPLOADPHOTO_STUDENT_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: UPLOADPHOTO_STUDENT_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };