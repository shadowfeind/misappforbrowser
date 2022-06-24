import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { useDispatch } from "react-redux";
import { postBulkExamMarkApprovalAction } from "./ExamMarkAprrovalActions";

const StyledTableCell = withStyles((theme) => ({
  root: {
    padding: "0 12px",
  },
  head: {
    backgroundColor: "#253053",
    color: theme.palette.common.white,
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
  input: {
    "& input": {
      padding: "8px",
      fontSize: "12px",
    },
  },
});

const ExamMarkApprovalBulk = ({
  bulkData,
  statusData,
  search,
  ddlSchedule,
  schedule,
  ddlEvent,
  event,
  setOpenPopup,
}) => {
  const [bulk, setBulk] = useState([]);
  const [submitDisabler, setSubmitDisabler] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();

  let currentSubject = ddlSchedule?.filter((x) => x.Key === schedule);
  let currentEvent = ddlEvent?.filter((x) => x.Key === event);

  const onChangeHandler = (subject, value, name, index) => {
    let showValue =
      name === "ObtainedMark" ? subject.FullMark : subject.FullMarkPractical;

    if ((value <= showValue) & (value >= 0)) {
      setBulk((prev) => {
        const newReassoc = {
          ...subject,
          [name]: Number(value),
        };

        let newArray = [...prev];
        newArray[index] = newReassoc;

        return [...newArray];
      });
    } else {
      alert(`${name} must be equal or less than ${showValue}`);
    }
  };

  const formCheckSubmitHandler = () => {
    setSubmitDisabler(true);
    dispatch(postBulkExamMarkApprovalAction(bulk, search));
  };

  useEffect(() => {
    if (bulkData) {
      bulkData.forEach((bulk) => {
        if (bulk.StudentExamStatus === null) {
          bulk.StudentExamStatus = 1;
        }
      });
      setBulk(bulkData);
    }
  }, [bulkData]);
  const symbolsArr = ["e", "E", "+", "-"];
  return (
    <>
      <h5>Subject: {currentSubject && currentSubject[0].Value}</h5>
      <h5>Term: {currentEvent && currentEvent[0].Value}</h5>
      <TableContainer style={{ maxHeight: "260px" }} component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              {/* <StyledTableCell>Roll No.</StyledTableCell> */}
              <StyledTableCell align="left">
                FullName (Roll No.)
              </StyledTableCell>
              <StyledTableCell align="left" width="20%">
                TH
              </StyledTableCell>
              {bulk[0]?.FullMarkPractical !== null && (
                <StyledTableCell align="left" width="20%">
                  PT
                </StyledTableCell>
              )}
              {/* <StyledTableCell align="left">Status</StyledTableCell> */}
              <StyledTableCell align="left">FM</StyledTableCell>
              <StyledTableCell align="left">FM (PT)</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bulk &&
              bulk.map((subject, index) => (
                <StyledTableRow key={subject.IDHREmployee}>
                  {/* <StyledTableCell>{subject.RollNo}</StyledTableCell> */}
                  <StyledTableCell align="left">
                    {subject.FullName} ({subject.RollNo})
                  </StyledTableCell>

                  <StyledTableCell align="left">
                    <TextField
                      id={`theory_${subject.IDHREmployee}`}
                      name="ObtainedMark"
                      value={subject.ObtainedMark}
                      type="number"
                      onKeyDown={(e) =>
                        symbolsArr.includes(e.key) && e.preventDefault()
                      }
                      variant="outlined"
                      className={classes.input}
                      inputProps={{ tabIndex: "1" }}
                      onChange={(e) =>
                        onChangeHandler(
                          subject,
                          e.target.value,
                          e.target.name,
                          index
                        )
                      }
                    />
                  </StyledTableCell>
                  {subject.FullMarkPractical !== null && (
                    <StyledTableCell align="left">
                      <TextField
                        id={`practical_${subject.IDHREmployee}`}
                        value={subject.ObtainedMarkPractical}
                        name="ObtainedMarkPractical"
                        type="number"
                        onKeyDown={(e) =>
                          symbolsArr.includes(e.key) && e.preventDefault()
                        }
                        variant="outlined"
                        inputProps={{
                          tabIndex: "2",
                          style: {
                            padding: "4px",
                          },
                        }}
                        onChange={(e) =>
                          onChangeHandler(
                            subject,
                            e.target.value,
                            e.target.name,
                            index
                          )
                        }
                      />
                    </StyledTableCell>
                  )}

                  <StyledTableCell align="left">
                    {subject.FullMark}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {subject.FullMarkPractical}
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
          marginBottom: "10px",
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setOpenPopup(false)}
          style={{
            margin: "10px 0 0 10px",
            padding: "5px 10px",
            fontsize: "12px",
          }}
        >
          CANCEL
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
          disabled={submitDisabler}
          onClick={formCheckSubmitHandler}
        >
          {submitDisabler ? "PROCESSING..." : "SUBMIT"}
        </Button>
      </div>
    </>
  );
};

export default ExamMarkApprovalBulk;
