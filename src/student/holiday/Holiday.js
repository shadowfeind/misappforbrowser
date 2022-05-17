import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment, { months } from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getAllHolidayAction } from "./HolidayActions";
import { GET_ALL_HOLIDAY_RESET } from "./HolidayConstants";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Notification from "../../components/Notification";
import DateToIso from "../../components/DateToIso";
import HolidayListCollapse from "./HolidayListCollapse";

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

const localizer = momentLocalizer(moment);
const Holiday = () => {
  const [selectedHoliday, setSelectedHoliday] = useState([]);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const classes = useStyles();

  const dispatch = useDispatch();

  const { holiday, error } = useSelector((state) => state.holiday);

  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_ALL_HOLIDAY_RESET });
  }

  useEffect(() => {
    dispatch(getAllHolidayAction());
  }, []);

  const handleCalendarSelect = (event) => {
    let holidaySelected = [];
    holidaySelected.push(event);
    // let holidaySelected = holiday?.att_HRHolidayModelLst?.filter(
    //   (s) => s.FromDate == DateToIso(start).slice(0, 19)
    // );
    // console.log("selected holiday", holidaySelected);
    setSelectedHoliday(holidaySelected);
  };

  // const handlePress = ({ start, end, resourceId }) => {
  //   console.log(start);
  //   console.log(resourceId);
  // };

  return (
    <>
      <div
        style={{
          margin: "10px",
        }}
      >
        <Calendar
          localizer={localizer}
          events={holiday && holiday.att_HRHolidayModelLst}
          startAccessor="FromDate"
          endAccessor="ToDate"
          titleAccessor="HolidayName"
          views={months}
          selectable
          // onSelectSlot={handlePress}
          onSelectEvent={handleCalendarSelect}
          style={{ height: "40vh" }}
        />
      </div>

      <div style={{ marginBottom: "60px" }}>
        {selectedHoliday &&
          selectedHoliday.length > 0 &&
          selectedHoliday?.map((s) => (
            <HolidayListCollapse item={s} key={s.$id} />
          ))}
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default Holiday;
