import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  Button,
  FormControl,
  InputLabel,
  Select,
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { useDispatch, useSelector } from "react-redux";
import { postStudentPresentListAction } from "./StudentMonthlyPresentSheetActions";
import ClearIcon from "@material-ui/icons/Clear";
import CheckIcon from "@material-ui/icons/Check";
import { useHistory } from "react-router-dom";
import JobHistoryForm from "../../pid/jobHistory/JobHistoryForm";
import Notification from "../../../components/Notification";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.grey,
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const StudentMonthlyPresentSheetUpdateForm = () => {
  const [stuAttendance, setStuAttendance] = useState([]);
  const [checked, setChecked] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const { getListForUpdateStudentPresent } = useSelector(
    (state) => state.getListForUpdateStudentPresent
  );
  const {
    success: postListStudentPresentSuccess,
    error: postListStudentPresentError,
  } = useSelector((state) => state.postListStudentPresent);

  useEffect(() => {
    if (getListForUpdateStudentPresent) {
      setStuAttendance([
        ...getListForUpdateStudentPresent.dbStudentClassAttendanceModelAttendanceLst,
      ]);
    }
  }, [getListForUpdateStudentPresent]);

  const handleAllSelectChange = (e) => {
    if (e.target.checked) {
      let tempAttendance = stuAttendance.map((x) => {
        return { ...x, IsPresent: true };
      });
      setStuAttendance(tempAttendance);
      setChecked(!checked);
    } else {
      let tempAttendance = stuAttendance.map((x) => {
        return { ...x, IsPresent: false };
      });
      setStuAttendance(tempAttendance);
      setChecked(!checked);
    }
  };

  const handleChange = (checked, id) => {
    let tempAttendance = stuAttendance.map((x) =>
      x.IDHREmployee === id ? { ...x, IsPresent: checked } : x
    );
    setStuAttendance(tempAttendance);
  };

  const formCheckSubmitHandler = () => {
    dispatch(
      postStudentPresentListAction(
        stuAttendance,
        getListForUpdateStudentPresent.searchFilterModel
      )
    );
  };

  useEffect(() => {
    if (postListStudentPresentSuccess) {
      setNotify({
        isOpen: true,
        message: "Successfully Posted",
        type: "success",
      });
      history.push("/attendance");
    }
  }, [postListStudentPresentSuccess]);

  return (
    <div style={{ marginBottom: "56px" }}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <label>Select All</label>
                <Checkbox checked={checked} onChange={handleAllSelectChange} />
              </StyledTableCell>
              <StyledTableCell>Roll No. </StyledTableCell>
              <StyledTableCell>Student Name</StyledTableCell>
              <StyledTableCell>Mobile</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stuAttendance &&
              stuAttendance
                .sort((a, b) => a.RollNo - b.RollNo)
                .map((s) => (
                  <StyledTableRow key={s.IDHREmployee}>
                    <StyledTableCell component="th" scope="row">
                      <Checkbox
                        checked={s?.IsPresent || false}
                        name="IsPresent"
                        onChange={(e) =>
                          handleChange(e.target.checked, s.IDHREmployee)
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {s.RollNo}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {s.FullName}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {s.MobileNumber}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {s.EmailID}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          marginBottom: "20px",
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={() => history.push("/attendance")}
          style={{
            margin: "10px 0 0 10px",
            padding: "5px 10px",
            fontsize: "12px",
          }}
        >
          <ClearIcon />
        </Button>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{
            margin: "10px 0 0 10px",
            padding: "5px 10px",
            fontsize: "12px",
          }}
          onClick={formCheckSubmitHandler}
        >
          <CheckIcon />
        </Button>
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
};

export default StudentMonthlyPresentSheetUpdateForm;
