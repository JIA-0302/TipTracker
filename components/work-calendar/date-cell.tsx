import { isSameMonth } from "date-fns";
import React from "react";
import { RiCheckboxCircleLine } from "react-icons/ri";

import styles from "styles/Calendar.module.css";

interface IDateCellProps {
  day: Date;
  monthStart: Date;
  formattedDate: string;
  hasShiftData: boolean;
  updateSelectedDate: (selectedDate: Date) => void;
  loading: boolean;
}

const DateCell = ({
  day,
  monthStart,
  formattedDate,
  hasShiftData,
  updateSelectedDate,
  loading,
}: IDateCellProps): JSX.Element => {
  const disableCell = !isSameMonth(day, monthStart);

  return (
    <div
      className={`${styles.column} ${styles.cell} ${
        disableCell ? styles.disabled : ""
      }`}
      onClick={() => (disableCell || loading ? null : updateSelectedDate(day))}
    >
      <div className="d-flex flex-column" style={{ width: "100%" }}>
        <p className={styles.number}>{formattedDate}</p>
        {hasShiftData && (
          <div className={`${styles.check} align-self-center mt-0`}>
            <RiCheckboxCircleLine color="#28a745" />
          </div>
        )}
      </div>
    </div>
  );
};

export default DateCell;
