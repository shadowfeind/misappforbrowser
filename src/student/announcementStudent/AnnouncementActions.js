import { axiosInstance ,tokenConfig} from "../../constants";
import {
  ANNOUNCEMENT_STUDENT_FCM_FAIL,
  ANNOUNCEMENT_STUDENT_FCM_REQUEST,
  ANNOUNCEMENT_STUDENT_FCM_SUCCESS,
  GET_ALL_ANNOUNCEMENT_STUDENT_FAIL,
  GET_ALL_ANNOUNCEMENT_STUDENT_REQUEST,
  GET_ALL_ANNOUNCEMENT_STUDENT_SUCCESS,
  GET_LIST_ANNOUNCEMENT_STUDENT_FAIL,
  GET_LIST_ANNOUNCEMENT_STUDENT_REQUEST,
  GET_LIST_ANNOUNCEMENT_STUDENT_SUCCESS,
} from "./AnnouncementConstants";

export const getAllStudentAnnouncementAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_ANNOUNCEMENT_STUDENT_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/Announcement/GetAllAnnouncement`,tokenConfig()
    );

    dispatch({ type: GET_ALL_ANNOUNCEMENT_STUDENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_ANNOUNCEMENT_STUDENT_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const getListStudentAnnouncementAction = (date) => async (dispatch) => {
  try {
    dispatch({ type: GET_LIST_ANNOUNCEMENT_STUDENT_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/Announcement/GetListAnnouncement?createdDate=${date}`,tokenConfig()
    );

    dispatch({ type: GET_LIST_ANNOUNCEMENT_STUDENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_LIST_ANNOUNCEMENT_STUDENT_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const getFCMForStudentAnnouncementAction = () => async (dispatch) => {
  try {
    dispatch({ type: ANNOUNCEMENT_STUDENT_FCM_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/Announcement/GetSingleCreateAnnouncement`,tokenConfig()
    );

    dispatch({ type: ANNOUNCEMENT_STUDENT_FCM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ANNOUNCEMENT_STUDENT_FCM_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};
