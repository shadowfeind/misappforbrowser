import React, { useState } from "react";
import { Collapse, makeStyles } from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

import ListForTable from "../../../components/ListForTable";

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

const ExamMarkApprovalListCollapse = ({ item }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
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
          <span
            style={{
              padding: "8px 10px",
              borderRadius: "50%",
              fontSize: "12px",
              color: "#fff",
              backgroundColor: "#253053",
            }}
          >
            {item.RollNo}
          </span>
          <span style={{ paddingLeft: "12px" }}>{item.FullName}</span>{" "}
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
            <span>FullMark</span> : {item.FullMark}
          </p>
          <p>
            <span>FullMarkPractical</span> : {item.FullMarkPractical}
          </p>
          <p>
            <span>ObtainedMark</span> :{item.ObtainedMark}
          </p>
          <p>
            <span>ObtainedMarkPractical</span> : {item.ObtainedMarkPractical}
          </p>
          <p>
            <span>Status</span> : {item.Status}
          </p>
        </div>
      </Collapse>
    </div>
    </div>
  );
};

export default ExamMarkApprovalListCollapse;
