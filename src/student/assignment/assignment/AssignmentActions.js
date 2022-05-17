import { API_URL, axiosInstance, tokenConfig } from "../../../constants";
import {
  DOWNLOAD_ASSIGNMENT_STUDENT_FAIL,
  DOWNLOAD_ASSIGNMENT_STUDENT_REQUEST,
  DOWNLOAD_ASSIGNMENT_STUDENT_SUCCESS,
  DOWNLOAD_SUBMITTED_ASSIGNMENT_STUDENT_FAIL,
  DOWNLOAD_SUBMITTED_ASSIGNMENT_STUDENT_REQUEST,
  DOWNLOAD_SUBMITTED_ASSIGNMENT_STUDENT_SUCCESS,
  GET_ALL_ASSIGNMENT_STUDENT_FAIL,
  GET_ALL_ASSIGNMENT_STUDENT_REQUEST,
  GET_ALL_ASSIGNMENT_STUDENT_SUCCESS,
  GET_ASSIGNMENT_LIST_STUDENT_FAIL,
  GET_ASSIGNMENT_LIST_STUDENT_REQUEST,
  GET_ASSIGNMENT_LIST_STUDENT_SUCCESS,
  GET_SINGLE_ASSIGNMENT_STUDENT_FAIL,
  GET_SINGLE_ASSIGNMENT_STUDENT_REQUEST,
  GET_SINGLE_ASSIGNMENT_STUDENT_SUCCESS,
  PUT_SINGLE_ASSIGNMENT_STUDENT_FAIL,
  PUT_SINGLE_ASSIGNMENT_STUDENT_REQUEST,
  PUT_SINGLE_ASSIGNMENT_STUDENT_SUCCESS,
} from "./AssignmentConstant";

export const getAllAssignmentStudentAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_ASSIGNMENT_STUDENT_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/StudentSubmission/GetAllStudentSubmission
            `,
      tokenConfig()
    );

    dispatch({
      type: GET_ALL_ASSIGNMENT_STUDENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_ASSIGNMENT_STUDENT_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const getAssignmentListStudentAction =
  (year, program, classId, shift, facultySubject) => async (dispatch) => {
    try {
      dispatch({ type: GET_ASSIGNMENT_LIST_STUDENT_REQUEST });

      const { data } = await axiosInstance.get(
        `/api/StudentSubmission/GetListStudentSubmission?idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${classId}&idShift=${shift}&idAcademicFacultySubjectLink=${facultySubject}`,
        tokenConfig()
      );

      dispatch({
        type: GET_ASSIGNMENT_LIST_STUDENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ASSIGNMENT_LIST_STUDENT_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const getSingleAssignmentStudentAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_ASSIGNMENT_STUDENT_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/StudentSubmission/GetSignleToEditStudentSubmission/${id}`,
      tokenConfig()
    );

    dispatch({
      type: GET_SINGLE_ASSIGNMENT_STUDENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_ASSIGNMENT_STUDENT_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const putSingleAssignmentStudentAction =
  (image, assignment) => async (dispatch) => {
    try {
      dispatch({ type: PUT_SINGLE_ASSIGNMENT_STUDENT_REQUEST });

      let formData = new FormData();
      formData.append("ImageUploaded", image);

      const { data } = await axiosInstance.post(
        `/api/StudentSubmission/FileUpload`,
        formData,
        tokenConfig()
      );

      if (data) {
        const newData = {
          ...assignment,
          DocumentSubmitted: data,
        };
        const jsonData = JSON.stringify({
          dbStudentSubmissionModel: newData,
        });

        console.log(jsonData);

        await axiosInstance.put(
          `/api/StudentSubmission/PutStudentSubmission`,
          jsonData,
          tokenConfig()
        );
      }

      dispatch({
        type: PUT_SINGLE_ASSIGNMENT_STUDENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PUT_SINGLE_ASSIGNMENT_STUDENT_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const downloadAssignmentStudentAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: DOWNLOAD_ASSIGNMENT_STUDENT_REQUEST });

    const test = `${API_URL}/api/StudentSubmission/DownloadDoc/${id}`;

    window.open(test, "_blank");
    dispatch({
      type: DOWNLOAD_ASSIGNMENT_STUDENT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: DOWNLOAD_ASSIGNMENT_STUDENT_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const downloadSubmittedAssignmentStudentAction =
  (id) => async (dispatch) => {
    try {
      dispatch({ type: DOWNLOAD_SUBMITTED_ASSIGNMENT_STUDENT_REQUEST });

      const test = `${API_URL}/api/StudentSubmission/DownloadSubmittedDoc/${id}`;

      window.open(test, "_blank");
      dispatch({
        type: DOWNLOAD_SUBMITTED_ASSIGNMENT_STUDENT_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: DOWNLOAD_SUBMITTED_ASSIGNMENT_STUDENT_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };
