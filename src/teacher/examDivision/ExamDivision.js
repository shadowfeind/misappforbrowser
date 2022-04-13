import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";

import CustomContainer from "../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../components/Notification";

import { getAllExamDivisionAction } from "./ExamDivisionActions";

import { GET_ALL_EXAM_DIVISION_RESET } from "./ExamDivisionConstants";
import MobileTopSelectContainer from "../../components/MobileTopSelectContainer";
import ExamDivisionListCollapse from "./ExamDivisionListCollapse";

const useStyles = makeStyles((theme) => ({
  searchInput: {
    width: "75%",
    fontSize: "12px",
  },
  button: {
    position: "absolute",
    right: "10px",
  },
}));

const ExamDivision = () => {
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const classes = useStyles();

  const dispatch = useDispatch();

  const { examDivision, error } = useSelector(
    (state) => state.getAllExamDivision
  );

  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_ALL_EXAM_DIVISION_RESET });
  }

  useEffect(() => {
    if (!examDivision) {
      dispatch(getAllExamDivisionAction());
    }
  }, [dispatch, examDivision]);

  return (
    <>
      <CustomContainer>
        <MobileTopSelectContainer>
          <h3 style={{ margin: "0", textAlign: "center" }}>Exam Division</h3>
        </MobileTopSelectContainer>
        {examDivision &&
          examDivision?.dbModelLst.map((item) => (
            <ExamDivisionListCollapse item={item} key={item.$id} />
          ))}
      </CustomContainer>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};
export default ExamDivision;
