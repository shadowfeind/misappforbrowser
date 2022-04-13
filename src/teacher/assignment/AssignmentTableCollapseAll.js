import React from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Button,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { withStyles, makeStyles } from "@material-ui/core/styles";

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

const AssignmentTableCollapseAll = ({ allAssignment, setOpenPopup2 }) => {
  const classes = useStyles();
  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Assignment Name </StyledTableCell>
              <StyledTableCell>Assignment Summary</StyledTableCell>
              <StyledTableCell>Assignment Date</StyledTableCell>
              <StyledTableCell>Due Date</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allAssignment &&
              allAssignment.map((s) => (
                <StyledTableRow key={s.IDHREmployee}>
                  <StyledTableCell component="th" scope="row">
                    {s.AssignmentName}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {s.AssignmentSummary}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {s.AssignmentDate.slice(0, 10)}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {s.DueDate.slice(0, 10)}
                  </StyledTableCell>{" "}
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AssignmentTableCollapseAll;
