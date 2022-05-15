import React, { useEffect, useState } from "react";
import { makeStyles, Grid } from "@material-ui/core";
import CustomContainer from "../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../components/Notification";
import LoadingComp from "../../components/LoadingComp";
import ConfirmDialog from "../../components/ConfirmDialog";
import MobileBody from "../../components/MobileBody";
import SelectControl from "../../components/controls/SelectControl";
import {
  DOWNLOAD_OLD_QUESTIONS_RESET,
  GET_ALL_OLD_QUESTIONS_TEACHER_RESET,
  GET_LIST_OLD_QUESTIONS_TEACHER_RESET,
} from "./OldQuestionsConstants";
import {
  getAllOldQuestionsTeacherAction,
  getListOldQuestionsTeacherAction,
  getSubjectOldQuestionsAction,
} from "./OldQuestionsActions";
import OldQuestionsTeacherTableCollapse from "./OldQuestionsTableCollapse";
import MobileTopSelectContainer from "../../components/MobileTopSelectContainer";
import OldQuestionListCollapse from "./OldQuestionListCollapse";

const useStyles = makeStyles((theme) => ({
  searchInput: {
    width: "75%",
    fontSize: "12px",
  },
  button: {
    position: "absolute",
    right: "10px",
  },
}));

const tableHeader = [
  { id: "Name", label: "Name" },
  { id: "Description", label: "Description" },
  { id: "PostedBy", label: "Posted By" },
  { id: "PostedDate", label: "Posted Date" },
  { id: "IsActive", label: "IsActive" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const OldQuestions = () => {
  const [ddlClass, setDdlClass] = useState([]);
  const [classId, setClassId] = useState("");
  const [ddlFacultySubject, setDdlFacultySubject] = useState([]);
  const [facultySubject, setFacultySubject] = useState("");

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
  const classes = useStyles();
  const dispatch = useDispatch();

  const { oldQuestionsTeacher, error: oldQuestionsTeacherError } = useSelector(
    (state) => state.getAllOldQuestionsTeacher
  );

  const { subjectOldQuestions, error: subjectOldQuestionsError } = useSelector(
    (state) => state.getSubjectOldQuestions
  );

  const { listOldQuestionsTeacher,loading } = useSelector(
    (state) => state.getListOldQuestionsTeacher
  );

  const {
    success: downloadOldQuestionsSuccess,
    file: downloadFile,
    error: downloadOldQuestionsError,
  } = useSelector((state) => state.downloadOldQuestions);

  if (downloadFile) {
    var blob = new Blob([downloadFile]);
    var url = window.URL.createObjectURL(blob);
    debugger;
    window.open(url, "_blank");
  }

  if (oldQuestionsTeacherError) {
    setNotify({
      isOpen: true,
      message: oldQuestionsTeacherError,
      type: "error",
    });
    dispatch({ type: GET_ALL_OLD_QUESTIONS_TEACHER_RESET });
  }

  if (downloadOldQuestionsError) {
    setNotify({
      isOpen: true,
      message: downloadOldQuestionsError,
      type: "error",
    });
    dispatch({ type: DOWNLOAD_OLD_QUESTIONS_RESET });
  }

  if (subjectOldQuestionsError) {
    setNotify({
      isOpen: true,
      message: subjectOldQuestionsError,
      type: "error",
    });
    dispatch({ type: GET_SUBJECT_OF_OLD_QUESTIONS_RESET });
  }

  useEffect(() => {
    if (oldQuestionsTeacher) {
      setDdlClass(oldQuestionsTeacher.searchFilterModel.ddlClass);
    }
  }, [dispatch, oldQuestionsTeacher]);

  useEffect(()=>{
    dispatch({type:GET_LIST_OLD_QUESTIONS_TEACHER_RESET})
    dispatch(getAllOldQuestionsTeacherAction());
  },[])

  useEffect(() => {
    if (subjectOldQuestions) {
      setDdlFacultySubject([...subjectOldQuestions]);
    }
  }, [subjectOldQuestions]);

  const handleClassIdChange = (value) => {
    setClassId(value);
    dispatch(getSubjectOldQuestionsAction(value));
    if (facultySubject) {
      dispatch(getListOldQuestionsTeacherAction(value, facultySubject));
    }
  };

  const handleFacultyChange = (value) => {
    setFacultySubject(value);
    if (classId) {
      dispatch(getListOldQuestionsTeacherAction(classId, value));
    }
  };
  return (
    <>
      <CustomContainer>
        <MobileTopSelectContainer>
          <h4 style={{ textAlign: "center", marginTop: "-8px" }}>
            Old Questions
          </h4>
          <Grid container style={{ fontSize: "12px" }}>
            <Grid item xs={5} style={{ marginRight: "10px" }}>
              <SelectControl
                name="classes"
                label="Class"
                onChange={(e) => handleClassIdChange(e.target.value)}
                options={ddlClass}
                value={classId}
              />
            </Grid>
            <Grid item xs={5} style={{ marginLeft: "10px" }}>
              <SelectControl
                name="subject"
                label="Subject"
                value={facultySubject}
                onChange={(e) => handleFacultyChange(e.target.value)}
                options={ddlFacultySubject}
              />
            </Grid>
          </Grid>
        </MobileTopSelectContainer>
        {loading ? (
          <LoadingComp />
        ) : (
          <>
          <MobileBody>
        {listOldQuestionsTeacher &&
          listOldQuestionsTeacher.dbModelTeacherLst.map((s) => (
            <OldQuestionListCollapse item={s} key={s.$id} />
          ))}
        {listOldQuestionsTeacher?.dbModelTeacherLst.length < 1 && (
          <h4 style={{ textAlign: "center", marginTop: "10px" }}>No Data</h4>
        )}
        </MobileBody>
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
};

export default OldQuestions;
