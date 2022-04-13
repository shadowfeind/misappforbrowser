import axios from "axios";
import { API_URL, tokenConfig } from "../../../constants";
import {
  DOWNLOAD_NEW_SOURCES_STUDENT_FAIL,
  DOWNLOAD_NEW_SOURCES_STUDENT_REQUEST,
  DOWNLOAD_NEW_SOURCES_STUDENT_SUCCESS,
  GET_ALL_NEW_SOURCES_STUDENT_FAIL,
  GET_ALL_NEW_SOURCES_STUDENT_REQUEST,
  GET_ALL_NEW_SOURCES_STUDENT_SUCCESS,
  GET_NEW_SOURCES_STUDENT_LIST_FAIL,
  GET_NEW_SOURCES_STUDENT_LIST_REQUEST,
  GET_NEW_SOURCES_STUDENT_LIST_SUCCESS,
} from "./NewResourcesStudentConstant";

export const getAllNewResourcesStudentAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_NEW_SOURCES_STUDENT_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/CourseDeliveryPlanStudent/GetAllCourseDeliveryPlan
          `,
      tokenConfig()
    );

    dispatch({
      type: GET_ALL_NEW_SOURCES_STUDENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_NEW_SOURCES_STUDENT_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const getNewResourcesStudentListAction =
  (facultySubject, year, program, section, shift, classId) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_NEW_SOURCES_STUDENT_LIST_REQUEST });

      const { data } = await axios.get(
        `${API_URL}/api/CourseDeliveryPlanStudent/GetListCourseDeliveryPlan?idAcademicFacultySubjectLink=${facultySubject}&idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${classId}&section=${section}&idShift=${shift}`,
        tokenConfig()
      );

      dispatch({
        type: GET_NEW_SOURCES_STUDENT_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_NEW_SOURCES_STUDENT_LIST_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const downloadNewResourcesAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: DOWNLOAD_NEW_SOURCES_STUDENT_REQUEST });

    const test = `${API_URL}/api/CourseDeliveryPlanStudent/DownloadDoc/${id}`;

    window.open(test, "_blank");
    dispatch({
      type: DOWNLOAD_NEW_SOURCES_STUDENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DOWNLOAD_NEW_SOURCES_STUDENT_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};
