import React, { useState } from "react";
import { Button, Collapse, makeStyles } from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ListForTable from "../../../components/ListForTable";
import {
  downloadAssignmentStudentAction,
  downloadSubmittedAssignmentStudentAction,
  getSingleAssignmentStudentAction,
} from "./AssignmentActions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import LockIcon from "@material-ui/icons/Lock";

const useStyles = makeStyles((theme) => ({
  collapse: {
    padding: "16px",
    borderBottom: "1px solid #d3d3d3",
    "& span": {
      fontWeight: "bolder",
    },
  },
  button: {
    marginRight: "10px",
    padding: "5px",
    minWidth: "10px",
    fontSize: "12px",
  },
}));

const dateInPast = (firstDate, secondDate) => {
  if (
    new Date(firstDate).setHours(0, 0, 0, 0) <=
    new Date(secondDate).setHours(0, 0, 0, 0)
  ) {
    return true;
  }

  return false;
};

const AssignmentListCollapse = ({ item, facultySubject, setOpenPopup }) => {
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const downloadHandler = (id) => {
    dispatch(downloadAssignmentStudentAction(id));
  };
  const updateHandler = (id) => {
    dispatch(getSingleAssignmentStudentAction(id));
    // setOpenPopup(true);
  };
  const downloadSubmittedHandler = (id) => {
    dispatch(downloadSubmittedAssignmentStudentAction(id));
  };
  const handleClick = () => {
    setOpen(!open);
  };

  return (
   
    <div
          style={{
            padding: "6px 6px 0 6px",
          }}
        >
          <div style={{ backgroundColor: "#fff" }}>
      <ListForTable onClick={handleClick}>
        <p>
          {/* <span
            style={{
              padding: "8px 10px",
              borderRadius: "50%",
              fontSize: "12px",
              color: "#fff",
              backgroundColor: "#253053",
            }}
          >
            {item.AssignmentName[0]}
          </span> */}
          <span style={{ paddingLeft: "12px" }}>
            {item.AssignmentName}<br/>
              <span style={{ fontSize: "12px", paddingLeft: "12px" }}>
                {item.AssignmentDate.slice(0, 10)} / {item.DueDate.slice(0, 10)}
              </span>
          </span>{" "}
          <span
            style={{ fontSize: "10px", color: "#444", paddingLeft: "10px" }}
          >
            {item.SubmittedDate ? (
              <span style={{ color: "green" }}>Submitted</span>
            ) : (
              <span style={{ color: "red" }}>Pending</span>
            )}
          </span>
        </p>
        <div>
            {open ? (
              <ExpandLess style={{ color: "#d1d1d1" }} />
            ) : (
              <ExpandMore style={{ color: "#d1d1d1" }} />
            )}
          </div>
      </ListForTable>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <div className={classes.collapse}>
          <p>
            <span>AssignmentDate</span> : {item.AssignmentDate.slice(0, 10)}
          </p>
          <p>
            <span>DueDate</span> : {item.DueDate.slice(0, 10)}
          </p>
          <p>
            <span>TotalMark</span> :{item.TotalMark}
          </p>
          <p>
            <span>ObtainedMarks</span> : {item.ObtainedMarks}
          </p>
          <p>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => downloadHandler(item.IDAssignment)}
            >
            Teacher &nbsp;
              <CloudDownloadIcon style={{ fontSize: 12 }} />
            </Button>
            {item.DocumentSubmitted !== null && (
              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
                onClick={() => downloadSubmittedHandler(item.IDAssignment)}
              >
              Student &nbsp;
                <CloudDownloadIcon style={{ fontSize: 12 }} />
              </Button>
            )}
            {dateInPast(item.DueDate, Date.now() + 1) ? (
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
              >
                <LockIcon style={{ fontSize: 12 }} />
              </Button>
            ) : (
              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
                onClick={() => updateHandler(item.IDAssignment)}
              >
                <EditIcon style={{ fontSize: 12 }} />&nbsp; Edit
              </Button>
            )}
          </p>
        </div>
      </Collapse>
      </div>
      </div>
  );
};

export default AssignmentListCollapse;
