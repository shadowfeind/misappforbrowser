import {
    GET_ALL_SYLLABUS_STUDENT_FAIL,
    GET_ALL_SYLLABUS_STUDENT_REQUEST,
    GET_ALL_SYLLABUS_STUDENT_RESET,
    GET_ALL_SYLLABUS_STUDENT_SUCCESS,
    GET_LIST_SYLLABUS_FAIL,
    GET_LIST_SYLLABUS_REQUEST,
    GET_LIST_SYLLABUS_RESET,
    GET_LIST_SYLLABUS_SUCCESS,
  } from "./SyllabusConstants";
  
  export const getAllSyllabusStudentReducer = (state = {}, action) => {
    switch (action.type) {
      case GET_ALL_SYLLABUS_STUDENT_REQUEST:
        return { loading: true };
      case GET_ALL_SYLLABUS_STUDENT_SUCCESS:
        return { loading: false, allSyllabus: action.payload };
      case GET_ALL_SYLLABUS_STUDENT_FAIL:
        return { loading: false, error: action.payload };
      case GET_ALL_SYLLABUS_STUDENT_RESET:
        return {};
      default:
        return state;
    }
  };
  