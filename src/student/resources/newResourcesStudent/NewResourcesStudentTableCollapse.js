import React, { useState } from "react";
import {
  Button,
  TableRow,
  TableCell,
  makeStyles,
  Box,
  Typography,
  Grid,
  List,
  ListItem,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import { useDispatch } from "react-redux";
import { downloadNewResourcesAction } from "./NewResourcesStudentActions";

const useStyles = makeStyles({
  button: {
    marginRight: "1px",
    padding: "5px",
    minWidth: "10px",
    fontSize: "12px",
  },
});

const NewResourcesStudentTableCollapse = ({
  item,
  updateCollegeHandler,
  deleteCollegeHandler,
}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const downloadHandler = (id) => {
    dispatch(downloadNewResourcesAction(id));
  };
  return (
    <TableRow>
      <TableCell>{item.CourseName}</TableCell>
      <TableCell>{item.CourseDescription}</TableCell>
      <TableCell>{item.PostedBy}</TableCell>
      <TableCell>{item.EffectiveForm?.slice(0, 10)}</TableCell>
      <TableCell>{item.isActive}</TableCell>
      <TableCell>
        <Button
          variant="contained"
          color="default"
          className={classes.button}
          onClick={() => downloadHandler(item.Id)}
        >
          <CloudDownloadIcon style={{ fontSize: 12 }} />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default NewResourcesStudentTableCollapse;
