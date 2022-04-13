import axios from "axios";
import { API_URL, tokenConfig } from "../../../constants";
import { GET_ALL_CONTACTADDRESS_STUDENT_FAIL,
     GET_ALL_CONTACTADDRESS_STUDENT_REQUEST,
      GET_ALL_CONTACTADDRESS_STUDENT_SUCCESS, 
      GET_SINGLE_CONTACTADDRESS_STUDENT_FAIL, 
      GET_SINGLE_CONTACTADDRESS_STUDENT_REQUEST,
      GET_SINGLE_CONTACTADDRESS_STUDENT_SUCCESS,
      UPDATE_SINGLE_CONTACTADDRESS_STUDENT_FAIL,
      UPDATE_SINGLE_CONTACTADDRESS_STUDENT_REQUEST,
      UPDATE_SINGLE_CONTACTADDRESS_STUDENT_SUCCESS} from "./ContactAddressConstants";

export const getAllContactAddressStudentAction = () => async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_CONTACTADDRESS_STUDENT_REQUEST });
  
      const { data } = await axios.get(`${API_URL}/api/PID_Address/GetAllPIDAddress`,tokenConfig)
  
      dispatch({ type: GET_ALL_CONTACTADDRESS_STUDENT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_ALL_CONTACTADDRESS_STUDENT_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

  export const getSingleContactAddressStudentAction = () => async (dispatch) => {
    try {
      dispatch({ type: GET_SINGLE_CONTACTADDRESS_STUDENT_REQUEST });
  
      const { data } = await axios.get(
        `${API_URL}/api/PID_Address/GetSingleEdit`,tokenConfig
      );
  
      dispatch({ type: GET_SINGLE_CONTACTADDRESS_STUDENT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_SINGLE_CONTACTADDRESS_STUDENT_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };
  

  export const updateSingleContactAddressStudentAction = (contact) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_SINGLE_CONTACTADDRESS_STUDENT_REQUEST });
  
      const jsonData = JSON.stringify({ dbModel: contact });
  
      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };
  
      const { data } = await axios.put(
        `${API_URL}/api/PID_Address/Put`,
        jsonData,
        tokenConfig
      );
  
      dispatch({ type: UPDATE_SINGLE_CONTACTADDRESS_STUDENT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPDATE_SINGLE_CONTACTADDRESS_STUDENT_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };