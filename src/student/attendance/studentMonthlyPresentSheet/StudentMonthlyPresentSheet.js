import React, { useEffect, useState } from "react";
import { Button, makeStyles, Toolbar, Grid } from "@material-ui/core";
import Popup from "../../../components/Popup";
import CustomContainer from "../../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../../components/Notification";
import LoadingComp from "../../../components/LoadingComp";
import ConfirmDialog from "../../../components/ConfirmDialog";
import MobileBody from "../../../components/MobileBody";
import SelectControl from "../../../components/controls/SelectControl";
import {
  GET_ALL_OTHER_OPTIONS_FOR_STUDENT_RESET,
  GET_ALL_STUDENT_ATTENDANCE_RESET,
  GET_LIST_STUDENT_ATTENDANCE_RESET,
} from "./StudentMonthlyPresentSheetConstants";
import {
  getAllStudentAttendanceAction,
  getListStudentAttendanceAction,
} from "./StudentMonthlyPresentSheetActions";
import DatePickerControl from "../../../components/controls/DatePickerControl";
import StudentMonthlyPresentSheetTableCollapse from "./StudentMonthlyPresentSheetTableCollapse";
import StudentMonthlyPresentSheetUpdateForm from "./StudentMonthlyPresentSheetUpdateForm";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { unstable_batchedUpdates } from "react-dom";
import MobileTopSelectContainer from "../../../components/MobileTopSelectContainer";
import StudentMonthlyPresentSheetListCollapse from "./StudentMonthlyPresentSheetListCollapse";

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
}));

const StudentMonthlyPresentSheet = () => {
  const [ddlClass, setDdlClass] = useState([]);
  const [academicYearDdl, setAcademicYearDdl] = useState([]);
  const [programDdl, setProgramDdl] = useState([]);
  const [ddlShift, setDdlShift] = useState([]);
  const [ddlSection, setDdlSection] = useState([]);
  const [ddlSubjectAttendance, setDdlSubject] = useState([]);
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

  const { allStudentAttendanceData, error: allStudentAttendanceDataError } =
    useSelector((state) => state.getAllStudentAttendance);

  const { allOtherOptions, error: allOtherOptionsError } = useSelector(
    (state) => state.getAllOtherOptionsForStudent
  );

  const {
    getListStudentAttendance,
    loading,
    error: getListStudentAttendanceError,
  } = useSelector((state) => state.getListStudentAttendance);

  if (allStudentAttendanceDataError) {
    setNotify({
      isOpen: true,
      message: allStudentAttendanceDataError,
      type: "error",
    });
    dispatch({ type: GET_ALL_STUDENT_ATTENDANCE_RESET });
  }

  if (allOtherOptionsError) {
    setNotify({
      isOpen: true,
      message: allOtherOptionsError,
      type: "error",
    });
    dispatch({ type: GET_ALL_OTHER_OPTIONS_FOR_STUDENT_RESET });
  }

  if (getListStudentAttendanceError) {
    setNotify({
      isOpen: true,
      message: getListStudentAttendanceError,
      type: "error",
    });
    dispatch({ type: GET_LIST_STUDENT_ATTENDANCE_RESET });
  }

  useEffect(() => {
    if (allStudentAttendanceData) {
      unstable_batchedUpdates(() => {
        setDdlSubject(
          allStudentAttendanceData.searchFilterModel.ddlSubjectAttendance
        );
        setSubject(
          allStudentAttendanceData.searchFilterModel.ddlSubjectAttendance[0]
            ?.Key
        );
        setDdlNepMonth(allStudentAttendanceData.searchFilterModel.ddlnpMonth);
        setDate(
          allStudentAttendanceData.searchFilterModel.currentDate.slice(0, 10)
        );
        setNepMonth(allStudentAttendanceData.searchFilterModel.npMonth);
        setNepYear(allStudentAttendanceData.searchFilterModel.npYear);
        setAcaYear(allStudentAttendanceData.searchFilterModel.idAcademicYear);
        setProgramValue(
          allStudentAttendanceData.searchFilterModel.idFacultyProgramLink
        );
        setClassId(allStudentAttendanceData.searchFilterModel.level);
        setShift(allStudentAttendanceData.searchFilterModel.idShift);
        setSection(allStudentAttendanceData.searchFilterModel.section);
        dispatch(
          getListStudentAttendanceAction(
            allStudentAttendanceData.searchFilterModel.currentDate.slice(0, 10),
            allStudentAttendanceData.searchFilterModel.npYear,
            allStudentAttendanceData.searchFilterModel.npMonth,
            allStudentAttendanceData.searchFilterModel.idAcademicYear,
            allStudentAttendanceData.searchFilterModel.idFacultyProgramLink,
            allStudentAttendanceData.searchFilterModel.level,
            allStudentAttendanceData.searchFilterModel.ddlSubjectAttendance[0]
              ?.Key,
            allStudentAttendanceData.searchFilterModel.section,
            allStudentAttendanceData.searchFilterModel.idShift
          )
        );
      });
    }
  }, [allStudentAttendanceData, dispatch]);

  useEffect(() => {
    dispatch({ type: GET_LIST_STUDENT_ATTENDANCE_RESET });
    dispatch(getAllStudentAttendanceAction());
  }, []);

  // const nepMonthHandler = (value) => {
  //   setNepMonth(value);
  //   if (nepYear) {
  //     dispatch(getEngDateStudentAction(value, nepYear));
  //   }
  // };
  // const nepYearHandler = (value) => {
  //   setNepYear(value);
  //   if (nepMonth) {
  //     dispatch(getEngDateStudentAction(nepMonth, value));
  //   }
  // };

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
    }
  }, [allOtherOptions]);

  const onChangeSubject = (value) => {
    setSubject(value);

    dispatch(
      getListStudentAttendanceAction(
        date,
        nepYear,
        nepMonth,
        acaYear,
        programValue,
        classId,
        value,
        section,
        shift
      )
    );
  };

  const onChangeNpMonth = (value) => {
    setNepMonth(value);

    dispatch(
      getListStudentAttendanceAction(
        date,
        nepYear,
        value,
        acaYear,
        programValue,
        classId,
        subject,
        section,
        shift
      )
    );
  };

  return (
    <>
      <CustomContainer>
        <MobileTopSelectContainer>
          <h4 style={{ textAlign: "center", marginTop: "-8px" }}>Attendance</h4>
          <Grid container style={{ fontSize: "12px" }}>
            <Grid item xs={5} style={{ marginRight: "10px" }}>
              <SelectControl
                name="Subject"
                label="Subject"
                value={subject}
                onChange={(e) => onChangeSubject(e.target.value)}
                options={ddlSubjectAttendance ? ddlSubjectAttendance : test}
                errors={errors.subject}
              />
            </Grid>
            <Grid item xs={5} style={{ marginLeft: "10px" }}>
              <SelectControl
                name="NepaliMonth"
                label="Nepali Month"
                value={nepMonth}
                onChange={(e) => onChangeNpMonth(e.target.value)}
                options={ddlNepMonth ? ddlNepMonth : test}
                errors={errors.nepMonth}
              />
            </Grid>
          </Grid>
        </MobileTopSelectContainer>
        {loading ? (
          <LoadingComp />
        ) : (
          <>
            <MobileBody>
              {getListStudentAttendance && (
                <StudentMonthlyPresentSheetListCollapse
                  attendance={getListStudentAttendance}
                />
              )}
              {getListStudentAttendance?.dbModelLst.length < 1 && (
                <h4 style={{ textAlign: "center", marginTop: "10px" }}>
                  No Data
                </h4>
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

export default StudentMonthlyPresentSheet;
