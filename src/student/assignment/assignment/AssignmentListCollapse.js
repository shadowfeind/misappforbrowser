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
    padding: "16px 16px 16px 24px",
    borderBottom: "1px solid #d3d3d3",
    "& span": {
      fontWeight: "bolder",
    },
    "& p": {
      margin: "0",
      paddingBottom: "4px",
      fontSize: "12px",
    },
  },
  button: {
    marginRight: "10px",
    padding: "5px 16px",
    minWidth: "10px",
    fontSize: "10px",
    marginBottom: "10px",
  },
  listWrapper: {
    display: "flex",
    alignItems: "center",
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
          <div className={classes.listWrapper}>
            <div style={{ fontSize: "12px", color: "#666" }}>
              {item.AssignmentDate.slice(0, 10)} <br />{" "}
              {item.DueDate.slice(0, 10)}
            </div>
            <div
              style={{
                paddingLeft: "18px",
                fontSize: "14px",
                // fontWeight: "bolder",
              }}
            >
              {item.AssignmentName?.slice(0, 20)}
              <div
                style={{ fontSize: "10px", color: "#444", marginTop: "-3px" }}
              >
                {item.SubmittedDate ? (
                  <div style={{ color: "green" }}>Submitted</div>
                ) : (
                  <div style={{ color: "red" }}>Pending</div>
                )}
              </div>
            </div>
          </div>
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
                  variant="contained"
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
                  color="secondary"
                  className={classes.button}
                >
                  Expired &nbsp;
                  <LockIcon style={{ fontSize: 12 }} />
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={() => updateHandler(item.IDAssignment)}
                >
                  <EditIcon style={{ fontSize: 12 }} />
                  &nbsp; Upload Assignment
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
