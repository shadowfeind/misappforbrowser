import React, { useEffect, useState } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../components/controls/InputControl";
import { useForm, Form } from "../../customHooks/useForm";
import { useDispatch } from "react-redux";
import DatePickerControl from "../../components/controls/DatePickerControl";
import { API_URL } from "../../constants";
import SelectControl from "../../components/controls/SelectControl";
import {
  studentPostLeaveRequestAction,
  studentPutLeaveRequestAction,
} from "./StudentLeaveRequestActions";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

const initialFormValues = {
  IDLeaveRequest: 0,
  SenderID: 0,
  ReceiverID: 0,
  LeaveDecription: "",
  Status: "",
  DocumentName: "",
  FromDate: "2022-04-16T08:14:34.805Z",
  ToDate: "2022-04-16T08:14:34.805Z",
  IDHRCompany: 0,
  IsActive: true,
  Created_On: "2022-04-16T08:14:34.805Z",
  Updated_On: "2022-04-16T08:14:34.805Z",
};

const StudentLeaveRequestForm = ({
  leaveRequestEdit,
  leaveRequestCreate,
  setOpenPopUp,
}) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const [submitDisabler, setSubmitDisabler] = useState(false);

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    temp.LeaveDecription = !fieldValues.LeaveDecription
      ? "This feild is required"
      : fieldValues.LeaveDecription && fieldValues.LeaveDecription?.length > 160
      ? "Must be less than 160 characters"
      : "";

    temp.ReceiverID = !fieldValues.ReceiverID ? "This feild is required" : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, handleInputChange, errors, setErrors } =
    useForm(initialFormValues);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      setSubmitDisabler(true);
      if (values.IDLeaveRequest === 0) {
        dispatch(
          studentPostLeaveRequestAction(
            values,
            image,
            leaveRequestCreate.SchoolShortName
          )
        );
      } else {
        dispatch(studentPutLeaveRequestAction(values, image));
      }
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

  useEffect(() => {
    if (leaveRequestCreate) {
      setValues({
        ...leaveRequestCreate.dbModel,
        ReceiverID: leaveRequestCreate?.ddlTeacher[0].Key,
      });
    }
  }, [leaveRequestCreate]);

  useEffect(() => {
    if (leaveRequestEdit) {
      setValues({ ...leaveRequestEdit.dbModel });
    }
  }, [leaveRequestEdit]);

  const gender = [{ Key: "", Value: "" }];

  return (
    <div style={{ padding: "12px" }}>
      <SelectControl
        name="ReceiverID"
        label="ReceiverID"
        value={values.ReceiverID}
        onChange={handleInputChange}
        options={
          leaveRequestEdit
            ? leaveRequestEdit.ddlTeacher
            : leaveRequestCreate
            ? leaveRequestCreate.ddlTeacher
            : gender
        }
        errors={errors.ReceiverID}
      />
      <div style={{ height: "10px" }}></div>
      <InputControl
        name="LeaveDecription"
        label="Leave Decription*"
        onFocus={(e) => {
          e.target.select();
        }}
        multiline
        rows={4}
        value={values.LeaveDecription}
        onChange={handleInputChange}
        errors={errors.LeaveDecription}
      />
      <div style={{ height: "10px" }}></div>
      <DatePickerControl
        name="FromDate"
        label="FromDate*"
        value={values.FromDate}
        onChange={handleInputChange}
        errors={errors.FromDate}
      />
      <div style={{ height: "10px" }}></div>
      <DatePickerControl
        name="ToDate"
        label="ToDate*"
        value={values.ToDate}
        onChange={handleInputChange}
        errors={errors.ToDate}
      />
      <div style={{ height: "10px" }}></div>
      <SelectControl
        name="Status"
        label="Status"
        value={values.Status}
        onChange={handleInputChange}
        options={
          leaveRequestEdit
            ? leaveRequestEdit.ddlStatus
            : leaveRequestCreate
            ? leaveRequestCreate.ddlStatus
            : gender
        }
      />
      <div style={{ height: "10px" }}></div>
      <SelectControl
        name="IsActive"
        label="IsActive"
        value={values.IsActive}
        onChange={handleInputChange}
        options={
          leaveRequestEdit
            ? leaveRequestEdit.ddlIsActive
            : leaveRequestCreate
            ? leaveRequestCreate.ddlIsActive
            : gender
        }
      />
      <div style={{ height: "10px" }}></div>
      {/* <InputControl
        name="ImageUploaded"
        onChange={(e) => handleImage(e)}
        type="file"
      /> */}
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
      <img
        src={
          imgSrc
            ? imgSrc
            : leaveRequestEdit && `${API_URL}${leaveRequestEdit.FullPath}`
        }
        height={200}
        width={200}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "end",
          paddingTop: "10px",
          marginTop: "10px",
          borderTop: "1px solid #f3f3f3",
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setOpenPopUp(false)}
          style={{ margin: "10px 0 0 10px" }}
        >
          CANCEL
        </Button>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ margin: "10px 0 0 10px" }}
          disabled={submitDisabler}
          onClick={handleSubmit}
        >
          {submitDisabler ? "PROCESSING..." : "SUBMIT"}
        </Button>
      </div>
    </div>
  );
};

export default StudentLeaveRequestForm;
