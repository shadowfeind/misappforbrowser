import React, { useState } from "react";
import { Button, Collapse, makeStyles } from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import EditIcon from "@material-ui/icons/Edit";
import { useDispatch } from "react-redux";
import ListForTable from "../../../components/ListForTable";
import { GET_SINGLE_TO_CREATE_LEAVE_REQUESTS_RESET } from "../TeacherLeaveRequestConstants";
import {
  downloadLeaveRequestAction,
  getSingleEditSentLeaveRequestAction,
} from "../TeacherLeaveRequestActions";

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

const InboxListCollapse = ({ item, setOpenPopUp, setOpenPopupDelete }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();
  const handleClick = () => {
    setOpen(!open);
  };
  const updateCollegeHandler = (id) => {
    dispatch(getSingleEditSentLeaveRequestAction(id));
    dispatch({ type: GET_SINGLE_TO_CREATE_LEAVE_REQUESTS_RESET });
    setOpenPopUp(true);
  };

  const downloadHandler = (id) => {
    dispatch(downloadLeaveRequestAction(id));
  };

  return (
    <>
      <ListForTable onClick={handleClick}>
        <p>
          ({item.FirsName}) {item.LeaveDecription?.slice(0, 15)}...
        </p>
        <div>{open ? <ExpandLess /> : <ExpandMore />}</div>
      </ListForTable>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <div className={classes.collapse}>
          <p>
            <span>Receiver</span> : {item.FirsName}
            {item.MiddleName}
            {item.LastName}
          </p>
          <p>
            <span>Date</span> : {item.FromDate?.slice(0, 10)} /{" "}
            {item.ToDate?.slice(0, 10)}
          </p>
          <p>
            <span>Status</span> : {item.Status}
          </p>
          <p>
            <span>Description</span> : {item.LeaveDecription}
          </p>
          <p>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => updateCollegeHandler(item.IDLeaveRequest)}
            >
              <EditIcon style={{ fontSize: 12 }} />
            </Button>
            <Button
              variant="contained"
              color="default"
              className={classes.button}
              onClick={() => downloadHandler(item.IDLeaveRequest)}
            >
              <CloudDownloadIcon style={{ fontSize: 12 }} />
            </Button>
          </p>
        </div>
      </Collapse>
    </>
  );
};

export default InboxListCollapse;
