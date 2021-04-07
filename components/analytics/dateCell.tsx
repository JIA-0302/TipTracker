import { format } from "date-fns";
import { FcCancel } from "react-icons/fc";
import { IShiftTrendData } from "src/providers/ShiftTrendsContext";
import Trends from "./trends-container";
import styles from "./styles.module.css";

interface DateCellProps {
  currentDate: Date;
  trendsData: IShiftTrendData;
  loading?: boolean;
}

const DateCell = ({ currentDate, trendsData }: DateCellProps) => {
  let dataToDisplay = <FcCancel fontSize={48} />;
  if (trendsData) {
    dataToDisplay = <Trends data={trendsData} />;
  }

  return (
    <div className={`${styles.day}`}>
      <p className={styles.date}>{format(currentDate, "dd")}</p>
      <div
        className="align-self-center d-flex flex-column justify-content-center mt-0"
        style={{ height: "100%" }}
      >
        {dataToDisplay}
      </div>
    </div>
  );
};

export default DateCell;
