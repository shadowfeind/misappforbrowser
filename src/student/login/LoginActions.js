import axios from "axios";
import { API_URL } from "../../constants";
import { GET_TEACHER_DASHBOARD_RESET } from "../../teacher/dashboard/DashboardConstants";
import {
  GET_HEADER_CONTENT_RESET,
  GET_STUDENT_DASHBOARD_RESET,
} from "../dashboard/DashboardConstants";
import {
  GENERATE_FCM_TOKEN,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from "./LoginConstants";

export const getFCMTokenAction = (token) => async (dispatch) => {
  dispatch({ type: GENERATE_FCM_TOKEN, payload: token });
};

export const login = (userName, password) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const {
      getFCMToken: { FCMToken },
    } = getState();

    console.log("this is token", FCMToken);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const jsonData = JSON.stringify({
      UserName: userName,
      Password: password,
      RememberMe: true,
      // FCMTokenValue: FCMToken,
      FCMTokenValue:
        "e9YCv_duTDWdz4R7-lfkYl:APA91bFK54UX9lghUo2-rVnfguHYm0KD2UakPJn5iFKgnkobfpXx-D5aqQJZd-jUBfG6PN_oelsmaG3bCLSxBSY35n_t3cf_ISrQrJD6ymcHZGHYzegHXipuGWzXcV9zXrHlu9GrI87u",
    });

    console.log("login", jsonData);

    const { data } = await axios.post(
      `${API_URL}/api/AccountRemote/PostLogon`,
      jsonData,
      config
    );

    localStorage.setItem("blueberryToken", JSON.stringify(data));

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    console.log(error.Message);
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.Message
          ? error.response.data.Message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("blueberryToken");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: GET_HEADER_CONTENT_RESET });
  dispatch({ type: GET_STUDENT_DASHBOARD_RESET });
  dispatch({ type: GET_TEACHER_DASHBOARD_RESET });
  window.location.href = "https://divinelight.vidyacube.com/";
  // window.location.href = "https://mis.vidyacube.com/";
};
