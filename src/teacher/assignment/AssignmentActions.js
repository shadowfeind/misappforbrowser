import { API_URL, axiosInstance, tokenConfig } from "../../constants";
import {
  DOWNLOAD_ASSIGNMENT_FAIL,
  DOWNLOAD_ASSIGNMENT_REQUEST,
  DOWNLOAD_ASSIGNMENT_SUCCESS,
  DOWNLOAD_SUBMITTED_ASSIGNMENT_FAIL,
  DOWNLOAD_SUBMITTED_ASSIGNMENT_REQUEST,
  DOWNLOAD_SUBMITTED_ASSIGNMENT_SUCCESS,
  GET_ALL_ASSIGNMENT_TEACHER_FAIL,
  GET_ALL_ASSIGNMENT_TEACHER_REQUEST,
  GET_ALL_ASSIGNMENT_TEACHER_SUCCESS,
  GET_ALL_OTHER_OPTIONS_FOR_SELECT_FAIL,
  GET_ALL_OTHER_OPTIONS_FOR_SELECT_REQUEST,
  GET_ALL_OTHER_OPTIONS_FOR_SELECT_SUCCESS,
  GET_ENGLISH_DATE_FAIL,
  GET_ENGLISH_DATE_REQUEST,
  GET_ENGLISH_DATE_SUCCESS,
  GET_LIST_TEACHER_ASSIGNMENT_FAIL,
  GET_LIST_TEACHER_ASSIGNMENT_REQUEST,
  GET_LIST_TEACHER_ASSIGNMENT_SUCCESS,
  GET_SINGLE_CREATE_TEACHER_ASSIGNMENT_FAIL,
  GET_SINGLE_CREATE_TEACHER_ASSIGNMENT_REQUEST,
  GET_SINGLE_CREATE_TEACHER_ASSIGNMENT_SUCCESS,
  GET_SINGLE_TO_EDIT_TEACHER_ASSIGNMENT_FAIL,
  GET_SINGLE_TO_EDIT_TEACHER_ASSIGNMENT_REQUEST,
  GET_SINGLE_TO_EDIT_TEACHER_ASSIGNMENT_SUCCESS,
  GET_TEACHER_ASSIGNMENT_CONTENT_FAIL,
  GET_TEACHER_ASSIGNMENT_CONTENT_REQUEST,
  GET_TEACHER_ASSIGNMENT_CONTENT_SUCCESS,
  POST_TEACHER_ASSIGNMENT_FAIL,
  POST_TEACHER_ASSIGNMENT_REQUEST,
  POST_TEACHER_ASSIGNMENT_SUCCESS,
  PUT_SINGLE_TO_EDIT_TEACHER_ASSIGNMENT_FAIL,
  PUT_SINGLE_TO_EDIT_TEACHER_ASSIGNMENT_REQUEST,
  PUT_SINGLE_TO_EDIT_TEACHER_ASSIGNMENT_SUCCESS,
} from "./AssignmentConstants";

export const getAllAssignmentTeacherAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_ASSIGNMENT_TEACHER_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/TeacherAssignment/GetAllTeacherAssignment`,
      tokenConfig()
    );

    dispatch({
      type: GET_ALL_ASSIGNMENT_TEACHER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_ASSIGNMENT_TEACHER_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const getAllOtherOptionsForSelectAction =
  (id, subject) => async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_OTHER_OPTIONS_FOR_SELECT_REQUEST });

      const year = await axiosInstance.get(
        `/api/TeacherAssignment/GetAttendanceForAcademicYear?idAcademicFacultySubjectLink=${subject}&idTeacher=${id}`,
        tokenConfig()
      );

      const program = await axiosInstance.get(
        `/api/TeacherAssignment/GetCurseDeliveryPlanForFacultyProgram?idAcademicFacultySubjectLink=${subject}&idTeacher=${id}`,
        tokenConfig()
      );

      const classId = await axiosInstance.get(
        `/api/TeacherAssignment/GetCurseDeliveryPlanForLevel?idAcademicFacultySubjectLink=${subject}&idTeacher=${id}
        `,
        tokenConfig()
      );

      const section = await axiosInstance.get(
        `/api/TeacherAssignment/GetCurseDeliveryPlanForSection?idAcademicFacultySubjectLink=${subject}&idTeacher=${id}`,
        tokenConfig()
      );

      const shift = await axiosInstance.get(
        `/api/TeacherAssignment/GetCurseDeliveryPlanForShift?idAcademicFacultySubjectLink=${subject}&idTeacher=${id}`,
        tokenConfig()
      );

      const data = {
        year: year.data,
        program: program.data,
        classId: classId.data,
        section: section.data,
        shift: shift.data,
      };

      dispatch({
        type: GET_ALL_OTHER_OPTIONS_FOR_SELECT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_OTHER_OPTIONS_FOR_SELECT_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const getListAssignmentTeacherAction =
  (year, program, classId, subject, section, shift, currentDate) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_LIST_TEACHER_ASSIGNMENT_REQUEST });

      const { data } = await axiosInstance.get(
        `/api/TeacherAssignment/GetListTeacherAssignment?idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${classId}&section=${section}&idShift=${shift}&idAcademicFacultySubjectLink=${subject}&assignmentDate=${currentDate}
        `,
        tokenConfig()
      );

      dispatch({
        type: GET_LIST_TEACHER_ASSIGNMENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_LIST_TEACHER_ASSIGNMENT_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const getEnglishDateAction = (year, month) => async (dispatch) => {
  try {
    dispatch({ type: GET_ENGLISH_DATE_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/TeacherAssignment/GetEngDate?year=${year}&month=${month}
        `,
      tokenConfig()
    );

    dispatch({
      type: GET_ENGLISH_DATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ENGLISH_DATE_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const getSingleCreateTeacherAssignmentAction =
  (year, program, classId, section, shift, subject, currentDate) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_SINGLE_CREATE_TEACHER_ASSIGNMENT_REQUEST });

      const { data } = await axiosInstance.get(
        `/api/TeacherAssignment/GetSingleToCreateTeacherAssignment?idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${classId}&section=${section}&idShift=${shift}&idAcademicFacultySubjectLink=${subject}&assignmentDate=${currentDate}`,
        tokenConfig()
      );

      dispatch({
        type: GET_SINGLE_CREATE_TEACHER_ASSIGNMENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SINGLE_CREATE_TEACHER_ASSIGNMENT_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const postTeacherAssignmentAction =
  (image, assignment, students) => async (dispatch) => {
    try {
      dispatch({ type: POST_TEACHER_ASSIGNMENT_REQUEST });
      if (image) {
        let formData = new FormData();
        formData.append("ImageUploaded", image);

        const { data: documentsName } = await axiosInstance.post(
          `/api/TeacherAssignment/FileUpload`,
          formData,
          tokenConfig()
        );

        if (documentsName) {
          const newData = {
            ...assignment,
            DocumentName: documentsName,
          };
          const jsonData = JSON.stringify({
            dbTeacherAssignmentModel: newData,
            dbModelLstForStudentSection: students,
          });

          console.log("this is jsonData", jsonData);

          await axiosInstance.post(
            `/api/TeacherAssignment/Post`,
            jsonData,
            tokenConfig()
          );
        }
      } else {
        const jsonData = JSON.stringify({
          dbTeacherAssignmentModel: assignment,
          dbModelLstForStudentSection: students,
        });
        console.log("without image", jsonData);
        await axiosInstance.post(
          `/api/TeacherAssignment/Post`,
          jsonData,
          tokenConfig()
        );
      }

      dispatch({
        type: POST_TEACHER_ASSIGNMENT_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: POST_TEACHER_ASSIGNMENT_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const getTeacherAssignmentContentAction =
  (year, program, classId, section, shift, subject) => async (dispatch) => {
    try {
      dispatch({ type: GET_TEACHER_ASSIGNMENT_CONTENT_REQUEST });

      const { data } = await axiosInstance.get(
        `/api/TeacherAssignment/GetAssignmentContent?idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${classId}&section=${section}&idShift=${shift}&idAcademicFacultySubjectLink=${subject}`,
        tokenConfig()
      );

      dispatch({
        type: GET_TEACHER_ASSIGNMENT_CONTENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_TEACHER_ASSIGNMENT_CONTENT_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getSingleToEditTeacherAssignmentAction =
  (id) => async (dispatch) => {
    try {
      dispatch({ type: GET_SINGLE_TO_EDIT_TEACHER_ASSIGNMENT_REQUEST });

      const { data } = await axiosInstance.get(
        `/api/TeacherAssignment/GetSingleToEditTeacherAssignment/${id}`,
        tokenConfig()
      );

      dispatch({
        type: GET_SINGLE_TO_EDIT_TEACHER_ASSIGNMENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SINGLE_TO_EDIT_TEACHER_ASSIGNMENT_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const putSingleToEditTeacherAssignmentAction =
  (image, singleAssignment) => async (dispatch) => {
    try {
      dispatch({ type: PUT_SINGLE_TO_EDIT_TEACHER_ASSIGNMENT_REQUEST });

      if (image) {
        let formData = new FormData();
        formData.append("ImageUploaded", image);
        // debugger;
        const { data: newImage } = await axiosInstance.post(
          `/api/TeacherAssignment/FileUpload`,
          formData,
          tokenConfig()
        );
        // debugger;
        if (newImage) {
          // debugger;
          // const newDate = singleAssignment?.AssignmentDate?.toISOString().slice(
          //   0,
          //   10
          // );
          // debugger;
          const newData = {
            ...singleAssignment,
            DocumentName: newImage,
            // AssignmentDate: newDate,
          };
          // debugger;
          const jsonData = JSON.stringify({
            dbTeacherAssignmentModel: newData,
          });
          // debugger;
          console.log(jsonData);

          const { data } = await axiosInstance.put(
            `/api/TeacherAssignment/PutTeacherAssignment`,
            jsonData,
            tokenConfig()
          );

          dispatch({
            type: PUT_SINGLE_TO_EDIT_TEACHER_ASSIGNMENT_SUCCESS,
            payload: data,
          });
        }
      } else {
        // debugger;

        // debugger;
        // const newDate = singleAssignment?.AssignmentDate?.toISOString().slice(
        //   0,
        //   10
        // );
        // debugger;
        const newData = {
          ...singleAssignment,
          // AssignmentDate: newDate,
        };
        // debugger;
        const jsonData = JSON.stringify({
          dbTeacherAssignmentModel: newData,
        });
        // debugger;
        console.log(jsonData);

        const { data } = await axiosInstance.put(
          `/api/TeacherAssignment/PutTeacherAssignment`,
          jsonData,
          tokenConfig()
        );

        dispatch({
          type: PUT_SINGLE_TO_EDIT_TEACHER_ASSIGNMENT_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: PUT_SINGLE_TO_EDIT_TEACHER_ASSIGNMENT_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const putSingleToEditTeacherAssignmentStudentAction =
  (image, singleAssignment) => async (dispatch) => {
    try {
      dispatch({ type: PUT_SINGLE_TO_EDIT_TEACHER_ASSIGNMENT_REQUEST });
      // function dataURLtoFile(dataurl, filename) {
      //   let arr = dataurl.split(","),
      //     mime = arr[0].match(/:(.*?);/)[1],
      //     bstr = atob(arr[1]),
      //     n = bstr.length,
      //     u8arr = new Uint8Array(n);

      //   while (n--) {
      //     u8arr[n] = bstr.charCodeAt(n);
      //   }

      //   return new File([u8arr], filename, { type: mime });
      // }

      // let file = dataURLtoFile(image.imageBase64, image.fullName);
      let formData = new FormData();
      formData.append("ImageUploaded", image);

      const { data: newImage } = await axiosInstance.post(
        `/api/TeacherAssignment/FileUpload`,
        formData,
        tokenConfig()
      );

      if (newImage) {
        const newData = {
          ...singleAssignment,
          DocumentSubmitted: newImage,
        };

        const jsonData = JSON.stringify({
          dbTeacherAssignmentModel: newData,
        });

        console.log(jsonData);

        const { data } = await axiosInstance.put(
          `/api/TeacherAssignment/PutTeacherAssignment`,
          jsonData,
          tokenConfig()
        );

        dispatch({
          type: PUT_SINGLE_TO_EDIT_TEACHER_ASSIGNMENT_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: PUT_SINGLE_TO_EDIT_TEACHER_ASSIGNMENT_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const downloadAssignmentAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: DOWNLOAD_ASSIGNMENT_REQUEST });

    const test = `${API_URL}/api/TeacherAssignment/DownloadTEacherAssignmentDoc/${id}`;

    window.open(test, "_blank");
    dispatch({
      type: DOWNLOAD_ASSIGNMENT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: DOWNLOAD_ASSIGNMENT_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const downloadSubmittedAssignmentAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: DOWNLOAD_SUBMITTED_ASSIGNMENT_REQUEST });

    // const test = `/api/TeacherAssignment/DownloadSubmittedDoc/${id}`;
    // console.log(test);
    // window.open(test, "_blank");
    // const { data } = await axiosInstance.get(
    //   `http://103.90.86.151:100/Upload/TeacherAssignment/38ea0eaf-9eb5-4b0b-93f8-d78ca27a897cimage.jpeg`
    // );
    // console.log(data);

    dispatch({
      type: DOWNLOAD_SUBMITTED_ASSIGNMENT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: DOWNLOAD_SUBMITTED_ASSIGNMENT_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};
