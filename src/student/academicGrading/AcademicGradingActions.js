import axios from "axios";
import { API_URL, tokenConfig } from "../../constants";
import {
  STUDENT_GET_ALL_ACADEMIC_GRADING_REQUEST,
  STUDENT_GET_ALL_ACADEMIC_GRADING_SUCCESS,
  STUDENT_GET_ALL_ACADEMIC_GRADING_FAIL,
  STUDENT_GET_SINGLE_ACADEMIC_GRADING_REQUEST,
  STUDENT_GET_SINGLE_ACADEMIC_GRADING_SUCCESS,
  STUDENT_GET_SINGLE_ACADEMIC_GRADING_FAIL,
  STUDENT_CREATE_ACADEMIC_GRADING_REQUEST,
  STUDENT_CREATE_ACADEMIC_GRADING_SUCCESS,
  STUDENT_CREATE_ACADEMIC_GRADING_FAIL,
  STUDENT_GET_SINGLE_ACADEMIC_GRADING_EDIT_REQUEST,
  STUDENT_GET_SINGLE_ACADEMIC_GRADING_EDIT_SUCCESS,
  STUDENT_GET_SINGLE_ACADEMIC_GRADING_EDIT_FAIL,
  STUDENT_GET_SINGLE_ACADEMIC_GRADING_EDIT_RESET,
  STUDENT_UPDATE_SINGLE_ACADEMIC_GRADING_REQUEST,
  STUDENT_UPDATE_SINGLE_ACADEMIC_GRADING_SUCCESS,
  STUDENT_UPDATE_SINGLE_ACADEMIC_GRADING_FAIL,
  STUDENT_UPDATE_SINGLE_ACADEMIC_GRADING_RESET,
  STUDENT_GET_SINGLE_ACADEMIC_GRADING_RESET,
} from "./AcademicGradingConstants";

export const getAllAcademicGradingAction = () => async (dispatch) => {
  try {
    dispatch({ type: STUDENT_GET_ALL_ACADEMIC_GRADING_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/FacultyGradingSystem/GetAllAcademicGrading`,
      tokenConfig
    );
    dispatch({ type: STUDENT_GET_ALL_ACADEMIC_GRADING_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: STUDENT_GET_ALL_ACADEMIC_GRADING_FAIL,
      payload: error.message,
    });
  }
};

export const getSingleAcademicGradingAction = () => async (dispatch) => {
  try {
    dispatch({ type: STUDENT_GET_SINGLE_ACADEMIC_GRADING_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/GetToCreateFacultyGradingSystem/6/singleGetToCreate/`,
      tokenConfig
    );
    dispatch({
      type: STUDENT_GET_SINGLE_ACADEMIC_GRADING_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STUDENT_GET_SINGLE_ACADEMIC_GRADING_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createAcademicGradingAction =
  (academicGrading) => async (dispatch) => {
    try {
      dispatch({ type: STUDENT_CREATE_ACADEMIC_GRADING_REQUEST });
      const jsonData = JSON.stringify({ dbModel: academicGrading });

      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };

      const { data } = await axios.post(
        `${API_URL}/api/FacultyGradingSystem/PostFacultyGradingSystem`,
        jsonData,
        tokenConfig
      );
      dispatch({
        type: STUDENT_CREATE_ACADEMIC_GRADING_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: STUDENT_CREATE_ACADEMIC_GRADING_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getSingleAcademicGradingforEditAction =
  (IDFacultyGradingSystem) => async (dispatch) => {
    try {
      dispatch({ type: STUDENT_GET_SINGLE_ACADEMIC_GRADING_EDIT_REQUEST });

      const { data } = await axios.get(
        `${API_URL}/api/GetToEditSingleFacultyGradingSystem/${IDFacultyGradingSystem}/6/singleEdit`,
        tokenConfig
      );
      dispatch({
        type: STUDENT_GET_SINGLE_ACADEMIC_GRADING_EDIT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: STUDENT_GET_SINGLE_ACADEMIC_GRADING_EDIT_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateSingleAcademicGradingAction =
  (academicGradingEdit) => async (dispatch) => {
    try {
      console.log("Mandar", academicGradingEdit);
      academicGradingEdit.Created_On = "2021-09-23";
      academicGradingEdit.Updated_On = "2021-09-23";
      dispatch({ type: STUDENT_UPDATE_SINGLE_ACADEMIC_GRADING_REQUEST });

      const jsonData = JSON.stringify({ dbModel: academicGradingEdit });

      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };

      const { data } = await axios.put(
        `${API_URL}/api/FacultyGradingSystem/PutFacultyGradingSystem`,
        jsonData,
        tokenConfig
      );
      dispatch({
        type: STUDENT_UPDATE_SINGLE_ACADEMIC_GRADING_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: STUDENT_UPDATE_SINGLE_ACADEMIC_GRADING_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
