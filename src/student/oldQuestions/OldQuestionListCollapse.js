import React, { useState } from "react";
import { Button, Collapse, makeStyles } from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ListForTable from "../../components/ListForTable";

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

const OldQuestionListCollapse = ({ item }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
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
            {item.OldQuestionName[0]}
          </span>
          <span style={{ paddingLeft: "12px" }}>{item.OldQuestionName}</span>{" "}
        </p>
        <div>{open ? <ExpandLess /> : <ExpandMore />}</div>
      </ListForTable>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <div className={classes.collapse}>
          <p>
            <span>Description</span> : {item.OldQuestionDescription}
          </p>
          <p>
            <span>Created On</span> : {item.Created_On?.slice(0, 10)}
          </p>
          <p>
            <span>Active Status</span> :{item.IsActive ? "active" : "notactive"}
          </p>
          <p>
            <span>Name</span> : {item.FirstName} {item.LastName}
          </p>
          <p>
            <Button
              variant="contained"
              color="default"
              className={classes.button}
              //   onClick={() => downloadHandler(item.IDAssignment)}
            >
              <CloudDownloadIcon style={{ fontSize: 12 }} />
            </Button>
          </p>
        </div>
      </Collapse>
    </>
  );
};

export default OldQuestionListCollapse;
