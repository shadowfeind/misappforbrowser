import React, { useEffect, useState } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../components/controls/InputControl";
import CheckBoxControl from "../../components/controls/CheckBoxControl";
import { useForm, Form } from "../../customHooks/useForm";
import { useDispatch } from "react-redux";
import { postResourceAction } from "./ResourcesActions";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

const initialFormValues = {
  Id: 0,
  IDTeacher: 0,
  IDYearFacultyLink: 0,
  IDAcademicFacultySubjectLink: 0,
  Level: 0,
  Section: 0,
  IDAcademicShift: 0,
  CourseName: "",
  CourseDescription: "",
  DocumentFile: "",
  FirstName: "",
  MiddleName: "",
  LastName: "",
  IsActive: true,
  Created_On: "2022-02-02T09:24:30.676Z",
  Updated_On: "2022-02-02T09:24:30.676Z",
};

const ResourcesForm = ({ setOpenPopup, searchFilterModel, dbModel }) => {
  const [image, setImage] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);

  const dispatch = useDispatch();
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    temp.CourseName = !fieldValues.CourseName
      ? "This feild is required"
      : !fieldValues.CourseName.trim()
      ? "This feild is required"
      : "";

    temp.CourseDescription = !fieldValues.CourseDescription
      ? "This feild is required"
      : !fieldValues.CourseDescription.trim()
      ? "This feild is required"
      : "";

    temp.image = !image ? "This feild is required" : "";
    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, handleInputChange, errors, setErrors } =
    useForm(initialFormValues);

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

  const handleImage = (event) => {
    let imageFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (x) => {
      setImgSrc(x.target.result);
    };
    reader.readAsDataURL(imageFile);
    setImage(event.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(postResourceAction(image, values, searchFilterModel, dbModel));
    }
  };
  return (
    <>
      <InputControl
        name="CourseName"
        label="Resource Name"
        value={values.CourseName}
        onChange={handleInputChange}
        errors={errors.CourseName}
      />

      <div style={{ height: "5px" }}></div>
      <InputControl
        name="CourseDescription"
        label="Resource Description"
        value={values.CourseDescription}
        onChange={handleInputChange}
        errors={errors.CourseDescription}
      />

      <div style={{ height: "10px" }}></div>
      <InputControl
        name="ImageUploaded"
        // label="Select File"
        onChange={(e) => handleImage(e)}
        type="file"
        errors={errors.image}
      />
      <div style={{ height: "10px" }}></div>
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
      <div style={{ height: "10px" }}></div>

      {imgSrc && <img src={imgSrc} height={200} width={200} />}
      <div style={{ height: "10px" }}></div>
      <CheckBoxControl
        label="isActive"
        value={values.IsActive}
        onChange={handleInputChange}
        name="isActive"
      />

      <div
        style={{
          display: "flex",
          justifyContent: "start",
          paddingTop: "10px",
          marginTop: "10px",
          borderTop: "1px solid #f3f3f3",
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setOpenPopup(false)}
          style={{ margin: "10px 0 0 10px" }}
        >
          CANCEL
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          style={{ margin: "10px 0 0 10px" }}
        >
          SUBMIT
        </Button>
      </div>
    </>
  );
};

export default ResourcesForm;
