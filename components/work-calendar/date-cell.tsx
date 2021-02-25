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
      <span className={styles.number}>{formattedDate}</span>
      {hasShiftData && (
        <span className={styles.check}>
          <RiCheckboxCircleLine color="green" />
        </span>
      )}
    </div>
  );
};

export default DateCell;
