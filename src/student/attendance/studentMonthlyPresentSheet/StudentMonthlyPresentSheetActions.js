import axios from "axios";
import { API_URL, tokenConfig } from "../../../constants";
import {
  GET_ALL_OTHER_OPTIONS_FOR_STUDENT_FAIL,
  GET_ALL_OTHER_OPTIONS_FOR_STUDENT_REQUEST,
  GET_ALL_OTHER_OPTIONS_FOR_STUDENT_SUCCESS,
  GET_ALL_STUDENT_ATTENDANCE_FAIL,
  GET_ALL_STUDENT_ATTENDANCE_REQUEST,
  GET_ALL_STUDENT_ATTENDANCE_SUCCESS,
  GET_ENGLISH_DATE_STUDENT_FAIL,
  GET_ENGLISH_DATE_STUDENT_REQUEST,
  GET_ENGLISH_DATE_STUDENT_SUCCESS,
  GET_LIST_STUDENT_ATTENDANCE_FAIL,
  GET_LIST_STUDENT_ATTENDANCE_REQUEST,
  GET_LIST_STUDENT_ATTENDANCE_SUCCESS,
} from "./StudentMonthlyPresentSheetConstants";

export const getAllStudentAttendanceAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_STUDENT_ATTENDANCE_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/StudentPresentSheetStudent/GetAllStudentPresentSheet`,
      tokenConfig()
    );

    dispatch({
      type: GET_ALL_STUDENT_ATTENDANCE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_STUDENT_ATTENDANCE_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const getListStudentAttendanceAction =
  (
    currentDate,
    npYear,
    npMonth,
    year,
    program,
    classId,
    subject,
    section,
    shift
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_LIST_STUDENT_ATTENDANCE_REQUEST });

      const { data } = await axios.get(
        `${API_URL}/api/StudentPresentSheetStudent/GetListStudentPresentSheet?currentDate=${currentDate}&npYear=${npYear}&npMonth=${npMonth}&idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${classId}&idAcademicFacultySubjectLink=${subject}&section=${section}&idShift=${shift}&searchKey=1`,
        tokenConfig()
      );

      dispatch({
        type: GET_LIST_STUDENT_ATTENDANCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_LIST_STUDENT_ATTENDANCE_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const getEngDateStudentAction = (year, month) => async (dispatch) => {
  try {
    dispatch({ type: GET_ENGLISH_DATE_STUDENT_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/StudentPresentSheetStudent/GetEngDate?year=${year}&month=${month}`,
      tokenConfig()
    );

    dispatch({
      type: GET_ENGLISH_DATE_STUDENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ENGLISH_DATE_STUDENT_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const getAllOtherOptionsForStudentAction =
  (id, subject) => async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_OTHER_OPTIONS_FOR_STUDENT_REQUEST });

      const year = await axios.get(
        `${API_URL}/api/StudentPresentSheetStudent/GetAttendanceForAcademicYear?idAcademicFacultySubjectLink=${subject}&idTeacher=${id}`,
        tokenConfig()
      );

      const program = await axios.get(
        `${API_URL}/api/StudentPresentSheetStudent/GetCurseDeliveryPlanForFacultyProgram?idAcademicFacultySubjectLink=${subject}&idTeacher=${id}`,
        tokenConfig()
      );

      const classId = await axios.get(
        `${API_URL}/api/StudentPresentSheetStudent/GetCurseDeliveryPlanForLevel?idAcademicFacultySubjectLink=${subject}&idTeacher=${id}`,
        tokenConfig()
      );

      const section = await axios.get(
        `${API_URL}/api/StudentPresentSheetStudent/GetCurseDeliveryPlanForSection?idAcademicFacultySubjectLink=${subject}&idTeacher=${id}`,
        tokenConfig()
      );

      const shift = await axios.get(
        `${API_URL}/api/StudentPresentSheetStudent/GetCurseDeliveryPlanForShift?idAcademicFacultySubjectLink=${subject}&idTeacher=${id}`,
        tokenConfig()
      );

      const data = {
        year: year.data,
        program: program.data,
        classId: classId.data,
        section: section.data,
        shift: shift.data,
      };

      dispatch({
        type: GET_ALL_OTHER_OPTIONS_FOR_STUDENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_OTHER_OPTIONS_FOR_STUDENT_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };
