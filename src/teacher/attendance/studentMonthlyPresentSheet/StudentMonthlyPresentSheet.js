import React, { useEffect, useState } from "react";
import { Button, makeStyles, Toolbar, Grid } from "@material-ui/core";
import Popup from "../../../components/Popup";
import CustomContainer from "../../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../../components/Notification";
import ConfirmDialog from "../../../components/ConfirmDialog";
import SelectControl from "../../../components/controls/SelectControl";
import {
  GET_ALL_OTHER_OPTIONS_FOR_SELECT_RESET,
  GET_ALL_STUDEN_MONTHLY_PRESENT_SHEET_RESET,
  GET_ENGLISH_DATE_RESET,
  GET_LIST_FOR_PRESENT_STUDENT_RESET,
  GET_LIST_FOR_UPDATE_STUDENT_PRESENT_RESET,
  GET_LIST_STUDENT_PRESENT_RESET,
  GET_SUBJECT_OPTIONS_FOR_SELECT_RESET,
  POST_LIST_STUDENT_PRESENT_RESET,
} from "./StudentMonthlyPresentSheetConstants";
import {
  getAllOtherOptionsForSelectAction,
  getAllStudentPresentSheetDataAction,
  getEnglishDateAction,
  getListForPresentStudentAction,
  getListForUpdateStudentPresentAction,
  getListStudentPresentAction,
  getSubjectOptionsForSelectAction,
} from "./StudentMonthlyPresentSheetActions";
import DatePickerControl from "../../../components/controls/DatePickerControl";
import StudentMonthlyPresentSheetTableCollapse from "./StudentMonthlyPresentSheetTableCollapse";
import StudentMonthlyPresentSheetUpdateForm from "./StudentMonthlyPresentSheetUpdateForm";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import MobileTopSelectContainer from "../../../components/MobileTopSelectContainer";
import SearchIcon from "@material-ui/icons/Search";
import EditIcon from "@material-ui/icons/Edit";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  searchInput: {
    width: "75%",
    fontSize: "12px",
  },
  button: {
    position: "absolute",
    right: "10px",
  },
  customInput: {
    minWidth: "200px",
  },
  keydate: {
    "& input": {
      fontSize: "12px",
      // padding: "12px",
    },
    "& label": {
      fontSize: "12px",
      // padding: "12px",
    },
  },
}));

const StudentMonthlyPresentSheet = () => {
  const [ddlClass, setDdlClass] = useState([]);
  const [academicYearDdl, setAcademicYearDdl] = useState([]);
  const [programDdl, setProgramDdl] = useState([]);
  const [ddlShift, setDdlShift] = useState([]);
  const [ddlSection, setDdlSection] = useState([]);
  const [ddlSubject, setDdlSubject] = useState([]);
  const [ddlNepMonth, setDdlNepMonth] = useState([]);
  const [ddlNepYear, setDdlNepYear] = useState([]);

  const [programValue, setProgramValue] = useState("");
  const [classId, setClassId] = useState("");
  const [acaYear, setAcaYear] = useState("");
  const [shift, setShift] = useState("");
  const [section, setSection] = useState("");
  const [subject, setSubject] = useState("");
  const [nepMonth, setNepMonth] = useState("");
  const [nepYear, setNepYear] = useState("");
  const [errors, setErrors] = useState({});
  const [date, setDate] = useState();

  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

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

  const test = [{ Key: "", Value: "" }];

  const {
    allStudentMonthlyPresentSheetData,
    error: allStudentMonthlyPresentSheetDataError,
  } = useSelector((state) => state.getAllStudentMonthlyPresentSheet);

  const { allOtherOptions, error: allOtherOptionsError } = useSelector(
    (state) => state.getAllOtherOptionsForSelect
  );

  const { engDate, error: engDateError } = useSelector(
    (state) => state.getEnglishDate
  );

  const { getListStudentPresent, error: getListStudentPresentError } =
    useSelector((state) => state.getListStudentPresent);

  const {
    getListForUpdateStudentPresent,
    error: getListForUpdateStudentPresentError,
  } = useSelector((state) => state.getListForUpdateStudentPresent);

  const { presentStudent, error: presentStudentError } = useSelector(
    (state) => state.getListForPresentStudent
  );

  const {
    success: postListStudentPresentSuccess,
    error: postListStudentPresentError,
  } = useSelector((state) => state.postListStudentPresent);

  if (allStudentMonthlyPresentSheetDataError) {
    setNotify({
      isOpen: true,
      message: allStudentMonthlyPresentSheetDataError,
      type: "error",
    });
    dispatch({ type: GET_ALL_STUDEN_MONTHLY_PRESENT_SHEET_RESET });
  }
  if (allOtherOptionsError) {
    setNotify({
      isOpen: true,
      message: allOtherOptionsError,
      type: "error",
    });
    dispatch({ type: GET_ALL_OTHER_OPTIONS_FOR_SELECT_RESET });
  }
  if (postListStudentPresentError) {
    setNotify({
      isOpen: true,
      message: postListStudentPresentError,
      type: "error",
    });
    dispatch({ type: POST_LIST_STUDENT_PRESENT_RESET });
  }
  if (postListStudentPresentSuccess) {
    setNotify({
      isOpen: true,
      message: "Successfully Posted",
      type: "success",
    });
    dispatch({ type: POST_LIST_STUDENT_PRESENT_RESET });
  }

  if (getListStudentPresentError) {
    setNotify({
      isOpen: true,
      message: getListStudentPresentError,
      type: "error",
    });
    dispatch({ type: GET_LIST_STUDENT_PRESENT_RESET });
  }
  if (getListForUpdateStudentPresentError) {
    setNotify({
      isOpen: true,
      message: getListForUpdateStudentPresentError,
      type: "error",
    });
    dispatch({ type: GET_LIST_FOR_UPDATE_STUDENT_PRESENT_RESET });
  }
  if (presentStudentError) {
    setNotify({
      isOpen: true,
      message: presentStudentError,
      type: "error",
    });
    dispatch({ type: GET_LIST_FOR_PRESENT_STUDENT_RESET });
  }
  useEffect(() => {
    dispatch(getAllStudentPresentSheetDataAction());
  }, []);
  useEffect(() => {
    if (allStudentMonthlyPresentSheetData) {
      setProgramDdl(
        allStudentMonthlyPresentSheetData.searchFilterModel
          .ddlFacultyProgramLink
      );
      setDdlSubject(
        allStudentMonthlyPresentSheetData.searchFilterModel.ddlSubjectForTeacher
      );
      setSubject(
        allStudentMonthlyPresentSheetData.searchFilterModel
          .ddlSubjectForTeacher[0]?.Key
      );
      dispatch(
        getAllOtherOptionsForSelectAction(
          allStudentMonthlyPresentSheetData.modelDb.IDHREmployee,
          allStudentMonthlyPresentSheetData.searchFilterModel
            .ddlSubjectForTeacher[0]?.Key
        )
      );
      setDdlClass(
        allStudentMonthlyPresentSheetData.searchFilterModel.ddlLevelPrimitive
      );
      setAcademicYearDdl(
        allStudentMonthlyPresentSheetData.searchFilterModel.ddlAcademicYear
      );
      setDdlShift(
        allStudentMonthlyPresentSheetData.searchFilterModel.ddlAcademicShift
      );
      setDdlSection(
        allStudentMonthlyPresentSheetData.searchFilterModel.ddlSection
      );
      setDdlNepMonth(
        allStudentMonthlyPresentSheetData.searchFilterModel.ddlnpMonth
      );
      setDdlNepYear(
        allStudentMonthlyPresentSheetData.searchFilterModel.ddlnpYear
      );
      setDate(
        allStudentMonthlyPresentSheetData.searchFilterModel.currentDate?.slice(
          0,
          10
        )
      );
      setNepMonth(allStudentMonthlyPresentSheetData.searchFilterModel.npMonth);
      setNepYear(allStudentMonthlyPresentSheetData.searchFilterModel.npYear);
    }
  }, [allStudentMonthlyPresentSheetData, dispatch]);

  const validate = () => {
    let temp = {};
    temp.acaYear = !acaYear ? "This feild is required" : "";
    temp.programValue = !programValue ? "This feild is required" : "";
    temp.classId = !classId ? "This feild is required" : "";
    temp.shift = !shift ? "This feild is required" : "";
    temp.section = !section ? "This feild is required" : "";
    temp.subject = !subject ? "This feild is required" : "";
    temp.nepMonth = !nepMonth ? "This feild is required" : "";
    temp.nepYear = !nepYear ? "This feild is required" : "";
    temp.date = !date ? "This feild is required" : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const handleSearchAttendance = () => {
    if (validate()) {
      dispatch(
        getListStudentPresentAction(
          acaYear,
          programValue,
          classId,
          subject,
          section,
          shift,
          nepYear,
          nepMonth,
          date
        )
      );
      history.push("/attendance/table-details");
    }
  };

  const handleUpdate = () => {
    if (validate()) {
      dispatch(
        getListForUpdateStudentPresentAction(
          date,
          nepYear,
          nepMonth,
          acaYear,
          programValue,
          classId,
          subject,
          section,
          shift
        )
      );
      history.push("/attendance/table-edit");
    }
  };

  const nepMonthHandler = (value) => {
    setNepMonth(value);
    if (nepYear) {
      dispatch(getEnglishDateAction(value, nepYear));
    }
  };
  const nepYearHandler = (value) => {
    setNepYear(value);
    if (nepMonth) {
      dispatch(getEnglishDateAction(nepMonth, value));
    }
  };

  const handleSubjectChange = (value) => {
    setSubject(value);
    dispatch(
      getAllOtherOptionsForSelectAction(
        allStudentMonthlyPresentSheetData.modelDb.IDHREmployee,
        value
      )
    );
  };

  useEffect(() => {
    if (allOtherOptions) {
      setAcaYear(
        allOtherOptions.year.length > 0 ? allOtherOptions.year[0]?.Key : ""
      );
      setProgramValue(
        allOtherOptions.program.length > 0
          ? allOtherOptions.program[0]?.Key
          : ""
      );
      setClassId(
        allOtherOptions.classId.length > 0
          ? allOtherOptions.classId[0]?.Key
          : ""
      );
      setSection(
        allOtherOptions.section.length > 0
          ? allOtherOptions.section[0]?.Key
          : ""
      );
      setShift(
        allOtherOptions.shift.length > 0 ? allOtherOptions.shift[0]?.Key : ""
      );
    }
  }, [allOtherOptions]);

  return (
    <>
      <CustomContainer>
        <MobileTopSelectContainer>
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

            {/* <Grid item xs={12}>
              <div style={{ height: "10px" }}></div>
              <SelectControl
                name="Academic Year"
                label="Academic Year"
                value={acaYear}
                onChange={(e) => setAcaYear(e.target.value)}
                options={academicYearDdl ? academicYearDdl : test}
                errors={errors.acaYear}
              />
            </Grid>
            <Grid item xs={12}>
              <div style={{ height: "10px" }}></div>
              <SelectControl
                name="Program/Faculty"
                label="Program/Faculty"
                value={programValue}
                onChange={(e) => setProgramValue(e.target.value)}
                options={programDdl ? programDdl : test}
                errors={errors.programValue}
              />
            </Grid>
            <Grid item xs={12}>
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
              <SelectControl
                name="NepaliMonth"
                label="Nepali Month"
                value={nepMonth}
                onChange={(e) => nepMonthHandler(e.target.value)}
                options={ddlNepMonth ? ddlNepMonth : test}
                errors={errors.nepMonth}
              />
            </Grid>
            <Grid item xs={12}>
              <div style={{ height: "10px" }}></div>
              <SelectControl
                name="NepaliYear"
                label="Nepali Year"
                value={nepYear}
                onChange={(e) => nepYearHandler(e.target.value)}
                options={ddlNepYear ? ddlNepYear : test}
                errors={errors.nepYear}
              />
            </Grid>
            <Grid item xs={12}>
              <div style={{ height: "10px" }}></div>

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  inputVariant="outlined"
                  format="MM-dd-yyyy"
                  name="CurrentYear"
                  label="Current Year"
                  value={date}
                  className={classes.keydate}
                  onChange={(e) => {
                    const newDate = new Date(e);
                    setDate(newDate.toLocaleDateString()?.slice(0, 10));
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12}>
              <div style={{ marginBottom: "70px" }}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  style={{ margin: "10px 0 0 10px" }}
                  onClick={handleUpdate}
                >
                  <EditIcon />
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  style={{ margin: "10px 0 0 10px" }}
                  onClick={handleSearchAttendance}
                >
                  <SearchIcon />
                </Button>
              </div>
            </Grid>
          </Grid>
        </MobileTopSelectContainer>
        {/* {getListStudentPresent && (
          <StudentMonthlyPresentSheetTableCollapse
            students={getListStudentPresent && getListStudentPresent}
          />
        )} */}
      </CustomContainer>
      {/* <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Bulk Edit"
      >
        <StudentMonthlyPresentSheetUpdateForm
          students={
            getListForUpdateStudentPresent && getListForUpdateStudentPresent
          }
          presentStudent={presentStudent && presentStudent}
        />
      </Popup> */}
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

export default StudentMonthlyPresentSheet;
