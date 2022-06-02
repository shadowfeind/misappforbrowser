import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { unstable_batchedUpdates } from "react-dom";
import {
  Button,
  InputAdornment,
  makeStyles,
  TableBody,
  Toolbar,
  Grid,
  Chip,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import useCustomTable from "../../../customHooks/useCustomTable";
import LoadingComp from "../../../components/LoadingComp";
import InputControl from "../../../components/controls/InputControl";
import CustomContainer from "../../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../../components/Notification";
import ConfirmDialog from "../../../components/ConfirmDialog";
import SelectControl from "../../../components/controls/SelectControl";
import {
  DOWNLOAD_NEW_SOURCES_STUDENT_RESET,
  GET_ALL_NEW_SOURCES_STUDENT_RESET,
  GET_NEW_SOURCES_STUDENT_LIST_RESET,
} from "./NewResourcesStudentConstant";
import {
  getAllNewResourcesStudentAction,
  getNewResourcesStudentListAction,
} from "./NewResourcesStudentActions";
import NewResourcesStudentTableCollapse from "./NewResourcesStudentTableCollapse";
import MobileTopSelectContainer from "../../../components/MobileTopSelectContainer";
import NewResourcesListCollapse from "./NewResourcesListCollapse";
import MobileBody from "../../../components/MobileBody";

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

const tableHeader = [
  { id: "ResourceName", label: "Resource Name" },
  { id: "ResourceDescription", label: "Resource Description" },
  { id: "PostedBy", label: "Posted By" },
  { id: "EffectiveForm", label: "Effective Form" },
  { id: "isActive", label: "IsActive" },
  { id: "Actions", label: "Actions", disableSorting: true },
];

const NewResourcesStudent = () => {
  const { id: subjectIdFromDashboard } = useParams();
  const [ddlClass, setDdlClass] = useState([]);
  const [academicYearDdl, setAcademicYearDdl] = useState([]);
  const [programDdl, setProgramDdl] = useState([]);
  const [ddlShift, setDdlShift] = useState([]);
  const [programValue, setProgramValue] = useState("");
  const [classId, setClassId] = useState("");
  const [acaYear, setAcaYear] = useState("");
  const [shift, setShift] = useState("");
  const [errors, setErrors] = useState({});
  const [ddlSection, setDdlSection] = useState([]);
  const [section, setSection] = useState(1);
  const [ddlFacultySubject, setDdlFacultySubject] = useState([]);
  const [facultySubject, setFacultySubject] = useState("");
  const dispatch = useDispatch();
  const classes = useStyles();

  const [tableData, setTableData] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (item) => {
      return item;
    },
  });
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

  const {
    TableContainer,
    TblHead,
    TblPagination,
    tableDataAfterPagingAndSorting,
  } = useCustomTable(tableData, tableHeader, filterFn);

  const handleSearch = (e) => {
    setFilterFn({
      fn: (item) => {
        if (e.target.value === "") {
          return item;
        } else {
          return item.filter((x) =>
            x.EventName.toLowerCase().includes(e.target.value)
          );
        }
      },
    });
  };

  const { newResourcesStudent, error: newResourcesStudentError } = useSelector(
    (state) => state.getAllNewResourcesStudent
  );

  const {
    newResourcesStudentList,
    loading,
    error: newResourcesStudentListError,
  } = useSelector((state) => state.getNewResourcesStudentList);

  const {
    success: downloadNewResourcesSuccess,
    file: downloadFile,
    error: downloadNewResourcesError,
  } = useSelector((state) => state.downloadNewResourcesStudent);

  if (downloadFile) {
    var blob = new Blob([downloadFile]);
    var url = window.URL.createObjectURL(blob);
    window.open(url, "_blank");
  }
  if (downloadNewResourcesError) {
    setNotify({
      isOpen: true,
      message: downloadNewResourcesError,
      type: "error",
    });
    dispatch({ type: DOWNLOAD_NEW_SOURCES_STUDENT_RESET });
  }
  if (newResourcesStudentError) {
    setNotify({
      isOpen: true,
      message: newResourcesStudentError,
      type: "error",
    });
    dispatch({ type: GET_ALL_NEW_SOURCES_STUDENT_RESET });
  }

  if (newResourcesStudentListError) {
    setNotify({
      isOpen: true,
      message: newResourcesStudentListError,
      type: "error",
    });
    dispatch({ type: GET_NEW_SOURCES_STUDENT_LIST_RESET });
  }

  const validate = () => {
    let temp = {};
    temp.acaYear = !acaYear ? "This feild is required" : "";
    temp.programValue = !programValue ? "This feild is required" : "";
    temp.classId = !classId ? "This feild is required" : "";
    temp.section = !section ? "This feild is required" : "";
    temp.shift1 = !shift ? "This feild is required" : "";
    temp.facultySubject = !facultySubject ? "This feild is required" : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  useEffect(() => {
    if (newResourcesStudent) {
      unstable_batchedUpdates(() => {
        setProgramDdl(
          newResourcesStudent.searchFilterModel.ddlFacultyProgramLink
        );
        setDdlClass(newResourcesStudent.searchFilterModel.ddlClass);
        setAcademicYearDdl(
          newResourcesStudent.searchFilterModel.ddlAcademicYear
        );
        setDdlShift(newResourcesStudent.searchFilterModel.ddlAcademicShift);
        setDdlSection(newResourcesStudent.searchFilterModel.ddlSection);
        setDdlFacultySubject(newResourcesStudent.searchFilterModel.ddlSubject);
        dispatch(
          getNewResourcesStudentListAction(
            newResourcesStudent.searchFilterModel.ddlSubject[0]?.Key,
            newResourcesStudent.searchFilterModel.idAcademicYear,
            newResourcesStudent.searchFilterModel.idFacultyProgramLink,
            newResourcesStudent.searchFilterModel.section,
            newResourcesStudent.searchFilterModel.idShift,
            newResourcesStudent.searchFilterModel.level
          )
        );
      });
      if (subjectIdFromDashboard) {
        unstable_batchedUpdates(() => {
          setFacultySubject(subjectIdFromDashboard);
          setAcaYear(newResourcesStudent.searchFilterModel.idAcademicYear);
          setProgramValue(
            newResourcesStudent.searchFilterModel.idFacultyProgramLink
          );
          setClassId(newResourcesStudent.searchFilterModel.level);
          setSection(newResourcesStudent.searchFilterModel.section);
          setShift(newResourcesStudent.searchFilterModel.idShift);
        });

        dispatch(
          getNewResourcesStudentListAction(
            subjectIdFromDashboard,
            newResourcesStudent.searchFilterModel.idAcademicYear,
            newResourcesStudent.searchFilterModel.idFacultyProgramLink,
            newResourcesStudent.searchFilterModel.section,
            newResourcesStudent.searchFilterModel.idShift,
            newResourcesStudent.searchFilterModel.level
          )
        );
      }
    }
  }, [newResourcesStudent, dispatch, subjectIdFromDashboard]);

  useEffect(() => {
    if (newResourcesStudentList) {
      setTableData(newResourcesStudentList.courseDeliveyPlanStudentLst);
    }
  }, [newResourcesStudentList]);

  useEffect(() => {
    dispatch({ type: GET_NEW_SOURCES_STUDENT_LIST_RESET });
    dispatch(getAllNewResourcesStudentAction());
  }, []);

  const handleExamScheduleSearch = (value) => {
    dispatch(
      getNewResourcesStudentListAction(
        value,
        newResourcesStudent.searchFilterModel.idAcademicYear,
        newResourcesStudent.searchFilterModel.idFacultyProgramLink,
        newResourcesStudent.searchFilterModel.section,
        newResourcesStudent.searchFilterModel.idShift,
        newResourcesStudent.searchFilterModel.level
      )
    );
    setFacultySubject(value);
  };

  return (
    <>
      <CustomContainer>
        <MobileTopSelectContainer>
          <h3 style={{ textAlign: "center", marginTop: "0" }}>E Materials</h3>
          <div
            style={{
              textAlign: "center",
              overflowX: "auto",
              overflowYy: "hidden",
              whiteSpace: "nowrap",
              paddingBottom: "10px",
            }}
          >
            {ddlFacultySubject?.map((subject) => (
              <Chip
                key={subject.Key}
                label={subject.Value}
                variant="outlined"
                style={{ marginRight: "5px", marginBottom: "5px" }}
                onClick={(e) => handleExamScheduleSearch(subject.Key)}
              />
            ))}
          </div>
          {/* <Grid container style={{ fontSize: "12px" }}>
            <Grid item container>
              <SelectControl
                name="facultySubject"
                label="Resource Subject"
                value={facultySubject}
                onChange={(e) => handleExamScheduleSearch(e.target.value)}
                options={ddlFacultySubject}
                errors={errors.facultySubject}
              />
            </Grid>
          </Grid> */}
        </MobileTopSelectContainer>
        {loading ? (
          <LoadingComp />
        ) : (
          <>
            <MobileBody>
              {newResourcesStudentList?.courseDeliveyPlanStudentLst.map(
                (item) => (
                  <NewResourcesListCollapse item={item} key={item.$id} />
                )
              )}
              {newResourcesStudentList?.courseDeliveyPlanStudentLst.length <
                1 && (
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

export default NewResourcesStudent;
