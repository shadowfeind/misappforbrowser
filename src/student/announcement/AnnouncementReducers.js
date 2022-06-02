import {
  ANNOUNCEMENT_STUDENT_FCM_FAIL,
  ANNOUNCEMENT_STUDENT_FCM_REQUEST,
  ANNOUNCEMENT_STUDENT_FCM_RESET,
  ANNOUNCEMENT_STUDENT_FCM_SUCCESS,
  GET_ALL_ANNOUNCEMENT_STUDENT_FAIL,
  GET_ALL_ANNOUNCEMENT_STUDENT_REQUEST,
  GET_ALL_ANNOUNCEMENT_STUDENT_RESET,
  GET_ALL_ANNOUNCEMENT_STUDENT_SUCCESS,
  GET_LIST_ANNOUNCEMENT_STUDENT_FAIL,
  GET_LIST_ANNOUNCEMENT_STUDENT_REQUEST,
  GET_LIST_ANNOUNCEMENT_STUDENT_RESET,
  GET_LIST_ANNOUNCEMENT_STUDENT_SUCCESS,
} from "./AnnouncementConstants";

export const getAllStudentAnnouncement = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_ANNOUNCEMENT_STUDENT_REQUEST:
      return { loading: true };
    case GET_ALL_ANNOUNCEMENT_STUDENT_SUCCESS:
      return { loading: false, announcement: action.payload };
    case GET_ALL_ANNOUNCEMENT_STUDENT_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_ANNOUNCEMENT_STUDENT_RESET:
      return {};
    default:
      return state;
  }
};

export const getListStudentAnnouncement = (state = {}, action) => {
  switch (action.type) {
    case GET_LIST_ANNOUNCEMENT_STUDENT_REQUEST:
      return { loading: true };
    case GET_LIST_ANNOUNCEMENT_STUDENT_SUCCESS:
      return { loading: false, announcementList: action.payload };
    case GET_LIST_ANNOUNCEMENT_STUDENT_FAIL:
      return { loading: false, error: action.payload };
    case GET_LIST_ANNOUNCEMENT_STUDENT_RESET:
      return {};
    default:
      return state;
  }
};

export const getFCMForStudentAnnouncementReducer = (state = {}, action) => {
  switch (action.type) {
    case ANNOUNCEMENT_STUDENT_FCM_REQUEST:
      return { loading: true };
    case ANNOUNCEMENT_STUDENT_FCM_SUCCESS:
      return { loading: false, announcementFCM: action.payload };
    case ANNOUNCEMENT_STUDENT_FCM_FAIL:
      return { loading: false, error: action.payload };
    case ANNOUNCEMENT_STUDENT_FCM_RESET:
      return {};
    default:
      return state;
  }
};
