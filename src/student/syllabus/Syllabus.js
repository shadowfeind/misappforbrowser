import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConfirmDialog from "../../components/ConfirmDialog";
import Notification from "../../components/Notification";
import { API_URL } from "../../constants";
import CustomContainer from "../../components/CustomContainer";
import { Button, Toolbar } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Popup from "../../components/Popup";
import LoadingComp from "../../components/LoadingComp";
import { GET_ALL_SYLLABUS_STUDENT_RESET } from "./SyllabusConstants";
import { getAllSyllabusStudentAction } from "./SyllabusActions";


const Syllabus=()=>{

    const [url, setUrl] = useState("");
  const [openPopup, setOpenPopup] = useState(false);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const dispatch = useDispatch();

  const { allSyllabus,loading, error: allSyllabusError } = useSelector(
    (state) => state.getAllSyllabusStudent
  );

  if (allSyllabusError) {
    setNotify({
      isOpen: true,
      message: allSyllabusError,
      type: "error",
    });
    dispatch({ type: GET_ALL_SYLLABUS_STUDENT_RESET });
  }

  useEffect(() => {
    if (allSyllabus) {
        setUrl(`${API_URL}${allSyllabus.FullPath}`);
      }  
      if (!allSyllabus) {
        dispatch(getAllSyllabusStudentAction());
      }
   
  }, [allSyllabus]);
// useEffect(()=>{
//     dispatch(getAllClassScheduleStudentAction(1));
// })
return (
    <>
      <CustomContainer>
      {loading ? (
          <LoadingComp />
        ) : (
          <>
      {allSyllabus && <iframe src={url} width="100%" height="700" />}
      </>
        )}
      </CustomContainer>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
}
export default Syllabus;