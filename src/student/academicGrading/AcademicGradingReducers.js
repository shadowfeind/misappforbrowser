import { TrafficRounded } from "@material-ui/icons";
import {
  STUDENT_GET_ALL_ACADEMIC_GRADING_REQUEST,
  STUDENT_GET_ALL_ACADEMIC_GRADING_SUCCESS,
  STUDENT_GET_ALL_ACADEMIC_GRADING_FAIL,
  STUDENT_GET_SINGLE_ACADEMIC_GRADING_REQUEST,
  STUDENT_GET_SINGLE_ACADEMIC_GRADING_SUCCESS,
  STUDENT_GET_SINGLE_ACADEMIC_GRADING_FAIL,
  STUDENT_GET_SINGLE_ACADEMIC_GRADING_RESET,
  STUDENT_CREATE_ACADEMIC_GRADING_REQUEST,
  STUDENT_CREATE_ACADEMIC_GRADING_SUCCESS,
  STUDENT_CREATE_ACADEMIC_GRADING_FAIL,
  STUDENT_CREATE_ACADEMIC_GRADING_RESET,
  STUDENT_GET_SINGLE_ACADEMIC_GRADING_EDIT_REQUEST,
  STUDENT_GET_SINGLE_ACADEMIC_GRADING_EDIT_SUCCESS,
  STUDENT_GET_SINGLE_ACADEMIC_GRADING_EDIT_FAIL,
  STUDENT_GET_SINGLE_ACADEMIC_GRADING_EDIT_RESET,
  STUDENT_UPDATE_SINGLE_ACADEMIC_GRADING_REQUEST,
  STUDENT_UPDATE_SINGLE_ACADEMIC_GRADING_SUCCESS,
  STUDENT_UPDATE_SINGLE_ACADEMIC_GRADING_FAIL,
  UPDATE_SINGLE_ACADEMIC_GADING_RESET,
  STUDENT_GET_ALL_ACADEMIC_GRADING_RESET,
} from "./AcademicGradingConstants";

export const studentGetAllAcademicGradingReducer = (state = {}, action) => {
  switch (action.type) {
    case STUDENT_GET_ALL_ACADEMIC_GRADING_REQUEST:
      return { loading: true };
    case STUDENT_GET_ALL_ACADEMIC_GRADING_SUCCESS:
      return { loading: false, academicGrading: action.payload };
    case STUDENT_GET_ALL_ACADEMIC_GRADING_FAIL:
      return { loading: false, error: action.payload };
    case STUDENT_GET_ALL_ACADEMIC_GRADING_RESET:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const studentGetSingleAcademicGradingReducer = (state = {}, action) => {
  switch (action.type) {
    case STUDENT_GET_SINGLE_ACADEMIC_GRADING_REQUEST:
      return { loading: true };
    case STUDENT_GET_SINGLE_ACADEMIC_GRADING_SUCCESS:
      return { loading: false, academicGrading: action.payload, success: true };
    case STUDENT_GET_SINGLE_ACADEMIC_GRADING_FAIL:
      return { loading: false, error: action.payload };
    case STUDENT_GET_SINGLE_ACADEMIC_GRADING_RESET:
      return {};
    default:
      return state;
  }
};

export const studentCreateAcademicGradingReducer = (state = {}, action) => {
  switch (action.type) {
    case STUDENT_CREATE_ACADEMIC_GRADING_REQUEST:
      return { loading: true };
    case STUDENT_CREATE_ACADEMIC_GRADING_SUCCESS:
      return { loading: false, academicGrading: action.payload, success: true };
    case STUDENT_CREATE_ACADEMIC_GRADING_FAIL:
      return { loading: false, error: action.payload };
    case STUDENT_CREATE_ACADEMIC_GRADING_RESET:
      return {};
    default:
      return state;
  }
};

export const studentGetSingleAcademicGradingforEditReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case STUDENT_GET_SINGLE_ACADEMIC_GRADING_EDIT_REQUEST:
      return { loading: false };
    case STUDENT_GET_SINGLE_ACADEMIC_GRADING_EDIT_SUCCESS:
      return { loading: false, academicGradingEdit: action.payload };
    case STUDENT_GET_SINGLE_ACADEMIC_GRADING_EDIT_FAIL:
      return { loading: false, error: action.payload };
    case STUDENT_GET_SINGLE_ACADEMIC_GRADING_EDIT_RESET:
      return {};
    default:
      return state;
  }
};

export const studentUpdateSingleAcademicGradingReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case STUDENT_UPDATE_SINGLE_ACADEMIC_GRADING_REQUEST:
      return { loading: true };
    case STUDENT_UPDATE_SINGLE_ACADEMIC_GRADING_SUCCESS:
      return {
        loading: false,
        updateAcademicGrading: action.payload,
        success: true,
      };
    case STUDENT_UPDATE_SINGLE_ACADEMIC_GRADING_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_SINGLE_ACADEMIC_GADING_RESET:
      return {};
    default:
      return state;
  }
};
