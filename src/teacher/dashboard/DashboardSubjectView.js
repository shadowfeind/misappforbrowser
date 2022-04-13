import { makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { getDashboardContentAction } from "./DashboardActions";
import DashboardSubjectViewList from "./DashboardSubjectViewList";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import ShareIcon from "@material-ui/icons/Share";
import AssignmentIcon from "@material-ui/icons/Assignment";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import SettingsIcon from "@material-ui/icons/Settings";

const useStyles = makeStyles((theme) => ({
  dashSubView: {
    backgroundColor: "#fff",
    height: "95vh",
    "& h1": {
      fontSize: "16px",
      textAlign: "center",
      margin: "0",
      padding: "20px 0",
      borderBottom: "1px solid #d3d3d3",
    },
    "& a": {
      textDecoration: "none",
      color: "#666",
    },
  },
}));

const DashboardSubjectView = () => {
  const [currentSubject, setCurrentSubject] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();

  const classes = useStyles();

  const { dashboardContent } = useSelector(
    (state) => state.getDashboardContent
  );
  let currentSubjectHolder;
  useEffect(() => {
    if (!dashboardContent) {
      dispatch(getDashboardContentAction());
    }
    if (dashboardContent) {
      currentSubjectHolder =
        dashboardContent.searchFilterModel.ddlSubject.filter(
          (x) => x.Key === Number(id)
        );
      setCurrentSubject([...currentSubjectHolder]);
    }
  }, [dispatch, dashboardContent]);

  const list = [
    {
      id: 1,
      name: "Assignment",
      route: "assignment",
      icon: AssignmentIcon,
    },
    { id: 2, name: "Resources", route: "resources", icon: ImportContactsIcon },
    { id: 3, name: "Syllabus", route: "syllabus", icon: SettingsIcon },
    { id: 4, name: "Old Question", route: "old-questions", icon: ShareIcon },
    {
      id: 5,
      name: "Notification",
      route: "notification",
      icon: NotificationsActiveIcon,
    },
  ];

  return (
    <div className={classes.dashSubView}>
      <h1>{currentSubject.length > 0 && currentSubject[0].Value}</h1>
      <div>
        {list.map((s) => (
          <Link to={`/${s.route}/${id}`} key={s.id}>
            <DashboardSubjectViewList list={s} key={s.id} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DashboardSubjectView;
