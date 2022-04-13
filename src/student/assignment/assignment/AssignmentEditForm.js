import React, { useState, useEffect } from "react";
import { Button, Grid, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import InputControl from "../../../components/controls/InputControl";
import { useForm, Form } from "../../../customHooks/useForm";
import LoadingComp from "../../../components/LoadingComp";
import { putSingleAssignmentStudentAction } from "./AssignmentActions";
import { Link, useParams } from "react-router-dom";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import Notification from "../../../components/Notification";
import {
  GET_SINGLE_ASSIGNMENT_STUDENT_RESET,
  PUT_SINGLE_ASSIGNMENT_STUDENT_RESET,
} from "./AssignmentConstant";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";

const initialFormValues = {
  IDAssignment: 0,
  IDHREmployee: 0,
  IDFacultyProgramLink: 0,
  IDAcademicYear: 0,
  IDAcademicSubject: 0,
  IDLevel: 0,
  Section: 0,
  IDAcademicShift: 0,
  ReceiverID: 0,
  AssignmentName: "",
  AssignmentSummary: "",
  TeacherComment: "",
  StudentComment: "",
  FolderName: "",
  DocumentName: "",
  DocumentSubmitted: "",
  TotalMark: 0,
  MarksObtained: "",
  AssignmentSubmitCode: 0,
  AssignmentDate: "2022-02-03T00:00:00",
  AssignmentTime: "00:00:00",
  DueTime: "00:00:00",
  DueDate: "2022-02-03T00:00:00",
  SubmittedDate: "0001-01-01T00:00:00",
  CreatedBy: "",
  TeacherMobileNumber: "",
  FullName: "",
  RollNo: "",
  MobileNumber: "",
  SubjectName: "",
  UniversityRegistrationNumber: "",
  IsActive: true,
  Created_On: "2022-02-03T16:28:30.4451629",
  Updated_On: "0001-01-01T00:00:00",
};

const useStyles = makeStyles((theme) => ({
  editContainer: {
    padding: "20px",
    zIndex: "10000",
  },
  editTopHeader: {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid #d3d3d3",
    paddingBottom: "12px",
    "& svg": {
      marginBottom: "-6px",
    },
    "& a": {
      textDecoration: "none",
      color: "#000",
    },
  },
}));

const AssignmentEditForm = () => {
  const [image, setImage] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const { id: subjectId } = useParams();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const { values, setValues, handleInputChange, errors, setErrors } =
    useForm(initialFormValues);

  const { singleAssignment,loading, error: singleAssignmentError } = useSelector(
    (state) => state.getSingleAssignmentStudent
  );
  const {
    success: putSingleAssignmentSuccess,
    error: putSingleAssignmentError,
  } = useSelector((state) => state.putSingleAssignmentStudent);

  if (putSingleAssignmentSuccess) {
    dispatch({ type: GET_SINGLE_ASSIGNMENT_STUDENT_RESET });
    history.push(`/student-assignment-front/${subjectId}`);
    dispatch({ type: PUT_SINGLE_ASSIGNMENT_STUDENT_RESET });
  }

  if (singleAssignmentError) {
    setNotify({
      isOpen: true,
      message: singleAssignmentError,
      type: "error",
    });
    dispatch({ type: GET_SINGLE_ASSIGNMENT_STUDENT_RESET });
  }

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    temp.image = !image ? "Image is required" : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(putSingleAssignmentStudentAction(image, values));
    }
  };

  const handleImage = (event) => {
    let imageFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (x) => {
      setImgSrc(x.target.result);
    };
    reader.readAsDataURL(imageFile);
    setImage(event.target.files[0]);
  };

  useEffect(() => {
    if (singleAssignment) {
      setValues({ ...singleAssignment.dbStudentSubmissionModel });
    }
  }, [singleAssignment]);

  const takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      // source: CameraSource.Prompt,
      source: CameraSource.Camera,
    });

    console.log("image", image);
    const imageUrl = image?.path || image?.webPath;
    setImgSrc(imageUrl);
    console.log("imageurl", imageUrl);

    const result = await fetch(imageUrl);
    console.log("my result", result);
    const blob = await result.blob();
    const file = new File([blob], "image.jpeg", { type: blob.type });
    console.log("my file", file);
    setImage(file);
  };

  const goBack = () => {
    dispatch({ type: GET_SINGLE_ASSIGNMENT_STUDENT_RESET });
    history.push(`/student-assignment-front/${subjectId}`);
  };

  return (
    <>
      <div className={classes.editContainer} style={{ marginBottom: "70px" }}>
      {loading ? (
          <LoadingComp />
        ) : (
          <>
        <div className={classes.editTopHeader}>
          <div onClick={goBack}>
            <KeyboardBackspaceIcon /> &nbsp;&nbsp;Go Back
          </div>{" "}
          <span>Assignment Edit</span>
        </div>
        <div>
          <p>
            <strong>Assignment Name: </strong>
            {values.AssignmentName}
          </p>
          <p>
            <strong>FullName: </strong>
            {values.CreatedBy}
          </p>
          <p>
            <strong>Assignment Date: </strong>
            {values.AssignmentDate?.slice(0, 10)}
          </p>
          <p>
            <strong>Due Date: </strong>
            {values.DueDate?.slice(0, 10)}
          </p>
          <p>
            <strong>Mobile Number: </strong>
            {values.TeacherMobileNumber}
          </p>

          <p>
            <strong>Assignment Summary: </strong>
            {values.AssignmentSummary}
          </p>
          <p>
            <strong>Full Marks: </strong>
            {values.TotalMark}
          </p>
          <p>
            <strong>MarksObtained: </strong>
            {values.MarksObtained}
          </p>
          <p>
            <strong>Teacher's Comment: </strong>
            {values.TeacherComment}
          </p>
          <p>
            <strong>Student's Comment: </strong>
            {values.StudentComment}
          </p>
        </div>
        <InputControl
          name="StudentComment"
          label="StudentComment"
          value={values.StudentComment}
          onChange={handleInputChange}
          style={{ width: "100%", marginBottom: "10px" }}
        />
        <InputControl
          name="ImageUploaded"
          label="Select File"
          // value={image}
          onChange={(e) => handleImage(e)}
          type="file"
          style={{ width: "100%", marginBottom: "10px" }}
          errors={errors.image}
        />
        <h5>OR</h5>
        <button
          style={{
            backgroundColor: "#253053",
            color: "#fff",
            padding: "6px 14px",
            display: "block",
          }}
          onClick={() => takePicture()}
        >
          Take a photo
        </button>
        {imgSrc && <img src={imgSrc} height={150} width={150} />}
        <div
          style={{
            display: "block",
            borderTop: "1px solid #d3d3d3",
            marginBottom: "-18px",
            marginTop: "12px",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ margin: "10px 0 0 10px" }}
            onClick={handleSubmit}
          >
            SUBMIT
          </Button>
        </div>
        </>
        )}
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default AssignmentEditForm;
