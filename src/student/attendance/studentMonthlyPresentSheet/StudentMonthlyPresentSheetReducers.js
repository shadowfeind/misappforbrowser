import {
  GET_ALL_STUDENT_ATTENDANCE_FAIL,
  GET_ALL_STUDENT_ATTENDANCE_REQUEST,
  GET_ALL_STUDENT_ATTENDANCE_RESET,
  GET_ALL_STUDENT_ATTENDANCE_SUCCESS,
  GET_ENGLISH_DATE_STUDENT_FAIL,
  GET_ENGLISH_DATE_STUDENT_REQUEST,
  GET_ENGLISH_DATE_STUDENT_RESET,
  GET_ENGLISH_DATE_STUDENT_SUCCESS,
  GET_LIST_STUDENT_ATTENDANCE_FAIL,
  GET_LIST_STUDENT_ATTENDANCE_REQUEST,
  GET_LIST_STUDENT_ATTENDANCE_RESET,
  GET_LIST_STUDENT_ATTENDANCE_SUCCESS,
  GET_ALL_OTHER_OPTIONS_FOR_STUDENT_FAIL,
  GET_ALL_OTHER_OPTIONS_FOR_STUDENT_REQUEST,
  GET_ALL_OTHER_OPTIONS_FOR_STUDENT_RESET,
  GET_ALL_OTHER_OPTIONS_FOR_STUDENT_SUCCESS,
} from "./StudentMonthlyPresentSheetConstants";

export const getAllStudentAttendanceReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_STUDENT_ATTENDANCE_REQUEST:
      return { loading: true };
    case GET_ALL_STUDENT_ATTENDANCE_SUCCESS:
      return {
        loading: false,
        allStudentAttendanceData: action.payload,
      };
    case GET_ALL_STUDENT_ATTENDANCE_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_STUDENT_ATTENDANCE_RESET:
      return {};
    default:
      return state;
  }
};

export const getAllOtherOptionsForStudentReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_OTHER_OPTIONS_FOR_STUDENT_REQUEST:
      return { loading: true };
    case GET_ALL_OTHER_OPTIONS_FOR_STUDENT_SUCCESS:
      return {
        loading: false,
        allOtherOptions: action.payload,
      };
    case GET_ALL_OTHER_OPTIONS_FOR_STUDENT_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_OTHER_OPTIONS_FOR_STUDENT_RESET:
      return {};
    default:
      return state;
  }
};

export const getEnglishDateStudentReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ENGLISH_DATE_STUDENT_REQUEST:
      return { loading: true };
    case GET_ENGLISH_DATE_STUDENT_SUCCESS:
      return {
        loading: false,
        engDateStudent: action.payload,
      };
    case GET_ENGLISH_DATE_STUDENT_FAIL:
      return { loading: false, error: action.payload };
    case GET_ENGLISH_DATE_STUDENT_RESET:
      return {};
    default:
      return state;
  }
};

export const getListStudentAttendanceReducer = (state = {}, action) => {
  switch (action.type) {
    case  GET_LIST_STUDENT_ATTENDANCE_REQUEST:
      return { loading: true };
    case GET_LIST_STUDENT_ATTENDANCE_SUCCESS:
      return {
        loading: false,
        getListStudentAttendance: action.payload,
      };
    case GET_LIST_STUDENT_ATTENDANCE_FAIL:
      return { loading: false, error: action.payload };
    case GET_LIST_STUDENT_ATTENDANCE_RESET:
      return {};
    default:
      return state;
  }
};
