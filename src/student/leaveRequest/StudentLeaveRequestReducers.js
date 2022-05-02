import { API_URL, tokenConfig } from "../../constants";
import {
  STUDENT_DELETE_LEAVE_REQUESTS_FAIL,
  STUDENT_DELETE_LEAVE_REQUESTS_REQUEST,
  STUDENT_DELETE_LEAVE_REQUESTS_RESET,
  STUDENT_DELETE_LEAVE_REQUESTS_SUCCESS,
  STUDENT_DOWNLOAD_DOC_LEAVE_REQUESTS_FAIL,
  STUDENT_DOWNLOAD_DOC_LEAVE_REQUESTS_REQUEST,
  STUDENT_DOWNLOAD_DOC_LEAVE_REQUESTS_RESET,
  STUDENT_DOWNLOAD_DOC_LEAVE_REQUESTS_SUCCESS,
  STUDENT_GET_ALL_LEAVE_REQUESTS_FAIL,
  STUDENT_GET_ALL_LEAVE_REQUESTS_REQUEST,
  STUDENT_GET_ALL_LEAVE_REQUESTS_RESET,
  STUDENT_GET_ALL_LEAVE_REQUESTS_SUCCESS,
  STUDENT_GET_LIST_LEAVE_REQUESTS_FAIL,
  STUDENT_GET_LIST_LEAVE_REQUESTS_REQUEST,
  STUDENT_GET_LIST_LEAVE_REQUESTS_RESET,
  STUDENT_GET_LIST_LEAVE_REQUESTS_SUCCESS,
  STUDENT_GET_SINGLE_TO_CREATE_LEAVE_REQUESTS_FAIL,
  STUDENT_GET_SINGLE_TO_CREATE_LEAVE_REQUESTS_REQUEST,
  STUDENT_GET_SINGLE_TO_CREATE_LEAVE_REQUESTS_RESET,
  STUDENT_GET_SINGLE_TO_CREATE_LEAVE_REQUESTS_SUCCESS,
  STUDENT_GET_SINGLE_TO_DELETE_LEAVE_REQUESTS_FAIL,
  STUDENT_GET_SINGLE_TO_DELETE_LEAVE_REQUESTS_REQUEST,
  STUDENT_GET_SINGLE_TO_DELETE_LEAVE_REQUESTS_RESET,
  STUDENT_GET_SINGLE_TO_DELETE_LEAVE_REQUESTS_SUCCESS,
  STUDENT_GET_SINGLE_TO_EDIT_LEAVE_REQUESTS_FAIL,
  STUDENT_GET_SINGLE_TO_EDIT_LEAVE_REQUESTS_REQUEST,
  STUDENT_GET_SINGLE_TO_EDIT_LEAVE_REQUESTS_RESET,
  STUDENT_GET_SINGLE_TO_EDIT_LEAVE_REQUESTS_SUCCESS,
  STUDENT_POST_LEAVE_REQUESTS_FAIL,
  STUDENT_POST_LEAVE_REQUESTS_REQUEST,
  STUDENT_POST_LEAVE_REQUESTS_RESET,
  STUDENT_POST_LEAVE_REQUESTS_SUCCESS,
  STUDENT_PUT_LEAVE_REQUESTS_FAIL,
  STUDENT_PUT_LEAVE_REQUESTS_REQUEST,
  STUDENT_PUT_LEAVE_REQUESTS_RESET,
  STUDENT_PUT_LEAVE_REQUESTS_SUCCESS,
} from "./StudentLeaveRequestConstants";

export const studentGetAllLeaveRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case STUDENT_GET_ALL_LEAVE_REQUESTS_REQUEST:
      return { loading: true };
    case STUDENT_GET_ALL_LEAVE_REQUESTS_SUCCESS:
      return { loading: false, allLeaveRequest: action.payload };
    case STUDENT_GET_ALL_LEAVE_REQUESTS_FAIL:
      return { loading: false, error: action.payload };
    case STUDENT_GET_ALL_LEAVE_REQUESTS_RESET:
      return {};
    default:
      return state;
  }
};

export const studentGetListLeaveRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case STUDENT_GET_LIST_LEAVE_REQUESTS_REQUEST:
      return { loading: true };
    case STUDENT_GET_LIST_LEAVE_REQUESTS_SUCCESS:
      return { loading: false, listLeaveRequest: action.payload };
    case STUDENT_GET_LIST_LEAVE_REQUESTS_FAIL:
      return { loading: false, error: action.payload };
    case STUDENT_GET_LIST_LEAVE_REQUESTS_RESET:
      return {};
    default:
      return state;
  }
};

export const studentGetSingleCreateLeaveRequestReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case STUDENT_GET_SINGLE_TO_CREATE_LEAVE_REQUESTS_REQUEST:
      return { loading: true };
    case STUDENT_GET_SINGLE_TO_CREATE_LEAVE_REQUESTS_SUCCESS:
      return { loading: false, singleCreateLeaveRequest: action.payload };
    case STUDENT_GET_SINGLE_TO_CREATE_LEAVE_REQUESTS_FAIL:
      return { loading: false, error: action.payload };
    case STUDENT_GET_SINGLE_TO_CREATE_LEAVE_REQUESTS_RESET:
      return {};
    default:
      return state;
  }
};

export const studentGetSingleEditLeaveRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case STUDENT_GET_SINGLE_TO_EDIT_LEAVE_REQUESTS_REQUEST:
      return { loading: true };
    case STUDENT_GET_SINGLE_TO_EDIT_LEAVE_REQUESTS_SUCCESS:
      return { loading: false, singleEditLeaveRequest: action.payload };
    case STUDENT_GET_SINGLE_TO_EDIT_LEAVE_REQUESTS_FAIL:
      return { loading: false, error: action.payload };
    case STUDENT_GET_SINGLE_TO_EDIT_LEAVE_REQUESTS_RESET:
      return {};
    default:
      return state;
  }
};

export const studentPostLeaveRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case STUDENT_POST_LEAVE_REQUESTS_REQUEST:
      return { loading: true };
    case STUDENT_POST_LEAVE_REQUESTS_SUCCESS:
      return { loading: false, success: true };
    case STUDENT_POST_LEAVE_REQUESTS_FAIL:
      return { loading: false, error: action.payload };
    case STUDENT_POST_LEAVE_REQUESTS_RESET:
      return {};
    default:
      return state;
  }
};

export const studentPutLeaveRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case STUDENT_PUT_LEAVE_REQUESTS_REQUEST:
      return { loading: true };
    case STUDENT_PUT_LEAVE_REQUESTS_SUCCESS:
      return { loading: false, success: true };
    case STUDENT_PUT_LEAVE_REQUESTS_FAIL:
      return { loading: false, error: action.payload };
    case STUDENT_PUT_LEAVE_REQUESTS_RESET:
      return {};
    default:
      return state;
  }
};

export const studentGetSingleDeleteLeaveRequestReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case STUDENT_GET_SINGLE_TO_DELETE_LEAVE_REQUESTS_REQUEST:
      return { loading: true };
    case STUDENT_GET_SINGLE_TO_DELETE_LEAVE_REQUESTS_SUCCESS:
      return { loading: false, singleDeleteLeaveRequest: action.payload };
    case STUDENT_GET_SINGLE_TO_DELETE_LEAVE_REQUESTS_FAIL:
      return { loading: false, error: action.payload };
    case STUDENT_GET_SINGLE_TO_DELETE_LEAVE_REQUESTS_RESET:
      return {};
    default:
      return state;
  }
};

export const studentDeleteLeaveRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case STUDENT_DELETE_LEAVE_REQUESTS_REQUEST:
      return { loading: true };
    case STUDENT_DELETE_LEAVE_REQUESTS_SUCCESS:
      return { loading: false, success: true };
    case STUDENT_DELETE_LEAVE_REQUESTS_FAIL:
      return { loading: false, error: action.payload };
    case STUDENT_DELETE_LEAVE_REQUESTS_RESET:
      return {};
    default:
      return state;
  }
};

export const studentDownloadLeaveRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case STUDENT_DOWNLOAD_DOC_LEAVE_REQUESTS_REQUEST:
      return { loading: true };
    case STUDENT_DOWNLOAD_DOC_LEAVE_REQUESTS_SUCCESS:
      return { loading: false, success: true };
    case STUDENT_DOWNLOAD_DOC_LEAVE_REQUESTS_FAIL:
      return { loading: false, error: action.payload };
    case STUDENT_DOWNLOAD_DOC_LEAVE_REQUESTS_RESET:
      return {};
    default:
      return state;
  }
};
