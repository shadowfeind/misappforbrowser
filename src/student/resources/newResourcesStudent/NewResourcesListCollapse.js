import React, { useState } from "react";
import { Button, Collapse, makeStyles } from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ListForTable from "../../../components/ListForTable";

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

const NewResourcesListCollapse = ({ item }) => {
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
            {item.CourseName[0]}
          </span>
          <span style={{ paddingLeft: "12px" }}>{item.CourseName}</span>{" "}
        </p>
        <div>{open ? <ExpandLess /> : <ExpandMore />}</div>
      </ListForTable>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <div className={classes.collapse}>
          <p>
            <span>CourseDescription</span> : {item.CourseDescription}
          </p>
          <p>
            <span>PostedBy</span> : {item.PostedBy}
          </p>
          <p>
            <span>EffectiveForm</span> :{item.EffectiveForm?.slice(0, 10)}
          </p>
          <p>
            <span>IsActive</span> : {item.isActive ? "Active" : "InActive"}
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
    </>
  );
};

export default NewResourcesListCollapse;
