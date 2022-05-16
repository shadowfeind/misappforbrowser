import axios from "axios";
import { API_URL, axiosInstance, tokenConfig } from "../../constants";
import {
  GET_ALL_CLASS_SCHEDULE_STUDENT_FAIL,
  GET_ALL_CLASS_SCHEDULE_STUDENT_REQUEST,
  GET_ALL_CLASS_SCHEDULE_STUDENT_SUCCESS,
} from "./ClassScheduleConstant";

export const getAllClassScheduleStudentAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_CLASS_SCHEDULE_STUDENT_REQUEST });
    const { data } = await axiosInstance.get(
      `/api/ClassScheduleStudent/GetRunningClassSchedule`,tokenConfig()
    );

    dispatch({ type: GET_ALL_CLASS_SCHEDULE_STUDENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_CLASS_SCHEDULE_STUDENT_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
