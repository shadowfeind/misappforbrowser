import {
  GET_HEADER_CONTENT_FAIL,
  GET_HEADER_CONTENT_REQUEST,
  GET_HEADER_CONTENT_RESET,
  GET_HEADER_CONTENT_SUCCESS,
  GET_STUDENT_DASHBOARD_FAIL,
  GET_STUDENT_DASHBOARD_REQUEST,
  GET_STUDENT_DASHBOARD_RESET,
  GET_STUDENT_DASHBOARD_SUCCESS,
} from "./DashboardConstants";

export const getHeaderContentReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_HEADER_CONTENT_REQUEST:
      return { loading: true };
    case GET_HEADER_CONTENT_SUCCESS:
      return { loading: false, headerContent: action.payload };
    case GET_HEADER_CONTENT_FAIL:
      return { loading: false, error: action.payload };
    case GET_HEADER_CONTENT_RESET:
      return {};
    default:
      return state;
  }
};

export const getDashboardContentStudentReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_STUDENT_DASHBOARD_REQUEST:
      return { loading: true };
    case GET_STUDENT_DASHBOARD_SUCCESS:
      return { loading: false, dashboardContent: action.payload };
    case GET_STUDENT_DASHBOARD_FAIL:
      return { loading: false, error: action.payload };
    case GET_STUDENT_DASHBOARD_RESET:
      return {};
    default:
      return state;
  }
};
