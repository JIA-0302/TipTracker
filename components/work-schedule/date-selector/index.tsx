import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./date-selector.module.css";

interface dateSelectorProps {
  date: Date;
  setDate: (Date) => void;
}

const DateSelector = ({ date, setDate }: dateSelectorProps) => {
  return (
    <>
      <div>
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          selectsEnd
          date={date}
          className={`${styles.gridDatesItem} form-control`}
        />
      </div>
    </>
  );
};

export default DateSelector;
