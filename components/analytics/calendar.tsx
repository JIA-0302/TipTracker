import React, { useContext, useEffect, useState } from "react";
import { addDays, endOfWeek, startOfWeek, addWeeks, format } from "date-fns";
import { Button } from "react-bootstrap";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

import {
  IShiftTrendData,
  IShiftTrends,
  ShiftTrendsContext,
} from "src/providers/ShiftTrendsContext";
import WeekHeader from "components/work-calendar/week-header";
import DateCell from "./dateCell";
import MonthDisplay from "./monthDisplay";

import styles from "styles/Calendar.module.css";
import customStyles from "./styles.module.css";

interface WeekCalendarProps {
  title: string;
  retrieveData: (requestDates: string[]) => Promise<IShiftTrends>;
}

const WeekCalendar = ({
  title,
  retrieveData,
}: WeekCalendarProps): JSX.Element => {
  const {
    shiftTrends,
    addShiftTrend,
    currentDate,
    setCurrentDate,
  } = useContext(ShiftTrendsContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Finds days for which we need to request data
    const startDate = startOfWeek(currentDate);
    const endDate = endOfWeek(currentDate);
    const requestDates = [];
    let day = startDate;

    while (day <= endDate) {
      const formattedDate = format(day, "yyyy-MM-dd");
      if (!(formattedDate in shiftTrends)) {
        requestDates.push(formattedDate);
      }
      day = addDays(day, 1);
    }

    if (requestDates.length > 0) {
      setLoading(true);

      // Retrieve relevant data
      retrieveData(requestDates)
        .then((data) => addShiftTrend(data))
        .catch((error) => window.alert(error))
        .finally(() => setLoading(false));
    }
  }, [currentDate]);

  const nextWeek = () => {
    setCurrentDate(addWeeks(currentDate, 1));
  };

  const prevWeek = () => {
    setCurrentDate(addWeeks(currentDate, -1));
  };

  const cells = () => {
    const startDate = startOfWeek(currentDate);
    const endDate = endOfWeek(currentDate);

    let day = startDate;
    const weekDays = [];

    while (day <= endDate) {
      const formattedDate = format(day, "yyyy-MM-dd");
      const currentData = shiftTrends[formattedDate];

      let trendsData, errorData;
      if (currentData) {
        if ((currentData as IShiftTrendData).shiftTime) {
          trendsData = currentData;
        } else {
          errorData = currentData;
        }
      }

      weekDays.push(
        <DateCell
          currentDate={day}
          trendsData={trendsData}
          errorData={errorData}
          loading={loading}
          key={formattedDate}
        />
      );
      day = addDays(day, 1);
    }

    return <div className={customStyles.week}>{weekDays}</div>;
  };

  return (
    <div className={`${styles.calendar} mt-4`}>
      <h1 className="text-center">{title}</h1>
      <div className="d-flex flex-column flex-md-row justify-content-between my-3">
        <MonthDisplay currentDate={currentDate} />
        <div>
          <Button variant="success" className="mr-3" onClick={prevWeek}>
            <div className="d-flex justify-content-around align-items-center">
              <BsArrowLeft fontSize={24} />
              Previous
            </div>
          </Button>

          <Button variant="success" onClick={nextWeek}>
            <div className="d-flex justify-content-around align-items-center">
              Next
              <BsArrowRight fontSize={24} />
            </div>
          </Button>
        </div>
      </div>

      <div className="d-flex align-items-end">
        <div className={customStyles.template}>
          <span style={{ color: "green" }}>Shift Time</span>
          <span style={{ color: "red" }}>Wages</span>
          <span style={{ color: "blue" }}>C.C. Tips</span>
          <span style={{ color: "blue" }}>Cash Tips</span>
          <span style={{ color: "black" }}>Total Tips</span>
        </div>
        <div style={{ width: "100%" }}>
          <WeekHeader currentDate={currentDate} />
          <div className="mt-2">{cells()}</div>
        </div>
      </div>
    </div>
  );
};

export default WeekCalendar;
