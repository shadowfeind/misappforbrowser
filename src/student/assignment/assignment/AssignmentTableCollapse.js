import React from "react";
import { Button, TableRow, TableCell, makeStyles } from "@material-ui/core";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  downloadAssignmentStudentAction,
  downloadSubmittedAssignmentStudentAction,
  getSingleAssignmentStudentAction,
} from "./AssignmentActions";
import { useDispatch } from "react-redux";

const useStyles = makeStyles({
  button: {
    marginRight: "1px",
    padding: "5px",
    minWidth: "10px",
    fontSize: "12px",
  },
});

const AssignmentTableCollapse = ({ item, setOpenPopup }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const updateHandler = (id) => {
    dispatch(getSingleAssignmentStudentAction(id));
    setOpenPopup(true);
  };
  const downloadHandler = (id) => {
    dispatch(downloadAssignmentStudentAction(id));
  };

  const downloadSubmittedHandler = (id) => {
    dispatch(downloadSubmittedAssignmentStudentAction(id));
  };
  return (
    <TableRow>
      <TableCell>{item.FullName}</TableCell>
      <TableCell>{item.AssignmentName}</TableCell>
      <TableCell>{item.AssignmentDate.slice(0,10)}</TableCell>
      <TableCell>{item.DueDate.slice(0,10)}</TableCell>
      <TableCell>{item.SubmittedDate?.slice(0,10)}</TableCell>
      <TableCell>{item.TotalMark}</TableCell>
      <TableCell>{item.ObtainedMarks}</TableCell>
      <TableCell>
      {" "}
        <Button
           variant="outlined"
            color="secondary"
          className={classes.button}
          onClick={() => downloadHandler(item.IDAssignment)}
        >
          <CloudDownloadIcon style={{ fontSize: 12 }} />
        </Button>
        </TableCell>
        <TableCell>
      {" "}
       {item.DocumentSubmitted!== null &&  <Button
           variant="outlined"
              color= "primary"
          className={classes.button}
          onClick={() => downloadSubmittedHandler(item.IDAssignment)}
        >
          <CloudDownloadIcon style={{ fontSize: 12 }} />
        </Button>}
        </TableCell>
      <TableCell>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => updateHandler(item.IDAssignment)}
        >
          <AddIcon style={{ fontSize: 12 }} />
        </Button>
        {/* <Button
          variant="contained"
          color="secondary"
          className={classes.button}
        >
          <DeleteIcon style={{ fontSize: 12 }} />
        </Button> */}
      </TableCell>
    </TableRow>
  );
};

export default AssignmentTableCollapse;
