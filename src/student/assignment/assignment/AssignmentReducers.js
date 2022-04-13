import {
  DOWNLOAD_ASSIGNMENT_STUDENT_FAIL,
  DOWNLOAD_ASSIGNMENT_STUDENT_REQUEST,
  DOWNLOAD_ASSIGNMENT_STUDENT_RESET,
  DOWNLOAD_ASSIGNMENT_STUDENT_SUCCESS,
  DOWNLOAD_SUBMITTED_ASSIGNMENT_STUDENT_FAIL,
  DOWNLOAD_SUBMITTED_ASSIGNMENT_STUDENT_REQUEST,
  DOWNLOAD_SUBMITTED_ASSIGNMENT_STUDENT_RESET,
  DOWNLOAD_SUBMITTED_ASSIGNMENT_STUDENT_SUCCESS,
  GET_ALL_ASSIGNMENT_STUDENT_FAIL,
  GET_ALL_ASSIGNMENT_STUDENT_REQUEST,
  GET_ALL_ASSIGNMENT_STUDENT_RESET,
  GET_ALL_ASSIGNMENT_STUDENT_SUCCESS,
  GET_ASSIGNMENT_LIST_STUDENT_FAIL,
  GET_ASSIGNMENT_LIST_STUDENT_REQUEST,
  GET_ASSIGNMENT_LIST_STUDENT_RESET,
  GET_ASSIGNMENT_LIST_STUDENT_SUCCESS,
  GET_SINGLE_ASSIGNMENT_STUDENT_FAIL,
  GET_SINGLE_ASSIGNMENT_STUDENT_REQUEST,
  GET_SINGLE_ASSIGNMENT_STUDENT_RESET,
  GET_SINGLE_ASSIGNMENT_STUDENT_SUCCESS,
  PUT_SINGLE_ASSIGNMENT_STUDENT_FAIL,
  PUT_SINGLE_ASSIGNMENT_STUDENT_REQUEST,
  PUT_SINGLE_ASSIGNMENT_STUDENT_RESET,
  PUT_SINGLE_ASSIGNMENT_STUDENT_SUCCESS,
} from "./AssignmentConstant";

export const getAllAssignmentStudentReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_ASSIGNMENT_STUDENT_REQUEST:
      return { loading: true };
    case GET_ALL_ASSIGNMENT_STUDENT_SUCCESS:
      return { loading: false, assignment: action.payload };
    case GET_ALL_ASSIGNMENT_STUDENT_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_ASSIGNMENT_STUDENT_RESET:
      return {};
    default:
      return state;
  }
};

export const getAssignmentListStudentReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ASSIGNMENT_LIST_STUDENT_REQUEST:
      return { loading: true };
    case GET_ASSIGNMENT_LIST_STUDENT_SUCCESS:
      return { loading: false, assignmentList: action.payload };
    case GET_ASSIGNMENT_LIST_STUDENT_FAIL:
      return { loading: false, error: action.payload };
    case GET_ASSIGNMENT_LIST_STUDENT_RESET:
      return {};
    default:
      return state;
  }
};

export const getSingleAssignmentStudentReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_ASSIGNMENT_STUDENT_REQUEST:
      return { loading: true };
    case GET_SINGLE_ASSIGNMENT_STUDENT_SUCCESS:
      return { loading: false, singleAssignment: action.payload };
    case GET_SINGLE_ASSIGNMENT_STUDENT_FAIL:
      return { loading: false, error: action.payload };
    case GET_SINGLE_ASSIGNMENT_STUDENT_RESET:
      return {};
    default:
      return state;
  }
};

export const putSingleAssignmentStudentReducer = (state = {}, action) => {
  switch (action.type) {
    case PUT_SINGLE_ASSIGNMENT_STUDENT_REQUEST:
      return { loading: true };
    case PUT_SINGLE_ASSIGNMENT_STUDENT_SUCCESS:
      return { loading: false, success: true };
    case PUT_SINGLE_ASSIGNMENT_STUDENT_FAIL:
      return { loading: false, error: action.payload };
    case PUT_SINGLE_ASSIGNMENT_STUDENT_RESET:
      return {};
    default:
      return state;
  }
};

export const downloadAssignmentStudentReducer = (state = {}, action) => {
  switch (action.type) {
    case DOWNLOAD_ASSIGNMENT_STUDENT_REQUEST:
      return { loading: true };
    case DOWNLOAD_ASSIGNMENT_STUDENT_SUCCESS:
      return { loading: false, success: true, file: action.payload };
    case DOWNLOAD_ASSIGNMENT_STUDENT_FAIL:
      return { loading: false, error: action.payload };
    case DOWNLOAD_ASSIGNMENT_STUDENT_RESET:
      return {};
    default:
      return state;
  }
};

export const downloadSubmittedAssignmentStudentReducer = (state = {}, action) => {
  switch (action.type) {
    case DOWNLOAD_SUBMITTED_ASSIGNMENT_STUDENT_REQUEST:
      return { loading: true };
    case DOWNLOAD_SUBMITTED_ASSIGNMENT_STUDENT_SUCCESS:
      return { loading: false, success: true, file: action.payload };
    case DOWNLOAD_SUBMITTED_ASSIGNMENT_STUDENT_FAIL:
      return { loading: false, error: action.payload };
    case DOWNLOAD_SUBMITTED_ASSIGNMENT_STUDENT_RESET:
      return {};
    default:
      return state;
  }
};
