import {
  DOWNLOAD_NEW_SOURCES_STUDENT_FAIL,
  DOWNLOAD_NEW_SOURCES_STUDENT_REQUEST,
  DOWNLOAD_NEW_SOURCES_STUDENT_RESET,
  DOWNLOAD_NEW_SOURCES_STUDENT_SUCCESS,
  GET_ALL_NEW_SOURCES_STUDENT_FAIL,
  GET_ALL_NEW_SOURCES_STUDENT_REQUEST,
  GET_ALL_NEW_SOURCES_STUDENT_RESET,
  GET_ALL_NEW_SOURCES_STUDENT_SUCCESS,
  GET_NEW_SOURCES_STUDENT_LIST_FAIL,
  GET_NEW_SOURCES_STUDENT_LIST_REQUEST,
  GET_NEW_SOURCES_STUDENT_LIST_RESET,
  GET_NEW_SOURCES_STUDENT_LIST_SUCCESS,
} from "./NewResourcesStudentConstant";

export const getAllNewResourcesStudentReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_NEW_SOURCES_STUDENT_REQUEST:
      return { loading: true };
    case GET_ALL_NEW_SOURCES_STUDENT_SUCCESS:
      return { loading: false, newResourcesStudent: action.payload };
    case GET_ALL_NEW_SOURCES_STUDENT_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_NEW_SOURCES_STUDENT_RESET:
      return {};
    default:
      return state;
  }
};

export const getNewResourcesStudentListReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_NEW_SOURCES_STUDENT_LIST_REQUEST:
      return { loading: true };
    case GET_NEW_SOURCES_STUDENT_LIST_SUCCESS:
      return { loading: false, newResourcesStudentList: action.payload };
    case GET_NEW_SOURCES_STUDENT_LIST_FAIL:
      return { loading: false, error: action.payload };
      case GET_NEW_SOURCES_STUDENT_LIST_RESET:
        return {};
    default:
      return state;
  }
};

export const downloadNewResourcesStudentReducer = (state = {}, action) => {
  switch (action.type) {
    case DOWNLOAD_NEW_SOURCES_STUDENT_REQUEST:
      return { loading: true };
    case DOWNLOAD_NEW_SOURCES_STUDENT_SUCCESS:
      return { loading: false, success: true};
    case DOWNLOAD_NEW_SOURCES_STUDENT_FAIL:
      return { loading: false, error: action.payload };
    case DOWNLOAD_NEW_SOURCES_STUDENT_RESET:
      return {};
    default:
      return state;
  }
};
