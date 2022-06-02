import { API_URL, axiosInstance, tokenConfig } from "../../../constants";
import {
  GET_ALL_PERSONALINFORMATION_FAIL,
  GET_ALL_PERSONALINFORMATION_REQUEST,
  GET_ALL_PERSONALINFORMATION_SUCCESS,
  GET_SINGLE_PERSONALINFORMATION_FAIL,
  GET_SINGLE_PERSONALINFORMATION_REQUEST,
  GET_SINGLE_PERSONALINFORMATION_SUCCESS,
  GET_TEACHER_RESET_PASSWORD_FAIL,
  GET_TEACHER_RESET_PASSWORD_REQUEST,
  GET_TEACHER_RESET_PASSWORD_SUCCESS,
  POST_TEACHER_PASSWORD_FAIL,
  POST_TEACHER_PASSWORD_REQUEST,
  POST_TEACHER_PASSWORD_SUCCESS,
  UPDATE_SINGLE_PERSONALINFORMATION_FAIL,
  UPDATE_SINGLE_PERSONALINFORMATION_REQUEST,
  UPDATE_SINGLE_PERSONALINFORMATION_SUCCESS,
} from "./PersonalInformationConstants";

export const getAllPersonalInformationAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_PERSONALINFORMATION_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/PID_PersonalInformation/GetAllPIDPersonalInformation?searchKey=1`,
      tokenConfig()
    );

    dispatch({ type: GET_ALL_PERSONALINFORMATION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_PERSONALINFORMATION_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const getSinglePersonalInformationAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_PERSONALINFORMATION_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/PID_PersonalInformation/GetSingleEdit?searchKey=1`,
      tokenConfig()
    );

    dispatch({ type: GET_SINGLE_PERSONALINFORMATION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_PERSONALINFORMATION_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const updateSinglePersonalInformationAction =
  (personalInformation) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_SINGLE_PERSONALINFORMATION_REQUEST });

      const jsonData = JSON.stringify({ dbModel: personalInformation });

      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };

      const { data } = await axiosInstance.put(
        `/api/PID_PersonalInformation/Put`,
        jsonData,
        tokenConfig()
      );

      dispatch({
        type: UPDATE_SINGLE_PERSONALINFORMATION_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_SINGLE_PERSONALINFORMATION_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const getTeacherResetPasswordAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_TEACHER_RESET_PASSWORD_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/AccountRemote/GetChangePassword/${id}`,
      tokenConfig()
    );

    dispatch({ type: GET_TEACHER_RESET_PASSWORD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_TEACHER_RESET_PASSWORD_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const postTeacherPasswordAction =
  (IDUser, NewPassword, ConfirmPassword) => async (dispatch) => {
    try {
      dispatch({ type: POST_TEACHER_PASSWORD_REQUEST });

      const jsonData = JSON.stringify({ IDUser: IDUser.userId, NewPassword });

      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };
      // console.log("NewPassword",NewPassword);
      // console.log("IDUser",IDUser);
      console.log(jsonData);

      const { data } = await axiosInstance.post(
        `/api/AccountRemote/Post`,
        jsonData,
        tokenConfig()
      );

      dispatch({
        type: POST_TEACHER_PASSWORD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: POST_TEACHER_PASSWORD_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };
