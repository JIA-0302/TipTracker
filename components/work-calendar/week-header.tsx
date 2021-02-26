import { format, addDays, startOfWeek } from "date-fns";
import styles from "styles/Calendar.module.css";

interface IWeekHeaderProps {
  currentDate: Date;
}

const WeekHeader = ({ currentDate }: IWeekHeaderProps): JSX.Element => {
  const dateFormat = "E";
  const days = [];
  const startDate = startOfWeek(currentDate);
  for (let i = 0; i < 7; i++) {
    days.push(
      <div
        className={`${styles.column} ${styles.colCenter} ${styles.daysOfTheWeek}`}
        key={i}
      >
        {format(addDays(startDate, i), dateFormat)}
      </div>
    );
  }
  return <div className={`${styles.days} ${styles.row}`}>{days}</div>;
};

export default WeekHeader;
