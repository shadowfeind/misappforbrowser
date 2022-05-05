import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { unstable_batchedUpdates } from "react-dom";
import { Button, makeStyles, Grid } from "@material-ui/core";
import Popup from "../../components/Popup";
import LoadingComp from "../../components/LoadingComp";
import CustomContainer from "../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
import SelectControl from "../../components/controls/SelectControl";
import {
  DOWNLOAD_ASSIGNMENT_RESET,
  DOWNLOAD_SUBMITTED_ASSIGNMENT_RESET,
  GET_ALL_ASSIGNMENT_TEACHER_RESET,
  GET_ALL_OTHER_OPTIONS_FOR_SELECT_RESET,
  GET_LIST_TEACHER_ASSIGNMENT_RESET,
  GET_SINGLE_CREATE_TEACHER_ASSIGNMENT_RESET,
  GET_SINGLE_TO_EDIT_TEACHER_ASSIGNMENT_RESET,
  GET_TEACHER_ASSIGNMENT_CONTENT_RESET,
  POST_TEACHER_ASSIGNMENT_RESET,
  PUT_SINGLE_TO_EDIT_TEACHER_ASSIGNMENT_RESET,
} from "./AssignmentConstants";
import {
  getAllAssignmentTeacherAction,
  getAllOtherOptionsForSelectAction,
  getListAssignmentTeacherAction,
  getSingleCreateTeacherAssignmentAction,
  getTeacherAssignmentContentAction,
} from "./AssignmentActions";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import AssignmentForm from "./AssignmentForm";
import AssignmentTableCollapseAll from "./AssignmentTableCollapseAll";
import AssignmentEditForm from "./AssignmentEditForm";
import MobileTopSelectContainer from "../../components/MobileTopSelectContainer";
import AddBoxIcon from "@material-ui/icons/AddBox";
import SearchIcon from "@material-ui/icons/Search";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import AssignmentListCollapse from "./AssignmentListCollapse";

const useStyles = makeStyles((theme) => ({
  searchInput: {
    width: "75%",
    fontSize: "12px",
  },
  button: {
    margin: "15px 10px 0 0",
    padding: "5px",
    minWidth: "10px",
    fontSize: "12px",
  },
  customInput: {
    minWidth: "200px",
  },
}));

const Assignment = () => {
  const { id: subjectIdFromDashboard } = useParams();
  const [ddlClass, setDdlClass] = useState([]);
  const [ddlShift, setDdlShift] = useState([]);
  const [ddlSection, setDdlSection] = useState([]);
  const [ddlSubject, setDdlSubject] = useState([]);
  const [programValue, setProgramValue] = useState("");
  const [classId, setClassId] = useState("");
  const [acaYear, setAcaYear] = useState("");
  const [shift, setShift] = useState("");
  const [section, setSection] = useState("");
  const [subject, setSubject] = useState("");
  const [errors, setErrors] = useState({});
  const [date, setDate] = useState();

  const dispatch = useDispatch();
  const classes = useStyles();

  const [openPopup, setOpenPopup] = useState(false);
  const [openPopup2, setOpenPopup2] = useState(false);
  const [openPopup3, setOpenPopup3] = useState(false);
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

  const test = [{ Key: "", Value: "" }];

  const { allAssignmentTeacherData, error: allAssignmentTeacherDataError } =
    useSelector((state) => state.getAllAssignmentTeacher);

  const { allOtherOptions, error: allOtherOptionsError } = useSelector(
    (state) => state.getAllOtherOptionsForAssignmentSelect
  );

  const {
    getListTeacherAssignment,
    loading,
    error: getListTeacherAssignmentError,
  } = useSelector((state) => state.getListTeacherAssignment);

  const {
    teacherAssignmentSingleCreate,
    loading: loadingCreate,
    error: teacherAssignmentSingleCreateError,
  } = useSelector((state) => state.getSingleCreateTeacherAssignment);

  const { success: postTeacherAssignment, error: postTeacherAssignmentError } =
    useSelector((state) => state.postTeacherAssignment);

  const {
    assignmentContent,
    loading: loadingTable,
    error: assignmentContentError,
  } = useSelector((state) => state.getTeacherAssignmentContent);

  const {
    singleTeacherAssignment,
    loading: loadingEdit,
    error: singleTeacherAssignmentError,
  } = useSelector((state) => state.getSingleToEditTeacherAssignment);

  const {
    success: putSingleToEditTeacherAssignmentSuccess,
    error: putSingleToEditTeacherAssignmentError,
  } = useSelector((state) => state.putSingleToEditTeacherAssignment);

  const {
    success: downloadAssignmentSuccess,
    file: downloadFile,
    error: downloadAssignmentError,
  } = useSelector((state) => state.downloadAssignment);

  const {
    success: downloadSubmittedAssignmentSuccess,
    file: downloadSubmittedFile,
    error: downloadSubmittedAssignmentError,
  } = useSelector((state) => state.downloadSubmittedAssignment);

  if (downloadFile) {
    var blob = new Blob([downloadFile]);
    var url = window.URL.createObjectURL(blob);
    window.open(url, "_blank");
  }

  if (downloadSubmittedFile) {
    var blob = new Blob([downloadSubmittedFile]);
    var url = window.URL.createObjectURL(blob);
    window.open(url, "_blank");
  }

  if (allOtherOptionsError) {
    setNotify({
      isOpen: true,
      message: allOtherOptionsError,
      type: "error",
    });
    dispatch({ type: GET_ALL_OTHER_OPTIONS_FOR_SELECT_RESET });
  }
  if (downloadAssignmentError) {
    setNotify({
      isOpen: true,
      message: downloadAssignmentError,
      type: "error",
    });
    dispatch({ type: DOWNLOAD_ASSIGNMENT_RESET });
  }

  if (downloadSubmittedAssignmentError) {
    setNotify({
      isOpen: true,
      message: downloadSubmittedAssignmentError,
      type: "error",
    });
    dispatch({ type: DOWNLOAD_SUBMITTED_ASSIGNMENT_RESET });
  }
  if (putSingleToEditTeacherAssignmentError) {
    setNotify({
      isOpen: true,
      message: putSingleToEditTeacherAssignmentError,
      type: "error",
    });
    dispatch({ type: PUT_SINGLE_TO_EDIT_TEACHER_ASSIGNMENT_RESET });
  }
  if (putSingleToEditTeacherAssignmentSuccess) {
    setNotify({
      isOpen: true,
      message: "Successfully Updated",
      type: "success",
    });
    dispatch({ type: PUT_SINGLE_TO_EDIT_TEACHER_ASSIGNMENT_RESET });
    setOpenPopup3(false);
    dispatch(
      getListAssignmentTeacherAction(
        acaYear,
        programValue,
        classId,
        subject,
        section,
        shift,
        date
      )
    );
  }
  if (singleTeacherAssignmentError) {
    setNotify({
      isOpen: true,
      message: singleTeacherAssignmentError,
      type: "error",
    });
    dispatch({ type: GET_SINGLE_TO_EDIT_TEACHER_ASSIGNMENT_RESET });
  }
  if (teacherAssignmentSingleCreateError) {
    setNotify({
      isOpen: true,
      message: teacherAssignmentSingleCreateError,
      type: "error",
    });
    dispatch({ type: GET_SINGLE_CREATE_TEACHER_ASSIGNMENT_RESET });
  }
  if (allAssignmentTeacherDataError) {
    setNotify({
      isOpen: true,
      message: allAssignmentTeacherDataError,
      type: "error",
    });
    dispatch({ type: GET_ALL_ASSIGNMENT_TEACHER_RESET });
  }

  if (postTeacherAssignmentError) {
    setNotify({
      isOpen: true,
      message: postTeacherAssignmentError,
      type: "error",
    });
    dispatch({ type: POST_TEACHER_ASSIGNMENT_RESET });
  }
  if (postTeacherAssignment) {
    setNotify({
      isOpen: true,
      message: "Successfully Created",
      type: "success",
    });
    dispatch({ type: POST_TEACHER_ASSIGNMENT_RESET });
    setOpenPopup(false);
    dispatch(
      getListAssignmentTeacherAction(
        acaYear,
        programValue,
        classId,
        subject,
        section,
        shift,
        date
      )
    );
  }
  if (assignmentContentError) {
    setNotify({
      isOpen: true,
      message: assignmentContentError,
      type: "error",
    });
    dispatch({ type: GET_TEACHER_ASSIGNMENT_CONTENT_RESET });
  }

  useEffect(() => {
    if (allAssignmentTeacherData) {
      unstable_batchedUpdates(() => {
        setDdlSubject(
          allAssignmentTeacherData.searchFilterModel.ddlSubjectForTeacher
        );
        setDdlClass(
          allAssignmentTeacherData.searchFilterModel.ddlLevelPrimitive
        );
        setDdlShift(
          allAssignmentTeacherData.searchFilterModel.ddlAcademicShift
        );
        setDdlSection(allAssignmentTeacherData.searchFilterModel.ddlSection);
        setDate(
          allAssignmentTeacherData.searchFilterModel.StartDate.slice(0, 10)
        );
      });
      if (subjectIdFromDashboard) {
        setSubject(subjectIdFromDashboard);
        dispatch(
          getAllOtherOptionsForSelectAction(
            allAssignmentTeacherData.modelDb.IDHREmployee,
            subjectIdFromDashboard
          )
        );
      }
    }
  }, [allAssignmentTeacherData, dispatch]);

  useEffect(() => {
    dispatch({ type: GET_LIST_TEACHER_ASSIGNMENT_RESET });
    dispatch(getAllAssignmentTeacherAction());
  }, []);

  const validate = () => {
    let temp = {};
    temp.acaYear = !acaYear ? "This feild is required" : "";
    temp.programValue = !programValue ? "This feild is required" : "";
    temp.classId = !classId ? "This feild is required" : "";
    temp.shift = !shift ? "This feild is required" : "";
    temp.section = !section ? "This feild is required" : "";
    temp.subject = !subject ? "This feild is required" : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };
  const handleSearchAssignment = () => {
    if (validate()) {
      dispatch(
        getListAssignmentTeacherAction(
          acaYear,
          programValue,
          classId,
          subject,
          section,
          shift,
          date
        )
      );
    }
  };

  const handleCreate = () => {
    if (validate()) {
      dispatch(
        getSingleCreateTeacherAssignmentAction(
          acaYear,
          programValue,
          classId,
          section,
          shift,
          subject,
          date
        )
      );
      setOpenPopup(true);
    }
  };

  const allHandler = () => {
    if (validate()) {
      dispatch(
        getTeacherAssignmentContentAction(
          acaYear,
          programValue,
          classId,
          section,
          shift,
          subject
        )
      );
      setOpenPopup2(true);
    }
  };

  const handleSubjectChange = (value) => {
    setSubject(value);
    dispatch(
      getAllOtherOptionsForSelectAction(
        allAssignmentTeacherData.modelDb.IDHREmployee,
        value
      )
    );
  };

  useEffect(() => {
    if (allOtherOptions) {
      setAcaYear(
        allOtherOptions.year.length > 0 ? allOtherOptions.year[0].Key : ""
      );
      setProgramValue(
        allOtherOptions.program.length > 0 ? allOtherOptions.program[0].Key : ""
      );
      setClassId(
        allOtherOptions.classId.length > 0 ? allOtherOptions.classId[0].Key : ""
      );
      setSection(
        allOtherOptions.section.length > 0 ? allOtherOptions.section[0].Key : ""
      );
      setShift(
        allOtherOptions.shift.length > 0 ? allOtherOptions.shift[0].Key : ""
      );

      dispatch(
        getListAssignmentTeacherAction(
          allOtherOptions.year.length > 0 ? allOtherOptions.year[0].Key : "",
          allOtherOptions.program.length > 0
            ? allOtherOptions.program[0].Key
            : "",
          allOtherOptions.classId.length > 0
            ? allOtherOptions.classId[0].Key
            : "",
          subject,
          allOtherOptions.section.length > 0
            ? allOtherOptions.section[0].Key
            : "",
          allOtherOptions.shift.length > 0 ? allOtherOptions.shift[0].Key : "",
          date
        )
      );
    }
  }, [allOtherOptions]);

  return (
    <>
      <CustomContainer>
        <MobileTopSelectContainer>
          <h3 style={{ textAlign: "center", marginTop: "0" }}>Assignments</h3>
          <Grid container style={{ fontSize: "12px" }}>
            <Grid item xs={12}>
              <SelectControl
                name="Sujbect"
                label="Subject Name"
                value={subject}
                onChange={(e) => handleSubjectChange(e.target.value)}
                options={ddlSubject ? ddlSubject : test}
                errors={errors.subject}
              />
            </Grid>
            {/* <Grid item xs={3}>
              <SelectControl
                name="Academic Year"
                label="Academic Year"
                value={acaYear}
                onChange={(e) => setAcaYear(e.target.value)}
                options={academicYearDdl ? academicYearDdl : test}
                errors={errors.acaYear}
              />
            </Grid>
            <Grid item xs={3}>
              <SelectControl
                name="Program/Faculty"
                label="Program/Faculty"
                value={programValue}
                onChange={(e) => setProgramValue(e.target.value)}
                options={programDdl ? programDdl : test}
                errors={errors.programValue}
              />
            </Grid> */}

            {/* <Grid item xs={12}>
              <div style={{ height: "10px" }}></div>
              <SelectControl
                name="Classes"
                label="Classes"
                value={classId}
                onChange={(e) => setClassId(e.target.value)}
                options={ddlClass ? ddlClass : test}
                errors={errors.classId}
              />
            </Grid>

            <Grid item xs={12}>
              <div style={{ height: "10px" }}></div>
              <SelectControl
                name="Section"
                label="Section"
                value={section}
                onChange={(e) => setSection(e.target.value)}
                options={ddlSection ? ddlSection : test}
                errors={errors.section}
              />
            </Grid>

            <Grid item xs={12}>
              <div style={{ height: "10px" }}></div>
              <SelectControl
                name="Shift"
                label="Shift"
                value={shift}
                onChange={(e) => setShift(e.target.value)}
                options={ddlShift ? ddlShift : test}
                errors={errors.shift}
              />
            </Grid> */}

            <Grid item xs={12}>
              <div style={{ height: "10px" }}></div>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  inputVariant="outlined"
                  format="dd-MM-yyyy"
                  name="CurrentYear"
                  label="Current Year"
                  value={date}
                  onChange={(e) => {
                    const newDate = new Date(e);
                    setDate(newDate.toLocaleDateString());
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <div style={{ height: "10px", width: "10px" }}></div>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.button}
                onClick={handleCreate}
              >
                <AddBoxIcon />
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.button}
                onClick={handleSearchAssignment}
              >
                <SearchIcon />
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.button}
                onClick={allHandler}
              >All&nbsp;
                <ZoomInIcon />
              </Button>
              <div style={{ height: "10px" }}></div>
            </Grid>
          </Grid>
        </MobileTopSelectContainer>
        {loading ? (
          <LoadingComp />
        ) : (
          <>
            {getListTeacherAssignment?.dbTeacherAssignmentLstBySection.map(
              (item) => (
                <AssignmentListCollapse
                  item={item}
                  key={item.$id}
                  setOpenPopup3={setOpenPopup3}
                />
              )
            )}
            {getListTeacherAssignment?.dbTeacherAssignmentLstBySection?.length <
              1 && (
              <h4 style={{ textAlign: "center", marginTop: "10px" }}>
                No Assignment
              </h4>
            )}
          </>
        )}
      </CustomContainer>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Create Assignment"
      >
        {loadingCreate ? (
          <LoadingComp />
        ) : (
          <>
            <AssignmentForm
              students={
                teacherAssignmentSingleCreate &&
                teacherAssignmentSingleCreate.dbModelLstForStudentSection
              }
              formDatas={
                teacherAssignmentSingleCreate &&
                teacherAssignmentSingleCreate.dbTeacherAssignmentModel
              }
              setOpenPopup={setOpenPopup}
            />
          </>
        )}
      </Popup>
      <Popup
        openPopup={openPopup2}
        setOpenPopup={setOpenPopup2}
        title="All Assignment"
      >
        {loadingTable ? (
          <LoadingComp />
        ) : (
          <>
            <AssignmentTableCollapseAll
              allAssignment={
                assignmentContent && assignmentContent.AssignmentContentLst
              }
              setOpenPopup2={setOpenPopup2}
            />
          </>
        )}
      </Popup>
      <Popup
        openPopup={openPopup3}
        setOpenPopup={setOpenPopup3}
        title="Edit Assignment"
      >
        {loadingEdit ? (
          <LoadingComp />
        ) : (
          <>
            <AssignmentEditForm
              singleAssignment={
                singleTeacherAssignment &&
                singleTeacherAssignment.dbTeacherAssignmentModel
              }
              setOpenPop3={setOpenPopup3}
            />
          </>
        )}
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

export default Assignment;
