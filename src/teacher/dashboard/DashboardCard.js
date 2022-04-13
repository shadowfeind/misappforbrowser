import React from "react";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import AssignmentIcon from "@material-ui/icons/Assignment";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";

export const DashboardCard = ({ subject }) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      borderRadius: "10px",
      boxShadow: "2px 2px 2px 2px #d3d3d3",
      margin: "10px 5px",
      width: "98%",
    },
    CardContent: {
      padding: "20px 20px 0",
    },
    media: {
      height: 0,
      backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      paddingTop: "3%", // 16:9
    },
    topHeading: {
      color: "#000",
      fontSize: "16px",
      paddingBottom: "3px",
    },
    cardAction: {
      display: "flex",
      justifyContent: "space-between",
      "& h6": {
        display: "block",
        margin: "0",
        fontSize: "12px",
        fontWeight: "300",
        paddingLeft: "5px",
      },
    },
  }));
  const classes = useStyles();
  const history = useHistory();

  return subject ? (
    <Card className={classes.root} key={subject.Value}>
      <CardMedia
        className={classes.media}
        component="img"
        // image="https://i.ibb.co/5s20zQR/ss.jpg"
        title="Paella dish"
      />
      <CardContent className={classes.CardContent}>
        <Typography
          variant="body2"
          color="textSecondary"
          component="h4"
          className={classes.topHeading}
        >
          {subject.Value}{" "}
          <span style={{ textAlign: "right", fontSize: "16px", color: "#666" }}>
            {" "}
            - Credit 4
          </span>
        </Typography>

        <Typography
          variant="body2"
          color="textSecondary"
          component="h6"
          style={{ fontSize: "14px" }}
        >
          Suresh M. Sanu
        </Typography>
      </CardContent>
      <CardActions className={classes.cardAction}>
        <Link to={`/assignment/${subject.Key}`}>
          <IconButton aria-label="add to favorites">
            <AssignmentIcon style={{ fontSize: "16px" }} />
            <h6>Assignment</h6>
          </IconButton>
        </Link>
        <Link to={`/resources/${subject.Key}`}>
          <IconButton aria-label="share">
            <ImportContactsIcon style={{ fontSize: "16px" }} />
            <h6>Resources</h6>
          </IconButton>
        </Link>

        <IconButton aria-label="share">
          <NotificationsActiveIcon style={{ fontSize: "16px" }} />
          <h6>Notification</h6>
        </IconButton>
      </CardActions>
    </Card>
  ) : (
    <></>
  );
};
export default DashboardCard;
