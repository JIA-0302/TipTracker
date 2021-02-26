import { isSameMonth } from "date-fns";
import { RiCheckboxCircleLine } from "react-icons/ri";

import styles from "styles/Calendar.module.css";

interface IDateCellProps {
  day: Date;
  monthStart: Date;
  formattedDate: string;
  hasShiftData: boolean;
  updateSelectedDate: (selectedDate: Date) => void;
}

const DateCell = ({
  day,
  monthStart,
  formattedDate,
  hasShiftData,
  updateSelectedDate,
}: IDateCellProps): JSX.Element => {
  const disableCell = !isSameMonth(day, monthStart);

  return (
    <div
      className={`${styles.column} ${styles.cell} ${
        disableCell ? styles.disabled : ""
      }`}
      onClick={() => (disableCell ? null : updateSelectedDate(day))}
    >
      <p className={styles.number}>{formattedDate}</p>
      {hasShiftData && (
        <div className={`${styles.check} d-flex justify-content-center`}>
          <RiCheckboxCircleLine color="#28a745" />
        </div>
      )}
    </div>
  );
};

export default DateCell;
