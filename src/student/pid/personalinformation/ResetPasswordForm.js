import React, { useEffect, useState } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../../components/controls/InputControl";
import { useForm, Form } from "../../../customHooks/useForm";
import { useDispatch } from "react-redux";
import SelectControl from "../../../components/controls/SelectControl";
import DatePickerControl from "../../../components/controls/DatePickerControl";
import { postStudentPasswordAction } from "./PersonalInformationActions";

const initialFormValues = {
  IDUser: 0,
  NewPassword: "",
  ConfirmPassword: "",
};

const ResetPasswordForm = (userId, setResetOpenPopup) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const validate = () => {
    let temp = { ...errors };

    temp.newPassword = !newPassword
      ? "This feild is required"
      : newPassword && newPassword?.length <= 5
      ? "Must be More than 5 Characters."
      : "";

    temp.confirmPassword = !confirmPassword
      ? "This feild is required"
      : confirmPassword !== newPassword
      ? "Must Match The Password"
      : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(postStudentPasswordAction(userId, newPassword, confirmPassword));
    }
  };

  const symbolsArr = ["e", "E", "+", "-", ".", "ArrowUp", "ArrowDown"];

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container style={{ fontSize: "12px" }}>
        <Grid item xs={12}>
          <InputControl
            name="NewPassword"
            label="New Password*"
            onKeyDown={(e) => newPassword?.length > 160 && e.preventDefault()}
            onFocus={(e) => {
              e.target.select();
            }}
            value={newPassword}
            type="Password"
            onChange={(e) => setNewPassword(e.target.value)}
            errors={errors.NewPassword}
          />
        </Grid>
        <Grid item xs={12}>
          <InputControl
            name="ConfirmPassword"
            label="Confirm Password*"
            value={confirmPassword}
            onFocus={(e) => {
              e.target.select();
            }}
            onKeyDown={(e) =>
              confirmPassword?.length > 159 &&
              e.key !== "Backspace" &&
              e.preventDefault()
            }
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="Password"
            errors={errors.ConfirmPassword}
          />
        </Grid>
      </Grid>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          paddingTop: "10px",
          marginTop: "10px",
          borderTop: "1px solid #f3f3f3",
        }}
      >
        {/* <Button
          variant="contained"
          color="secondary"
          onClick={() => setResetOpenPopup(false)}
          style={{ margin: "10px 0 0 10px" }}
        >
          CANCEL
        </Button> */}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ margin: "10px 0 0 10px" }}
        >
          SUBMIT
        </Button>
      </div>
    </Form>
  );
};

export default ResetPasswordForm;
