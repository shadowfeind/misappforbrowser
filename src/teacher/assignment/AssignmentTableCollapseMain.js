import React from "react";
import { TableRow, TableCell, Button, makeStyles } from "@material-ui/core";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  downloadAssignmentAction,
  downloadSubmittedAssignmentAction,
  getSingleToEditTeacherAssignmentAction,
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

const AssignmentTableCollapseMain = ({ item, setOpenPopup3 }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const handleEdit = (id) => {
    dispatch(getSingleToEditTeacherAssignmentAction(id));
    setOpenPopup3(true);
  };
  const downloadHandler = (id) => {
    dispatch(downloadAssignmentAction(id));
  };

  const downloadSubmittedHandler = (id) => {
    dispatch(downloadSubmittedAssignmentAction(id));
  };
  return (
    <>
      <TableRow>
        <TableCell>{item.FullName}</TableCell>
        <TableCell>{item.RollNo}</TableCell>
        <TableCell>{item.Shift}</TableCell>
        <TableCell>{item.AssignmentName}</TableCell>
        <TableCell>{item.AssignmentDate?.slice(0, 10)}</TableCell>
        <TableCell>{item.DueDate?.slice(0, 10)}</TableCell>
        <TableCell>{item.SubmittedDate?.slice(0, 10)}</TableCell>
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
          {item.DocumentSubmitted !== null && (
            <Button
              variant="outlined"
              color= "primary"
              className={classes.button}
              onClick={() => downloadSubmittedHandler(item.IDAssignment)}
            >
              <CloudDownloadIcon style={{ fontSize: 12 }} />
            </Button>
          )}
        </TableCell>
      
        <TableCell>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => handleEdit(item.IDAssignment)}
          >
            <EditIcon style={{ fontSize: 12 }} />
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
          >
            <DeleteIcon style={{ fontSize: 12 }} />
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
};

export default AssignmentTableCollapseMain;
