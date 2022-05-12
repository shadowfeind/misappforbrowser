import { API_URL, axiosInstance, tokenConfig } from "../../constants";
import {
  GET_ALL_SYLLABUS_STUDENT_FAIL,
  GET_ALL_SYLLABUS_STUDENT_REQUEST,
  GET_ALL_SYLLABUS_STUDENT_SUCCESS,
} from "./SyllabusConstants";

export const getAllSyllabusStudentAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_SYLLABUS_STUDENT_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/SyllabusStudent/GetAllSyllabus`
    );

    dispatch({
      type: GET_ALL_SYLLABUS_STUDENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_SYLLABUS_STUDENT_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};
