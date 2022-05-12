import React, { useState } from "react";
import { Button, Collapse, makeStyles } from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { useDispatch } from "react-redux";
import ListForTable from "../../components/ListForTable";
import { useHistory } from "react-router-dom";

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

  const AnnouncementTeacherListCollapse = ({ item, facultySubject, setOpenPopup }) => {
    const [open, setOpen] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
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
              <div className={classes.listWrapper}>
                <div style={{ fontSize: "12px", color: "#666" }}>
                  {item.Created_On.slice(0, 10)} 
                  
                </div>
                <div
                  style={{
                    paddingLeft: "18px",
                    fontSize: "14px",
                    // fontWeight: "bolder",
                  }}
                >
                  {item.NewsHeading?.slice(0,10)}...
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
                  <span>Title</span> : {item.NewsHeading}
                </p>
                <p>
                  <span>Announcement</span> : {item.NewsDescription}
                </p>
                <p>
                  <span>Posted Date</span> : {item.Created_On?.slice(0,10)}
                </p>
              </div>
            </Collapse>
          </div>
        </div>
      );
    };
    
    export default AnnouncementTeacherListCollapse;