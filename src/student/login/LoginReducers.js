import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_LOGIN_RESET,
  GENERATE_FCM_TOKEN,
} from "./LoginConstants";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload, success: true };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGIN_RESET:
      return {};
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const getFCMTokenReducer = (state = {}, action) => {
  switch (action.type) {
    case GENERATE_FCM_TOKEN:
      return { loading: false, FCMToken: action.payload };
    default:
      return state;
  }
};
