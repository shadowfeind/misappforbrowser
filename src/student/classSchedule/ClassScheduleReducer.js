import {
  GET_ALL_CLASS_SCHEDULE_STUDENT_FAIL,
  GET_ALL_CLASS_SCHEDULE_STUDENT_REQUEST,
  GET_ALL_CLASS_SCHEDULE_STUDENT_RESET,
  GET_ALL_CLASS_SCHEDULE_STUDENT_SUCCESS,
} from "./ClassScheduleConstant";

export const getAllClassScheduleStudentReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_CLASS_SCHEDULE_STUDENT_REQUEST:
      return { loading: true };
    case GET_ALL_CLASS_SCHEDULE_STUDENT_SUCCESS:
      return { loading: false, classSchedule: action.payload };
    case GET_ALL_CLASS_SCHEDULE_STUDENT_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_CLASS_SCHEDULE_STUDENT_RESET:
      return {};
    default:
      return state;
  }
};
