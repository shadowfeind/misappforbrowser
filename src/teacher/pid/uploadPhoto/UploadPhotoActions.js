
import { API_URL, axiosInstance, tokenConfig } from "../../../constants";

import {
  GET_ALL_UPLOADPHOTO_FAIL,
  GET_ALL_UPLOADPHOTO_REQUEST,
  GET_ALL_UPLOADPHOTO_SUCCESS,
  UPLOADPHOTO_FAIL,
  UPLOADPHOTO_REQUEST,
  UPLOADPHOTO_SUCCESS,
} from "./UploadPhotoConstants";

export const getAllUploadPhotoAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_UPLOADPHOTO_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/PID_PhotoUpload/GetSingleToEditPhoto`,
      
    );

    dispatch({
      type: GET_ALL_UPLOADPHOTO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_UPLOADPHOTO_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const putUploadPhotoAction = (image, dbData) => async (dispatch) => {
  try {
    dispatch({ type: UPLOADPHOTO_REQUEST });

    let formData = new FormData();
    formData.append("ImageUploaded", image);

    const { data } = await axiosInstance.post(
      `/api/PID_PhotoUpload/FileUpload`,
      formData,
      
    );

    if (data) {
      const newData = {
        ...dbData,
        ...data,
      };
      const jsonData = JSON.stringify({
        hrEmployeeModel: newData,
      });
      console.log(jsonData);
      await axiosInstance.put(
        `/api/PID_PhotoUpload/PutPhoto`,
        jsonData,
        
      );
    }

    dispatch({
      type: UPLOADPHOTO_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: UPLOADPHOTO_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};
