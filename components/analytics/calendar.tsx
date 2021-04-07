import React, { useContext, useEffect, useState } from "react";
import { addDays, endOfWeek, startOfWeek, addWeeks, format } from "date-fns";

import {
  IShiftTrendData,
  IShiftTrends,
  ShiftTrendsContext,
} from "src/providers/ShiftTrendsContext";
import DateChangePanel from "components/work-calendar/date-change-panel";
import WeekHeader from "components/work-calendar/week-header";
import DateCell from "./dateCell";

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
  const { shiftTrends, addShiftTrend } = useContext(ShiftTrendsContext);
  const [currentDate, setCurrentDate] = useState(new Date());
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
      <DateChangePanel
        currentDate={currentDate}
        prevMonth={prevWeek}
        nextMonth={nextWeek}
      />
      <WeekHeader currentDate={currentDate} />
      <div className="mt-2">{cells()}</div>
    </div>
  );
};

export default WeekCalendar;
