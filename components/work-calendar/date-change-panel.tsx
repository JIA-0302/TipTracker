import { format } from "date-fns";
import styles from "styles/Calendar.module.css";

interface IDateChangePanelProps {
  nextMonth: () => void;
  prevMonth: () => void;
  currentDate: Date;
}

const DateChangePanel = ({
  currentDate,
  nextMonth,
  prevMonth,
}: IDateChangePanelProps): JSX.Element => {
  const dateFormat = "MMMM yyyy";
  return (
    <div className={` ${styles.header}`}>
      <div className={styles.icon} onClick={prevMonth}>
        chevron_left
      </div>
      <div>
        <span>{format(currentDate, dateFormat)}</span>
      </div>
      <div className={styles.icon} onClick={nextMonth}>
        chevron_right
      </div>
    </div>
  );
};

export default DateChangePanel;
