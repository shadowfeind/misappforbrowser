import {
  GET_ALL_UPLOADPHOTO_STUDENT_FAIL,
  GET_ALL_UPLOADPHOTO_STUDENT_REQUEST,
  GET_ALL_UPLOADPHOTO_STUDENT_RESET,
  GET_ALL_UPLOADPHOTO_STUDENT_SUCCESS,
  UPLOADPHOTO_STUDENT_FAIL,
  UPLOADPHOTO_STUDENT_REQUEST,
  UPLOADPHOTO_STUDENT_RESET,
  UPLOADPHOTO_STUDENT_SUCCESS,
} from "./UploadPhotoConstants";

export const getAllUploadPhotoStudentReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_UPLOADPHOTO_STUDENT_REQUEST:
      return { loading: true };
    case GET_ALL_UPLOADPHOTO_STUDENT_SUCCESS:
      return { loading: false,allUploadPhoto: action.payload };
    case GET_ALL_UPLOADPHOTO_STUDENT_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_UPLOADPHOTO_STUDENT_RESET:
      return {};
    default:
      return state;
  }
};

export const uploadPhotoStudentReducer = (state = {}, action) => {
  switch (action.type) {
    case UPLOADPHOTO_STUDENT_REQUEST:
      return { loading: true };
    case UPLOADPHOTO_STUDENT_SUCCESS:
      return { loading: false, success: true };
    case UPLOADPHOTO_STUDENT_FAIL:
      return { loading: false, error: action.payload };
    case UPLOADPHOTO_STUDENT_RESET:
      return {};
    default:
      return state;
  }
};
