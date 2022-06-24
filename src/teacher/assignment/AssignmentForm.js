import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  Button,
  Grid,
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { useDispatch } from "react-redux";
import InputControl from "../../components/controls/InputControl";
import { useForm, Form } from "../../customHooks/useForm";
import DatePickerControl from "../../components/controls/DatePickerControl";
import { postTeacherAssignmentAction } from "./AssignmentActions";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

const initialFormValues = {
  IDAssignment: 0,
  IDHREmployee: 0,
  IDFacultyProgramLink: 0,
  IDAcademicYear: 0,
  IDAcademicFacultySubjectLink: 0,
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
  TotalMark: "",
  MarksObtained: "",
  AssignmentSubmitCode: 0,
  AssignmentDate: "2022-02-02T00:00:00",
  DueDate: "2022-02-02T00:00:00",
  SubmittedDate: "",
  CreatedBy: "",
  FullName: "",
  FirstName: "",
  MiddleName: "",
  LastName: "",
  RollNo: "",
  MobileNumber: "",
  SubjectName: "",
  IsActive: false,
  Created_On: "0001-01-01T00:00:00",
  Updated_On: "0001-01-01T00:00:00",
};

const StyledTableCell = withStyles((theme) => ({
  root: {
    padding: "0 12px",
  },
  head: {
    backgroundColor: theme.palette.common.grey,
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
const useStyles = makeStyles({
  table: {
    minWidth: 300,
  },
});

const AssignmentForm = ({ students, setOpenPopup, formDatas }) => {
  const [checked, setChecked] = useState(false);
  const [image, setImage] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [lstStudents, setLstStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [submitDisabler, setSubmitDisabler] = useState(false);

  const classes = useStyles();
  const dispatch = useDispatch();

  const { values, setValues, handleInputChange, errors, setErrors } =
    useForm(initialFormValues);

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    temp.AssignmentName = !fieldValues.AssignmentName
      ? "This feild is required"
      : !fieldValues.AssignmentName.trim()
      ? "This feild is required"
      : "";

    temp.TotalMark = !fieldValues.TotalMark ? "This feild is required" : "";

    temp.lstStudents =
      selectedStudents?.length < 1 ? "Select atleast one student" : "";

    temp.DueDate =
      fieldValues.DueDate == null || fieldValues.DueDate == ""
        ? "This feild is required"
        : "";

    temp.AssignmentDate =
      fieldValues.AssignmentDate == null || fieldValues.AssignmentDate == ""
        ? "This feild is required"
        : "";

    temp.AssignmentSummary = !fieldValues.AssignmentSummary
      ? "This feild is required"
      : !fieldValues.AssignmentSummary.trim()
      ? "This feild is required"
      : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  useEffect(() => {
    if (students) {
      setLstStudents([...students]);
    }
  }, [students]);

  useEffect(() => {
    if (formDatas) {
      setValues({ ...formDatas });
    }
  }, [formDatas]);

  const handleAllChecked = (checked) => {
    setChecked(checked);
    if (checked) {
      setSelectedStudents([...students]);
    } else {
      setSelectedStudents([]);
    }
  };

  const handleChecked = (checked, obj) => {
    if (!checked) {
      setSelectedStudents((prev) => {
        let newCheckList = prev.filter(
          (x) => x.IDHREmployee !== obj.IDHREmployee
        );
        return [...newCheckList];
      });
    } else {
      setSelectedStudents((prev) => [...prev, obj]);
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

  const takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Prompt,
      // source: CameraSource.Camera,
    });

    console.log("image", image);
    const imageUrl = image?.path || image?.webPath;
    setImgSrc(Capacitor.convertFileSrc(imageUrl));
    console.log("imageurl", imageUrl);

    const result = await fetch(Capacitor.convertFileSrc(imageUrl));
    console.log("my result", result);
    const blob = await result.blob();
    const file = new File([blob], "image.jpeg", { type: blob.type });
    console.log("my file", file);
    setImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmitDisabler(true);
      dispatch(postTeacherAssignmentAction(image, values, selectedStudents));
    }
  };
  return (
    <>
      <TableContainer style={{ maxHeight: "260px" }} component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead style={{ backgroundColor: "#253053", color: "#fff" }}>
            <TableRow>
              <StyledTableCell style={{ textAlign: "left" }}>
                <Checkbox
                  checked={checked}
                  onChange={(e) => handleAllChecked(e.target.checked)}
                />
              </StyledTableCell>
              <StyledTableCell style={{ color: "#fff" }}>
                Student Name{" "}
                <span style={{ color: "666", fontSize: "10px" }}>(RollNo)</span>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lstStudents &&
              lstStudents
                .sort((a, b) => a.RollNo - b.RollNo)
                .map((s) => (
                  <StyledTableRow key={s.IDHREmployee}>
                    <StyledTableCell
                      component="th"
                      scope="row"
                      style={{ textAlign: "left" }}
                    >
                      <Checkbox
                        checked={
                          selectedStudents.filter(
                            (x) => x.IDHREmployee === s.IDHREmployee
                          ).length > 0
                            ? true
                            : false
                        }
                        onChange={(e) => handleChecked(e.target.checked, s)}
                      />
                    </StyledTableCell>
                    {/* <StyledTableCell component="th" scope="row">
                      {s.RollNo}
                    </StyledTableCell> */}
                    <StyledTableCell component="th" scope="row">
                      {s.FullName}{" "}
                      <span style={{ color: "666", fontSize: "10px" }}>
                        ({s.RollNo})
                      </span>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ height: "30px" }}></div>
      <Form onSubmit={handleSubmit}>
        <InputControl
          name="AssignmentName"
          label="Assignment Name"
          value={values.AssignmentName}
          onChange={handleInputChange}
          errors={errors.AssignmentName}
        />

        <DatePickerControl
          name="AssignmentDate"
          label="FromDate"
          value={values.AssignmentDate}
          onChange={handleInputChange}
          errors={errors.AssignmentDate}
          style={{ width: "80%" }}
        />
        <DatePickerControl
          name="DueDate"
          label="DueDate*"
          value={values.DueDate}
          onChange={handleInputChange}
          errors={errors.DueDate}
        />
        <InputControl
          name="TotalMark"
          label="Full Marks*"
          type="number"
          value={values.TotalMark}
          onChange={handleInputChange}
          errors={errors.TotalMark}
        />
        <InputControl
          name="AssignmentSummary"
          label="Assignment Summery"
          value={values.AssignmentSummary}
          onChange={handleInputChange}
          errors={errors.AssignmentSummary}
        />

        {/* <InputControl
          name="ImageUploaded"
          // label="Select File"
          // value={values.ClassLocation}
          onChange={(e) => handleImage(e)}
          type="file"
          errors={errors.image}
        /> */}
        <div style={{ height: "5px" }}></div>
        <button
          style={{
            backgroundColor: "#253053",
            color: "#fff",
            padding: "6px 14px",
            display: "block",
            marginLeft: "5px",
          }}
          onClick={() => takePicture()}
        >
          Take a photo
        </button>
        <div style={{ height: "5px" }}></div>

        {imgSrc && (
          <img
            src={
              imgSrc ? imgSrc : formDatas && `${API_URL}${formDatas.FullPath}`
            }
            height={200}
            width={200}
          />
        )}
        <div style={{ textAlign: "center", color: "red" }}>
          {errors.lstStudents && errors.lstStudents}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            marginBottom: "10px",
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setOpenPopup(false)}
            style={{
              margin: "10px 0 0 10px",
              padding: "5px 10px",
              fontsize: "12px",
            }}
          >
            CANCEL
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={submitDisabler}
            style={{
              margin: "10px 0 0 10px",
              padding: "5px 10px",
              fontsize: "12px",
            }}
          >
            {submitDisabler ? "PROCESSING..." : "SUBMIT"}
          </Button>
        </div>
      </Form>
    </>
  );
};

export default AssignmentForm;
