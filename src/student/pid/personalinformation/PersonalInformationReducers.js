import {
  GET_ALL_PERSONALINFORMATION_FAIL,
  GET_ALL_PERSONALINFORMATION_REQUEST,
  GET_ALL_PERSONALINFORMATION_RESET,
  GET_ALL_PERSONALINFORMATION_SUCCESS,
  GET_LIST_PERSONALINFORMATION_FAIL,
  GET_LIST_PERSONALINFORMATION_REQUEST,
  GET_LIST_PERSONALINFORMATION_RESET,
  GET_LIST_PERSONALINFORMATION_SUCCESS,
  GET_SINGLE_PERSONALINFORMATION_FAIL,
  GET_SINGLE_PERSONALINFORMATION_REQUEST,
  GET_SINGLE_PERSONALINFORMATION_RESET,
  GET_SINGLE_PERSONALINFORMATION_SUCCESS,
  GET_STUDENT_RESET_PASSWORD_FAIL,
  GET_STUDENT_RESET_PASSWORD_REQUEST,
  GET_STUDENT_RESET_PASSWORD_RESET,
  GET_STUDENT_RESET_PASSWORD_SUCCESS,
  POST_STUDENT_PASSWORD_FAIL,
  POST_STUDENT_PASSWORD_REQUEST,
  POST_STUDENT_PASSWORD_RESET,
  POST_STUDENT_PASSWORD_SUCCESS,
  UPDATE_SINGLE_PERSONALINFORMATION_FAIL,
  UPDATE_SINGLE_PERSONALINFORMATION_REQUEST,
  UPDATE_SINGLE_PERSONALINFORMATION_RESET,
  UPDATE_SINGLE_PERSONALINFORMATION_SUCCESS,
} from "./PersonalInformationConstants";

export const getAllPersonalInformation = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_PERSONALINFORMATION_REQUEST:
      return { loading: true };
    case GET_ALL_PERSONALINFORMATION_SUCCESS:
      return { loading: false, getAllPersonalInformation: action.payload };
    case GET_ALL_PERSONALINFORMATION_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_PERSONALINFORMATION_RESET:
      return {};
    default:
      return state;
  }
};

export const getListPersonalInformationReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_LIST_PERSONALINFORMATION_REQUEST:
      return { loading: true };
    case GET_LIST_PERSONALINFORMATION_SUCCESS:
      return { loading: false, listPersonalInformation: action.payload };
    case GET_LIST_PERSONALINFORMATION_FAIL:
      return { loading: false, error: action.payload };
    case GET_LIST_PERSONALINFORMATION_RESET:
      return {};
    default:
      return state;
  }
};

export const getSinglePersonalInformationReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_PERSONALINFORMATION_REQUEST:
      return { loading: true };
    case GET_SINGLE_PERSONALINFORMATION_SUCCESS:
      return { loading: false, singlePersonalInformation: action.payload };
    case GET_SINGLE_PERSONALINFORMATION_FAIL:
      return { loading: false, error: action.payload };
    case GET_SINGLE_PERSONALINFORMATION_RESET:
      return {};
    default:
      return state;
  }
};

export const updateSinglePersonalInformationReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_SINGLE_PERSONALINFORMATION_REQUEST:
      return { loading: true };
    case UPDATE_SINGLE_PERSONALINFORMATION_SUCCESS:
      return {
        loading: false,
        updatedPersonalInformation: action.payload,
        success: true,
      };
    case UPDATE_SINGLE_PERSONALINFORMATION_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_SINGLE_PERSONALINFORMATION_RESET:
      return {};
    default:
      return state;
  }
};

export const getStudentResetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_STUDENT_RESET_PASSWORD_REQUEST:
      return { loading: true };
    case GET_STUDENT_RESET_PASSWORD_SUCCESS:
      return {
        loading: false,
        getStudentResetPassword: action.payload,
      };
    case GET_STUDENT_RESET_PASSWORD_FAIL:
      return { loading: false, error: action.payload };
    case GET_STUDENT_RESET_PASSWORD_RESET:
      return {};
    default:
      return state;
  }
};

export const postStudentPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_STUDENT_PASSWORD_REQUEST:
      return { loading: true };
    case POST_STUDENT_PASSWORD_SUCCESS:
      return { loading: false, success: true };
    case POST_STUDENT_PASSWORD_FAIL:
      return { loading: false, error: action.payload };
    case POST_STUDENT_PASSWORD_RESET:
      return {};
    default:
      return state;
  }
};
