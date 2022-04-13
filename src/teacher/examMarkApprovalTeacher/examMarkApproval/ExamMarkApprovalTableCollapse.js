import React,{useState} from "react";
import { TableRow,Button, TableCell, makeStyles } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles({
  button: {
    marginRight: "1px",
    padding: "5px",
    minWidth: "10px",
    fontSize: "12px",
  },
});

const ExamMarkApprovalTableCollapse = ({ item
  }) => {
    const classes = useStyles();
    return (
      <>
        <TableRow>
          <TableCell>{item.RollNo}</TableCell>
          <TableCell>{item.FullName}</TableCell>
          <TableCell>{item.FullMark}</TableCell>
          <TableCell>{item.FullMarkPractical}</TableCell>
          <TableCell>{item.ObtainedMark}</TableCell>
          <TableCell>{item.ObtainedMarkPractical}</TableCell>
          <TableCell>{item.Division}</TableCell>
          <TableCell>{item.UpdatedOn}</TableCell>
          <TableCell>{item.Status}</TableCell>
        </TableRow>
      </>
    );
  };

  export default ExamMarkApprovalTableCollapse;