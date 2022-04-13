import { GET_ALL_CONTACTADDRESS_STUDENT_FAIL,
  GET_ALL_CONTACTADDRESS_STUDENT_REQUEST,
   GET_ALL_CONTACTADDRESS_STUDENT_RESET,
    GET_ALL_CONTACTADDRESS_STUDENT_SUCCESS, 
    GET_SINGLE_CONTACTADDRESS_STUDENT_FAIL, 
    GET_SINGLE_CONTACTADDRESS_STUDENT_REQUEST,
    GET_SINGLE_CONTACTADDRESS_STUDENT_RESET,
    GET_SINGLE_CONTACTADDRESS_STUDENT_SUCCESS,
    UPDATE_SINGLE_CONTACTADDRESS_STUDENT_FAIL,
    UPDATE_SINGLE_CONTACTADDRESS_STUDENT_REQUEST,
    UPDATE_SINGLE_CONTACTADDRESS_STUDENT_RESET,
    UPDATE_SINGLE_CONTACTADDRESS_STUDENT_SUCCESS} from "./ContactAddressConstants";

export const getAllContactAddressStudent = (state = {}, action) => {
 switch (action.type) {
   case GET_ALL_CONTACTADDRESS_STUDENT_REQUEST:
     return { loading: true };
   case GET_ALL_CONTACTADDRESS_STUDENT_SUCCESS:
     return { loading: false, getAllContactAddressStudent: action.payload };
   case GET_ALL_CONTACTADDRESS_STUDENT_FAIL:
     return { loading: false, error: action.payload };
   case GET_ALL_CONTACTADDRESS_STUDENT_RESET:
     return {};
   default:
     return state;
 }
};

export const getSingleContactAddressStudentReducer = (state = {}, action) => {
 switch (action.type) {
   case GET_SINGLE_CONTACTADDRESS_STUDENT_REQUEST:
     return { loading: true };
   case GET_SINGLE_CONTACTADDRESS_STUDENT_SUCCESS:
     return { loading: false, singleContactAddress: action.payload };
   case GET_SINGLE_CONTACTADDRESS_STUDENT_FAIL:
     return { loading: false, error: action.payload };
   case GET_SINGLE_CONTACTADDRESS_STUDENT_RESET:
     return {};
   default:
     return state;
 }
};

export const updateSingleContactAddressStudentReducer = (state = {}, action) => {
 switch (action.type) {
   case UPDATE_SINGLE_CONTACTADDRESS_STUDENT_REQUEST:
     return { loading: true };
   case UPDATE_SINGLE_CONTACTADDRESS_STUDENT_SUCCESS:
     return { loading: false, updatedContactAddress: action.payload, success: true };
   case UPDATE_SINGLE_CONTACTADDRESS_STUDENT_FAIL:
     return { loading: false, error: action.payload };
   case UPDATE_SINGLE_CONTACTADDRESS_STUDENT_RESET:
     return {};
   default:
     return state;
 }
};