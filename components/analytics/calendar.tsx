import React, { useState } from "react";
import { addDays, endOfWeek, format, startOfWeek, addWeeks } from "date-fns";
import DateChangePanel from "components/work-calendar/date-change-panel";
import WeekHeader from "components/work-calendar/week-header";

import styles from "styles/Calendar.module.css";

const WorkCalendar = (): JSX.Element => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const nextWeek = () => {
    setCurrentDate(addWeeks(currentDate, 1));
  };

  const prevWeek = () => {
    setCurrentDate(addWeeks(currentDate, -1));
  };

  const cells = () => {
    const startDate = startOfWeek(currentDate);
    const endDate = endOfWeek(currentDate);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        days.push(
          <div className={`${styles.column} ${styles.cell}`}>
            <div className="d-flex flex-column" style={{ width: "100%" }}>
              <p className={styles.number}>{format(day, "dd")}</p>
              {/* put data here */}
            </div>
          </div>
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
      <div className="d-flex flex-column flex-md-row">
        <DateChangePanel
          currentDate={currentDate}
          /*prevMonth={prevMonth}
          nextMonth={nextMonth}*/
          prevMonth={prevWeek}
          nextMonth={nextWeek}
        />
      </div>
      <WeekHeader currentDate={currentDate} />
      <div>{cells()}</div>
    </div>
  );
};

export default WorkCalendar;
