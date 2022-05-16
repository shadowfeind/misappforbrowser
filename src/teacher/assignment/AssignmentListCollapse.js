import React, { useState } from "react";
import FilerobotImageEditor, {
  TABS,
  TOOLS,
} from "react-filerobot-image-editor";
import { Button, Collapse, makeStyles } from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ListForTable from "../../components/ListForTable";
import {
  downloadAssignmentAction,
  downloadSubmittedAssignmentAction,
  getSingleAssignmentAction,
  getSingleToEditTeacherAssignmentAction,
  putSingleToEditTeacherAssignmentStudentAction,
} from "./AssignmentActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import LockIcon from "@material-ui/icons/Lock";
import Popup from "../../components/Popup";
import { API_URL } from "../../constants";

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

const AssignmentListCollapse = ({ item, setOpenPopup3 }) => {
  const [isImgEditorShown, setIsImgEditorShown] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [imgToEdit, setImgToEdit] = useState("");
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  const { singleTeacherAssignment } = useSelector(
    (state) => state.getSingleToEditTeacherAssignment
  );

  const downloadHandler = (id) => {
    dispatch(downloadAssignmentAction(id));
  };
  const updateHandler = (id) => {
    dispatch(getSingleToEditTeacherAssignmentAction(id));
    setOpenPopup3(true);
  };
  const downloadSubmittedHandler = async (name, id) => {
    dispatch(getSingleToEditTeacherAssignmentAction(id));
    // /Upload/TeacherAssignment/7d83cece-a6f0-4a9a-9d1d-c6f14db994031.jpeg;
    // console.log("this is name", name);
    // let imageURL = `https://api.codetabs.com/v1/proxy?quest=${name}`;
    let imageURL = `http://103.90.86.151:5000/api/getImage?q=${API_URL}${name}`;

    // let imageURL = "";
    // fetch(imageURL)
    //   .then((response) => console.log(response))
    //   .catch((err) => console.log(err));

    // let downloadedImg = new Image();
    // downloadedImg.crossOrigin = "Anonymous";
    // downloadedImg.src = imageURL;
    // setImgToEdit(downloadedImg.src);
    setImgToEdit(imageURL);
    setIsImgEditorShown(true);
    setOpenPopup(true);
  };
  const handleClick = () => {
    setOpen(!open);
  };

  const closeImgEditor = () => {
    setIsImgEditorShown(false);
    setOpenPopup(false);
  };

  const saveHandler = (editedImageObject, designState) => {
    dispatch(
      putSingleToEditTeacherAssignmentStudentAction(
        editedImageObject,
        singleTeacherAssignment?.dbTeacherAssignmentModel
      )
    );
    console.log("editedImageObject", editedImageObject);
    console.log("designState", designState);
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
              {item.AssignmentName?.slice(0, 18)}
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
            {item.DocumentSubmitted && (
              <div
                style={{
                  paddingLeft: "18px",
                }}
              >
                <img
                  width="30px"
                  height="30px"
                  src={`${API_URL}${item.DocumentSubmitted}`}
                />
              </div>
            )}
          </div>
          <div>
            {" "}
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
              <span>Assignment Name</span> : {item.AssignmentName.slice(0, 10)}
            </p>
            <p>
              <span>Assignment Date</span> : {item.AssignmentDate.slice(0, 10)}
            </p>
            <p>
              <span>DueDate</span> : {item.DueDate.slice(0, 10)}
            </p>
            <p>
              <span>Total Mark</span> :{item.TotalMark}
            </p>
            <p>
              <span>Obtained Marks</span> : {item.ObtainedMarks}
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
                  onClick={() =>
                    downloadSubmittedHandler(
                      item.DocumentSubmitted,
                      item.IDAssignment
                    )
                  }
                >
                  Student &nbsp;
                  <CloudDownloadIcon style={{ fontSize: 12 }} />
                </Button>
              )}
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => updateHandler(item.IDAssignment)}
              >
                Edit &nbsp;
                <EditIcon style={{ fontSize: 12 }} />
              </Button>
            </p>
          </div>
        </Collapse>

        <Popup
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          title="Edit Assignment"
        >
          {isImgEditorShown && (
            <FilerobotImageEditor
              source={imgToEdit && imgToEdit}
              // source="https://scaleflex.airstore.io/demo/stephen-walker-unsplash.jpg"
              // source="https://vidyacube.com/Upload/Syllabus/6mandir.jpg"
              onSave={(editedImageObject, designState) =>
                saveHandler(editedImageObject, designState)
              }
              onClose={closeImgEditor}
              annotationsCommon={{
                fill: "#ff0000",
              }}
              Text={{ text: "Filerobot..." }}
              tabsIds={[TABS.ADJUST, TABS.ANNOTATE]} // or {['Adjust', 'Annotate', 'Watermark']}
              defaultTabId={TABS.ANNOTATE} // or 'Annotate'
              defaultToolId={TOOLS.TEXT} // or 'Text'
            />
          )}
        </Popup>
      </div>
    </div>
  );
};

export default AssignmentListCollapse;
