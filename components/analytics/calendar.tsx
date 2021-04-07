import React, { useContext, useState } from "react";
import { addDays, endOfWeek, startOfWeek, addWeeks, format } from "date-fns";

import { ShiftTrendsContext } from "src/providers/ShiftTrendsContext";
import DateChangePanel from "components/work-calendar/date-change-panel";
import WeekHeader from "components/work-calendar/week-header";
import DateCell from "./dateCell";

import styles from "styles/Calendar.module.css";
import customStyles from "./styles.module.css";

interface WeekCalendarProps {
  title: string;
  onDateChange?: (currentDate: Date) => void;
}

const WeekCalendar = ({ title }: WeekCalendarProps): JSX.Element => {
  const { shiftTrends } = useContext(ShiftTrendsContext);
  const [currentDate, setCurrentDate] = useState(new Date());
  // const [loading, setLoading] = useState(false);

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
      const trendsData = shiftTrends[formattedDate];
      weekDays.push(
        <DateCell
          currentDate={day}
          trendsData={trendsData}
          loading={false}
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
