import React, { useState } from "react";
import { Button, Collapse, makeStyles } from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ListForTable from "../../components/ListForTable";
import { downloadResourceAction } from "./ResourcesActions";
import { useDispatch } from "react-redux";

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

const ResourcesListCollapse = ({ item }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const handleClick = () => {
    setOpen(!open);
  };
  const dispatch = useDispatch();
  const downloadHandler = (id) => {
    dispatch(downloadResourceAction(id));
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
              {item.Created_On.slice(0, 10)} <br />{" "}
            </div>
            <div style={{ paddingLeft: "18px", fontSize: "14px" }}>
              {item.CourseName}
              <div
                style={{ fontSize: "10px", color: "#444", marginTop: "-3px" }}
              >
                <div>{item.CourseDescription?.slice(0, 30)}...</div>
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
            <span>CourseDescription</span> : {item.CourseDescription}
          </p>
          <p>
            <span>Upload Date</span> : {item.Created_On?.slice(0, 10)}
          </p>
          <p>
            <span>Posted By</span> :{item.FirstName} {item.MiddleName} {item.LastName}
          </p>
          <p>
            <span>IsActive</span> : {item.isActive ? "Active" : "InActive"}
          </p>
          <p>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => downloadHandler(item.Id)}
            >Download &nbsp;
              <CloudDownloadIcon style={{ fontSize: 14 }} />
            </Button>
            {/* <Button
              variant="contained"
              color="primary"
              className={classes.button}
              //   onClick={() => updateHandler(item.IDAssignment)}
            >
              <EditIcon style={{ fontSize: 12 }} />
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
            >
              <DeleteIcon style={{ fontSize: 12 }} />
            </Button> */}
          </p>
        </div>
      </Collapse>
   </div>
   </div>
  );
};

export default ResourcesListCollapse;
