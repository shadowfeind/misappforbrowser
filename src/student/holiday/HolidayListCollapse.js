import { Collapse, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import ListForTable from "../../components/ListForTable";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
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

const HolidayListCollapse = ({ item }) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  const classes = useStyles();

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
            {item.HolidayName[0]}
          </span>
          <span style={{ paddingLeft: "12px" }}>{item.HolidayName}</span>{" "}
          <span
            style={{ fontSize: "10px", color: "#444", paddingLeft: "10px" }}
          >
            {item.FromDate.slice(0, 10)}
          </span>
        </p>
        <div>{open ? <ExpandLess /> : <ExpandMore />}</div>
      </ListForTable>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <div className={classes.collapse}>
          <p>
            <span>Holiday Name</span> : {item.HolidayName}
          </p>
          <p>
            <span>Holiday Description</span> : {item.Description}
          </p>
          <p>
            <span>From Date</span> : {item.FromDate.slice(0, 10)}
          </p>
          <p>
            <span>To Date</span> : {item.ToDate.slice(0, 10)}
          </p>
        </div>
      </Collapse>
    </>
  );
};

export default HolidayListCollapse;
