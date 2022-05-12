import { API_URL, axiosInstance, tokenConfig } from "../../constants";
import {
  DOWNLOAD_OLD_QUESTIONS_STUDENT_FAIL,
  DOWNLOAD_OLD_QUESTIONS_STUDENT_REQUEST,
  DOWNLOAD_OLD_QUESTIONS_STUDENT_SUCCESS,
  GET_ALL_OLD_QUESTIONS_STUDENT_FAIL,
  GET_ALL_OLD_QUESTIONS_STUDENT_REQUEST,
  GET_ALL_OLD_QUESTIONS_STUDENT_SUCCESS,
  GET_LIST_OLD_QUESTIONS_STUDENT_FAIL,
  GET_LIST_OLD_QUESTIONS_STUDENT_REQUEST,
  GET_LIST_OLD_QUESTIONS_STUDENT_SUCCESS,
  GET_SUBJECT_OPTIONS_OLD_QUESTIONS_STUDENT_FAIL,
  GET_SUBJECT_OPTIONS_OLD_QUESTIONS_STUDENT_REQUEST,
  GET_SUBJECT_OPTIONS_OLD_QUESTIONS_STUDENT_SUCCESS,
} from "./OldQuestionsConstants";

export const getAllOldQuestionsStudentAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_OLD_QUESTIONS_STUDENT_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/OldQuestionStudent/GetAllOldQuestion`
    );

    dispatch({
      type: GET_ALL_OLD_QUESTIONS_STUDENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_OLD_QUESTIONS_STUDENT_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const getSubjectOptionsForOldQuestionsStudentAction =
  (classId) => async (dispatch) => {
    try {
      dispatch({ type: GET_SUBJECT_OPTIONS_OLD_QUESTIONS_STUDENT_REQUEST });

      const subject = await axiosInstance.get(
        `/api/OldQuestionStudent/GetSubjectByIDLevel?level=${classId}`
      );
      const data = {
        subject: subject.data,
      };
      dispatch({
        type: GET_SUBJECT_OPTIONS_OLD_QUESTIONS_STUDENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SUBJECT_OPTIONS_OLD_QUESTIONS_STUDENT_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const getListOldQuestionsStudentAction =
  (classId, subject) => async (dispatch) => {
    try {
      dispatch({ type: GET_LIST_OLD_QUESTIONS_STUDENT_REQUEST });

      const { data } = await axiosInstance.get(
        `/api/OldQuestionStudent/GetListOldQuestion?level=${classId}&idAcademicSubject=${subject}`
      );

      dispatch({
        type: GET_LIST_OLD_QUESTIONS_STUDENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_LIST_OLD_QUESTIONS_STUDENT_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const downloadOldQuestionsStudentAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: DOWNLOAD_OLD_QUESTIONS_STUDENT_REQUEST });

    const test = `/api/OldQuestionStudent/DownloadOldQuestion/${id}`;

    window.open(test, "_blank");
    dispatch({
      type: DOWNLOAD_OLD_QUESTIONS_STUDENT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: DOWNLOAD_OLD_QUESTIONS_STUDENT_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};
