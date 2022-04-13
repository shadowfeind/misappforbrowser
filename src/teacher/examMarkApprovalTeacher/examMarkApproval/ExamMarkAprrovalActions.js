import axios from "axios";
import { API_URL, tokenConfig } from "../../../constants";
import {
  GET_ACTIVE_SUBJECT_FAIL,
  GET_ACTIVE_SUBJECT_REQUEST,
    GET_ACTIVE_SUBJECT_SUCCESS,
    GET_ALL_EXAM_MARK_APPROVAL_SEARCHDATA_FAIL,
    GET_ALL_EXAM_MARK_APPROVAL_SEARCHDATA_REQUEST,
  GET_ALL_EXAM_MARK_APPROVAL_SEARCHDATA_SUCCESS,
  GET_ALL_OTHER_OPTIONS_FOR_SELECT_FAIL,
  GET_ALL_OTHER_OPTIONS_FOR_SELECT_REQUEST,
  GET_ALL_OTHER_OPTIONS_FOR_SELECT_SUCCESS,
  GET_ALL_OTHER_OPTIONS_FOR_SELECT_TEACHER_FAIL,
  GET_ALL_OTHER_OPTIONS_FOR_SELECT_TEACHER_REQUEST,
  GET_ALL_OTHER_OPTIONS_FOR_SELECT_TEACHER_SUCCESS,
  GET_BULK_EXAM_MARK_APPROVAL_FAIL,
  GET_BULK_EXAM_MARK_APPROVAL_REQUEST,
  GET_BULK_EXAM_MARK_APPROVAL_SUCCESS,
  GET_EXAM_MARK_APPROVAL_INITIAL_DATA_FAIL,
  GET_EXAM_MARK_APPROVAL_INITIAL_DATA_REQUEST,
  GET_EXAM_MARK_APPROVAL_INITIAL_DATA_SUCCESS,
  GET_EXAM_MARK_APPROVAL_SCHEULE_HEADER_FAIL,
  GET_EXAM_MARK_APPROVAL_SCHEULE_HEADER_REQUEST,
  GET_EXAM_MARK_APPROVAL_SCHEULE_HEADER_SUCCESS,
  POST_BULK_EXAM_MARK_APPROVAL_FAIL,
  POST_BULK_EXAM_MARK_APPROVAL_REQUEST,
  POST_BULK_EXAM_MARK_APPROVAL_SUCCESS,
} from "./ExamMarkApprovalConstant";

export const getInitialExamMarkApprovalDataAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_EXAM_MARK_APPROVAL_INITIAL_DATA_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/ApproveAcademicStudentExamDataTeacher/GetAllApproveAcademicStudentExamDataTeacher?searchKey=1
        `,
      tokenConfig()
    );

    dispatch({
      type: GET_EXAM_MARK_APPROVAL_INITIAL_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_EXAM_MARK_APPROVAL_INITIAL_DATA_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const getExamMarkApprovalScheduleHeaderAction =
  (year, program, classId, section, event) => async (dispatch) => {
    try {
      dispatch({ type: GET_EXAM_MARK_APPROVAL_SCHEULE_HEADER_REQUEST });

      const { data } = await axios.get(
        `${API_URL}/api/ApproveAcademicStudentExamDataTeacher/GetActiveExamScheduleListForExamMarkEntry?idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${classId}&section=${section}&idAcademicYearCalendar=${event}&roleID=1`,
        tokenConfig()
      );

      dispatch({
        type: GET_EXAM_MARK_APPROVAL_SCHEULE_HEADER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_EXAM_MARK_APPROVAL_SCHEULE_HEADER_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

  export const getExamMarkApprovalSearchDataAction =
  (year, program, classId, section, shift, event, schedule) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_EXAM_MARK_APPROVAL_SEARCHDATA_REQUEST });

      const { data } = await axios.get(
        `${API_URL}/api/ApproveAcademicStudentExamDataTeacher/GetListApproveAcademicStudentExamDataTeacher?idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${classId}&section=${section}&idShift=${shift}&idAcademicYearCalendar=${event}&idAcademicFacultySubjectLink=${schedule}&searchKey=1`,
        tokenConfig()
      );

      dispatch({
        type: GET_ALL_EXAM_MARK_APPROVAL_SEARCHDATA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_EXAM_MARK_APPROVAL_SEARCHDATA_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

  export const getBulkExamMarkApprovalSearchDataAction =
  (year, program, classId, section, shift, event, schedule) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_BULK_EXAM_MARK_APPROVAL_REQUEST });

      const { data } = await axios.get(
        `${API_URL}/api/ApproveAcademicStudentExamDataTeacher/GetBulkApproveAcademicStudentExamDataTeacher?idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${classId}&section=${section}&idShift=${shift}&idAcademicYearCalendar=${event}&idAcademicFacultySubjectLink=${schedule}&searchKey=1`,
        tokenConfig()
      );

      dispatch({
        type: GET_BULK_EXAM_MARK_APPROVAL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_BULK_EXAM_MARK_APPROVAL_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

  export const postBulkExamMarkApprovalAction =
  (students, search) => async (dispatch) => {
    try {
      dispatch({ type: POST_BULK_EXAM_MARK_APPROVAL_REQUEST });

      const jsonData = JSON.stringify({
        dbModelLsts: students,
        searchFilterModel: search,
      });

      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };

      await axios.post(
        `${API_URL}/api/ApproveAcademicStudentExamDataTeacher/PostApproveAcademicStudentExamData`,
        jsonData,
        tokenConfig()
      );

      dispatch({ type: POST_BULK_EXAM_MARK_APPROVAL_SUCCESS });
    } catch (error) {
      dispatch({
        type: POST_BULK_EXAM_MARK_APPROVAL_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

  export const getAllOtherOptionsForSelectTeacherAction =
  (id, subject) => async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_OTHER_OPTIONS_FOR_SELECT_TEACHER_REQUEST });

      const year = await axios.get(
        `${API_URL}/api/ApproveAcademicStudentExamDataTeacher/ActionForAcademicYear?idAcademicFacultySubjectLink=${subject}&idTeacher=${id}`,
        tokenConfig()
      );

      const program = await axios.get(
        `${API_URL}/api/ApproveAcademicStudentExamDataTeacher/ActionForForFacultyProgram?idAcademicFacultySubjectLink=${subject}&idTeacher=${id}`,
        tokenConfig()
      );

      const classId = await axios.get(
        `${API_URL}/api/ApproveAcademicStudentExamDataTeacher/ActionForForLevel?idAcademicFacultySubjectLink=${subject}&idTeacher=${id}`,
        tokenConfig()
      );

      const section = await axios.get(
        `${API_URL}/api/ApproveAcademicStudentExamDataTeacher/ActionForForSection?idAcademicFacultySubjectLink=${subject}&idTeacher=${id}`,
        tokenConfig()
      );

      const shift = await axios.get(
        `${API_URL}/api/ApproveAcademicStudentExamDataTeacher/ActionForForShift?idAcademicFacultySubjectLink=${subject}&idTeacher=${id}`,
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
        type: GET_ALL_OTHER_OPTIONS_FOR_SELECT_TEACHER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_OTHER_OPTIONS_FOR_SELECT_TEACHER_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

  export const getActiveSubjectAction =
  (year, program, classId) => async (dispatch) => {
    try {
      dispatch({ type: GET_ACTIVE_SUBJECT_REQUEST });

      const { data } = await axios.get(
        `${API_URL}/api/ApproveAcademicStudentExamDataTeacher/GetActiveAcademicYearCalendar?idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${classId}`,
        tokenConfig()
      );

      dispatch({
        type: GET_ACTIVE_SUBJECT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ACTIVE_SUBJECT_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

