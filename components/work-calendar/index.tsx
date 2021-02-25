import React, { useContext, useEffect, useState } from "react";
import addMonths from "date-fns/addMonths";
import subMonths from "date-fns/subMonths";
import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  formatISO,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { WorkedShiftContext } from "src/providers/WorkedShiftContext";
import { getWorkedDays } from "src/actions/shift-details";
import DateChangePanel from "./date-change-panel";
import WeekHeader from "./week-header";
import DateCell from "./date-cell";

import styles from "styles/Calendar.module.css";

interface WorkCalendarProps {
  onDateSelect: (date: string) => void;
}

const WorkCalendar = ({ onDateSelect }: WorkCalendarProps): JSX.Element => {
  const { workedShifts, addShiftData } = useContext(WorkedShiftContext);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const date = formatISO(currentDate, { representation: "date" });
    const year = date.substring(0, 4);
    const month = date.substring(6, 7);

    getWorkedDays(month, year)
      .then((data) => addShiftData(data))
      .catch((error) => {
        console.error(error.message);
      });
  }, [currentDate]);

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };
  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const updateSelectedDate = (selectedDate: Date) => {
    const dateToCheck = format(selectedDate, "yyyy-MM-dd");
    onDateSelect(dateToCheck);
  };

  const cells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const foundShift = format(day, "yyyy-MM-dd") in workedShifts;

        days.push(
          <DateCell
            day={day}
            monthStart={monthStart}
            formattedDate={format(day, "d")}
            hasShiftData={foundShift}
            updateSelectedDate={updateSelectedDate}
          />
        );
        day = addDays(day, 1);
      }

      rows.push(
        <div className={styles.row} key={day.toDateString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className={styles.body}>{rows}</div>;
  };

  return (
    <div className={`${styles.calendar} mt-4`}>
      <DateChangePanel
        currentDate={currentDate}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
      />
      <WeekHeader currentDate={currentDate} />
      <div>{cells()}</div>
    </div>
  );
};

export default WorkCalendar;
