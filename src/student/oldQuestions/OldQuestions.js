import React, { useEffect, useState } from "react";
import { makeStyles, TableBody, Grid } from "@material-ui/core";
import useCustomTable from "../../customHooks/useCustomTable";
import CustomContainer from "../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../components/Notification";
import LoadingComp from "../../components/LoadingComp";
import ConfirmDialog from "../../components/ConfirmDialog";
import SelectControl from "../../components/controls/SelectControl";
import {
  DOWNLOAD_OLD_QUESTIONS_STUDENT_RESET,
  GET_ALL_OLD_QUESTIONS_STUDENT_RESET,
  GET_LIST_OLD_QUESTIONS_STUDENT_RESET,
  GET_SUBJECT_OPTIONS_OLD_QUESTIONS_STUDENT_RESET,
} from "./OldQuestionsConstants";
import {
  getAllOldQuestionsStudentAction,
  getListOldQuestionsStudentAction,
  getSubjectOptionsForOldQuestionsStudentAction,
} from "./OldQuestionsActions";
import OldQuestionsTableCollapse from "./OldQuestionsTableCollapse";
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
  const [tableData, setTableData] = useState([]);
  const [errors, setErrors] = useState([]);

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

  const { oldQuestions, oldQuestionsError } = useSelector(
    (state) => state.getAllOldQuestionsStudent
  );
  const { subjectOptions, error: subjectOptionsError } = useSelector(
    (state) => state.getSubjectOptionsForOldQuestionsStudent
  );

  const { listOldQuestionsStudent,loading } = useSelector(
    (state) => state.getListOldQuestionsStudent
  );

  const {
    success: downloadOldQuestionsSuccess,
    file: downloadFile,
    error: downloadOldQuestionsError,
  } = useSelector((state) => state.downloadOldQuestionsStudent);

  if (downloadFile) {
    var blob = new Blob([downloadFile]);
    var url = window.URL.createObjectURL(blob);
    debugger;
    window.open(url, "_blank");
  }
  if (oldQuestionsError) {
    setNotify({
      isOpen: true,
      message: oldQuestionsError,
      type: "error",
    });
    dispatch({ type: GET_ALL_OLD_QUESTIONS_STUDENT_RESET });
  }

  if (downloadOldQuestionsError) {
    setNotify({
      isOpen: true,
      message: downloadOldQuestionsError,
      type: "error",
    });
    dispatch({ type: DOWNLOAD_OLD_QUESTIONS_STUDENT_RESET });
  }
  if (subjectOptionsError) {
    setNotify({
      isOpen: true,
      message: subjectOptionsError,
      type: "error",
    });
    dispatch({ type: GET_SUBJECT_OPTIONS_OLD_QUESTIONS_STUDENT_RESET });
  }

  const validate = () => {
    let temp = {};
    temp.classId = !classId ? "This feild is required" : "";
    temp.facultySubject = !facultySubject ? "This feild is required" : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  useEffect(() => {
    if (oldQuestions) {
      setDdlClass(oldQuestions.searchFilterModel.ddlClass);
    }
  }, [dispatch, oldQuestions]);

  useEffect(()=>{
    dispatch({type:GET_LIST_OLD_QUESTIONS_STUDENT_RESET})
    dispatch(getAllOldQuestionsStudentAction());
  },[])

  useEffect(() => {
    if (listOldQuestionsStudent) {
      setTableData(listOldQuestionsStudent.dbModelStudentLst);
    }
  }, [listOldQuestionsStudent]);

  useEffect(() => {
    if (subjectOptions) {
      setDdlFacultySubject([...subjectOptions.subject]);
    }
  }, [subjectOptions]);

  const handleClassIdChange = (value) => {
    setClassId(value);
    if (!subjectOptions) {
      dispatch(getSubjectOptionsForOldQuestionsStudentAction(value));
    }
    if (facultySubject) {
      dispatch(getListOldQuestionsStudentAction(value, facultySubject));
    }
  };

  const handleSubjectChange = (value) => {
    setFacultySubject(value);
    dispatch(getListOldQuestionsStudentAction(classId, value));
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
                errors={errors.classId}
              />
            </Grid>
            <Grid item xs={5} style={{ marginLeft: "10px" }}>
              <SelectControl
                name="subject"
                label="Subject"
                value={facultySubject}
                onChange={(e) => handleSubjectChange(e.target.value)}
                options={ddlFacultySubject}
                errors={errors.facultySubject}
              />
            </Grid>
          </Grid>
        </MobileTopSelectContainer>
        {loading ? (
          <LoadingComp />
        ) : (
          <>
        <div style={{ marginBottom: "30px" }}>
          {listOldQuestionsStudent &&
            listOldQuestionsStudent.dbModelStudentLst.map((s) => (
              <OldQuestionListCollapse item={s} key={s.$id} />
            ))}
        </div>
        {listOldQuestionsStudent?.dbModelStudentLst.length < 1 && (
          <h4 style={{ textAlign: "center", marginTop: "10px" }}>No Data</h4>
        )}
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
