import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../../styles/Summary.module.css";

interface dateSelectorProps {
  startDate: Date;
  endDate: Date;
  setStartDate: (Date) => void;
  setEndDate: (Date) => void;
}

const DSelector = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}: dateSelectorProps) => {
  return (
    <>
      <div className={styles.gridDatesContainer}>
        <div className={styles.gridDatesHeaderDates}>{"Start Date"}</div>
        <div className={styles.gridDatesHeaderDates}>{"End Date"}</div>
      </div>
      <div className={styles.gridDatesContainer}>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          className={`${styles.gridDatesItem} form-control`}
        />

        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          className={`${styles.gridDatesItem} form-control ml-3`}
        />
      </div>
    </>
  );
};

export default DSelector;
