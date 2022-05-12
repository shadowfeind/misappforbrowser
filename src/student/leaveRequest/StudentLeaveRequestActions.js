import { API_URL, axiosInstance, tokenHeader } from "../../constants";
import {
  STUDENT_DELETE_LEAVE_REQUESTS_FAIL,
  STUDENT_DELETE_LEAVE_REQUESTS_REQUEST,
  STUDENT_DELETE_LEAVE_REQUESTS_SUCCESS,
  STUDENT_DOWNLOAD_DOC_LEAVE_REQUESTS_FAIL,
  STUDENT_DOWNLOAD_DOC_LEAVE_REQUESTS_REQUEST,
  STUDENT_DOWNLOAD_DOC_LEAVE_REQUESTS_SUCCESS,
  STUDENT_GET_ALL_LEAVE_REQUESTS_FAIL,
  STUDENT_GET_ALL_LEAVE_REQUESTS_REQUEST,
  STUDENT_GET_ALL_LEAVE_REQUESTS_SUCCESS,
  STUDENT_GET_LIST_LEAVE_REQUESTS_FAIL,
  STUDENT_GET_LIST_LEAVE_REQUESTS_REQUEST,
  STUDENT_GET_LIST_LEAVE_REQUESTS_SUCCESS,
  STUDENT_GET_SINGLE_TO_CREATE_LEAVE_REQUESTS_FAIL,
  STUDENT_GET_SINGLE_TO_CREATE_LEAVE_REQUESTS_REQUEST,
  STUDENT_GET_SINGLE_TO_CREATE_LEAVE_REQUESTS_SUCCESS,
  STUDENT_GET_SINGLE_TO_DELETE_LEAVE_REQUESTS_FAIL,
  STUDENT_GET_SINGLE_TO_DELETE_LEAVE_REQUESTS_REQUEST,
  STUDENT_GET_SINGLE_TO_DELETE_LEAVE_REQUESTS_SUCCESS,
  STUDENT_GET_SINGLE_TO_EDIT_LEAVE_REQUESTS_FAIL,
  STUDENT_GET_SINGLE_TO_EDIT_LEAVE_REQUESTS_REQUEST,
  STUDENT_GET_SINGLE_TO_EDIT_LEAVE_REQUESTS_SUCCESS,
  STUDENT_POST_LEAVE_REQUESTS_FAIL,
  STUDENT_POST_LEAVE_REQUESTS_REQUEST,
  STUDENT_POST_LEAVE_REQUESTS_SUCCESS,
  STUDENT_PUT_LEAVE_REQUESTS_FAIL,
  STUDENT_PUT_LEAVE_REQUESTS_REQUEST,
  STUDENT_PUT_LEAVE_REQUESTS_SUCCESS,
} from "./StudentLeaveRequestConstants";

export const studentGetAllLeaveRequestAction = () => async (dispatch) => {
  try {
    dispatch({ type: STUDENT_GET_ALL_LEAVE_REQUESTS_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/LeaveRequest/GetAllLeaveRequest
        `
    );

    dispatch({ type: STUDENT_GET_ALL_LEAVE_REQUESTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: STUDENT_GET_ALL_LEAVE_REQUESTS_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const studentGetListLeaveRequestAction = () => async (dispatch) => {
  try {
    dispatch({ type: STUDENT_GET_LIST_LEAVE_REQUESTS_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/LeaveRequest/GetListLeaveRequest
        `
    );

    dispatch({ type: STUDENT_GET_LIST_LEAVE_REQUESTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: STUDENT_GET_LIST_LEAVE_REQUESTS_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const studentGetSingleCreateLeaveRequestAction =
  () => async (dispatch) => {
    try {
      dispatch({ type: STUDENT_GET_SINGLE_TO_CREATE_LEAVE_REQUESTS_REQUEST });

      const { data } = await axiosInstance.get(
        `/api/LeaveRequest/GetSingleToCreateLeaveRequest
        `
      );

      dispatch({
        type: STUDENT_GET_SINGLE_TO_CREATE_LEAVE_REQUESTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: STUDENT_GET_SINGLE_TO_CREATE_LEAVE_REQUESTS_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const studentGetSingleEditLeaveRequestAction =
  (id) => async (dispatch) => {
    try {
      dispatch({ type: STUDENT_GET_SINGLE_TO_EDIT_LEAVE_REQUESTS_REQUEST });

      const { data } = await axiosInstance.get(
        `/api/LeaveRequest/GetSingleToEditLeaveRequest/${id}
        `
      );

      dispatch({
        type: STUDENT_GET_SINGLE_TO_EDIT_LEAVE_REQUESTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: STUDENT_GET_SINGLE_TO_EDIT_LEAVE_REQUESTS_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const studentPostLeaveRequestAction =
  (leaveRequestPost, image, SchoolShortName) => async (dispatch) => {
    try {
      dispatch({ type: STUDENT_POST_LEAVE_REQUESTS_REQUEST });

      const { data } = await axiosInstance.get(
        `/api/LeaveRequest/GetFCMToken/${leaveRequestPost.ReceiverID}`
      );
      if (data) {
        const fcmBody = {
          registration_ids: [data.Message],
          collapse_key: "type_a",
          notification: {
            body: leaveRequestPost.LeaveDecription?.slice(0, 25),
            title: SchoolShortName,
          },
        };
        const fbody = JSON.stringify(fcmBody);

        await axiosInstance.post(
          "https://fcm.googleapis.com/fcm/send",
          fbody,
          tokenHeader
        );
      }

      if (image) {
        let formData = new FormData();
        formData.append("ImageUploaded", image);

        const { data } = await axiosInstance.post(
          `/api/LeaveRequest/FileUpload`,
          formData
        );
        if (data) {
          const newData = { ...leaveRequestPost, DocumentName: data };
          const jsonData = JSON.stringify({ dbModel: newData });

          await axiosInstance.post(
            `/api/LeaveRequest/PostLeaveRequest`,
            jsonData
          );
        }
      } else {
        const newData = { ...leaveRequestPost };
        const jsonData = JSON.stringify({ dbModel: newData });

        await axiosInstance.post(
          `/api/LeaveRequest/PostLeaveRequest`,
          jsonData
        );
      }

      dispatch({ type: STUDENT_POST_LEAVE_REQUESTS_SUCCESS });
    } catch (error) {
      dispatch({
        type: STUDENT_POST_LEAVE_REQUESTS_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const studentPutLeaveRequestAction =
  (leaveRequest, image) => async (dispatch) => {
    try {
      dispatch({ type: STUDENT_PUT_LEAVE_REQUESTS_REQUEST });

      if (image) {
        let formData = new FormData();
        formData.append("ImageUploaded", image);

        const { data } = await axiosInstance.post(
          `/api/LeaveRequest/FileUpload`,
          formData
        );
        if (data) {
          const newData = { ...leaveRequest, DocumentName: data };
          const jsonData = JSON.stringify({ dbModel: newData });

          await axiosInstance.put(
            `/api/LeaveRequest/PutLeaveRequest`,
            jsonData
          );
        }
      } else {
        const newData = { ...leaveRequest };
        const jsonData = JSON.stringify({ dbModel: newData });

        await axiosInstance.put(`/api/LeaveRequest/PutLeaveRequest`, jsonData);
      }
      dispatch({ type: STUDENT_PUT_LEAVE_REQUESTS_SUCCESS });
    } catch (error) {
      dispatch({
        type: STUDENT_PUT_LEAVE_REQUESTS_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const studentGetSingleDeleteLeaveRequestAction =
  (id) => async (dispatch) => {
    try {
      dispatch({ type: STUDENT_GET_SINGLE_TO_DELETE_LEAVE_REQUESTS_REQUEST });

      const { data } = await axiosInstance.get(
        `/api/LeaveRequest/GetSingleToDeleteLeaveRequest/${id}
          `
      );

      dispatch({
        type: STUDENT_GET_SINGLE_TO_DELETE_LEAVE_REQUESTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: STUDENT_GET_SINGLE_TO_DELETE_LEAVE_REQUESTS_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const studentDeleteLeaveRequestAction =
  (leaveRequest) => async (dispatch) => {
    try {
      dispatch({ type: STUDENT_DELETE_LEAVE_REQUESTS_REQUEST });

      const jsonData = JSON.stringify({ dbModel: leaveRequest });

      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };

      const { data } = await axiosInstance.post(
        `/api/LeaveRequest/DeleteLeaveRequest`,
        jsonData
      );

      dispatch({ type: STUDENT_DELETE_LEAVE_REQUESTS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: STUDENT_DELETE_LEAVE_REQUESTS_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const studentDownloadLeaveRequestAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: STUDENT_DOWNLOAD_DOC_LEAVE_REQUESTS_REQUEST });

    const File = `/api/LeaveRequest/DownloadDoc/${id}`;

    window.open(File, "_blank");

    dispatch({
      type: STUDENT_DOWNLOAD_DOC_LEAVE_REQUESTS_SUCCESS,
      payload: File,
    });
  } catch (error) {
    dispatch({
      type: STUDENT_DOWNLOAD_DOC_LEAVE_REQUESTS_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};
