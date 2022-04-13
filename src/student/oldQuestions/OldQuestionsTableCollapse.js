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
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import { useDispatch } from "react-redux";
import { downloadOldQuestionsStudentAction } from "./OldQuestionsActions";

const useStyles = makeStyles({
  button: {
    marginRight: "1px",
    padding: "5px",
    minWidth: "10px",
    fontSize: "12px",
  },
});

const OldQuestionsTableCollapse = ({ item }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const downloadHandler = (id) => {
    dispatch(downloadOldQuestionsStudentAction(id));
  };

  return (
    <TableRow>
      <TableCell>{item.OldQuestionName}</TableCell>
      <TableCell>{item.OldQuestionDescription}</TableCell>
      <TableCell>
        {item.FirstName} {item.LastName}
      </TableCell>
      <TableCell>{item.Created_On?.slice(0, 10)}</TableCell>
      <TableCell>{item.IsActive ? "active" : "notactive"}</TableCell>
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
export default OldQuestionsTableCollapse;
