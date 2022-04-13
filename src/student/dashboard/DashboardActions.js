import axios from "axios";
import { API_URL, tokenConfig } from "../../constants";
import {
  GET_HEADER_CONTENT_FAIL,
  GET_HEADER_CONTENT_REQUEST,
  GET_HEADER_CONTENT_SUCCESS,
  GET_STUDENT_DASHBOARD_FAIL,
  GET_STUDENT_DASHBOARD_REQUEST,
  GET_STUDENT_DASHBOARD_SUCCESS,
} from "./DashboardConstants";

export const getHeaderContentAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_HEADER_CONTENT_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/Home/GetHeaderContent`,
      tokenConfig()
    );

    dispatch({ type: GET_HEADER_CONTENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_HEADER_CONTENT_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const getDashboardContentStudentAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_STUDENT_DASHBOARD_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/StudentDashboard/GetAllStudentSubmission`,
      tokenConfig()
    );

    dispatch({ type: GET_STUDENT_DASHBOARD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_STUDENT_DASHBOARD_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};
