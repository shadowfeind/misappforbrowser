import {
  DOWNLOAD_OLD_QUESTIONS_STUDENT_FAIL,
  DOWNLOAD_OLD_QUESTIONS_STUDENT_REQUEST,
  DOWNLOAD_OLD_QUESTIONS_STUDENT_RESET,
  DOWNLOAD_OLD_QUESTIONS_STUDENT_SUCCESS,
  GET_ALL_OLD_QUESTIONS_STUDENT_FAIL,
  GET_ALL_OLD_QUESTIONS_STUDENT_REQUEST,
  GET_ALL_OLD_QUESTIONS_STUDENT_RESET,
  GET_ALL_OLD_QUESTIONS_STUDENT_SUCCESS,
  GET_LIST_OLD_QUESTIONS_STUDENT_FAIL,
  GET_LIST_OLD_QUESTIONS_STUDENT_REQUEST,
  GET_LIST_OLD_QUESTIONS_STUDENT_RESET,
  GET_LIST_OLD_QUESTIONS_STUDENT_SUCCESS,
  GET_SUBJECT_OPTIONS_OLD_QUESTIONS_STUDENT_FAIL,
  GET_SUBJECT_OPTIONS_OLD_QUESTIONS_STUDENT_REQUEST,
  GET_SUBJECT_OPTIONS_OLD_QUESTIONS_STUDENT_RESET,
  GET_SUBJECT_OPTIONS_OLD_QUESTIONS_STUDENT_SUCCESS,
} from "./OldQuestionsConstants";

export const getAllOldQuestionsStudentReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_OLD_QUESTIONS_STUDENT_REQUEST:
      return { loading: true };
    case GET_ALL_OLD_QUESTIONS_STUDENT_SUCCESS:
      return { loading: false, oldQuestions: action.payload };
    case GET_ALL_OLD_QUESTIONS_STUDENT_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_OLD_QUESTIONS_STUDENT_RESET:
      return {};
    default:
      return state;
  }
};

export const getSubjectOptionsForOldQuestionsStudentReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SUBJECT_OPTIONS_OLD_QUESTIONS_STUDENT_REQUEST:
      return { loading: true };
    case GET_SUBJECT_OPTIONS_OLD_QUESTIONS_STUDENT_SUCCESS:
      return {
        loading: false,
        subjectOptions: action.payload,
      };
    case GET_SUBJECT_OPTIONS_OLD_QUESTIONS_STUDENT_FAIL:
      return { loading: false, error: action.payload };
    case GET_SUBJECT_OPTIONS_OLD_QUESTIONS_STUDENT_RESET:
      return {};
    default:
      return state;
  }
};

export const getListOldQuestionsStudentReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_LIST_OLD_QUESTIONS_STUDENT_REQUEST:
      return { loading: true };
    case GET_LIST_OLD_QUESTIONS_STUDENT_SUCCESS:
      return { loading: false, listOldQuestionsStudent: action.payload };
    case GET_LIST_OLD_QUESTIONS_STUDENT_FAIL:
      return { loading: false, error: action.payload };
    case GET_LIST_OLD_QUESTIONS_STUDENT_RESET:
      return {};
    default:
      return state;
  }
};

export const downloadOldQuestionsStudentReducer = (state = {}, action) => {
  switch (action.type) {
    case DOWNLOAD_OLD_QUESTIONS_STUDENT_REQUEST:
      return { loading: true };
    case DOWNLOAD_OLD_QUESTIONS_STUDENT_SUCCESS:
      return { loading: false, success: true };
    case DOWNLOAD_OLD_QUESTIONS_STUDENT_FAIL:
      return { loading: false, error: action.payload };
    case DOWNLOAD_OLD_QUESTIONS_STUDENT_RESET:
      return {};
    default:
      return state;
  }
};
