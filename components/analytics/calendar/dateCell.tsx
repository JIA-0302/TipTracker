import React from "react";
import { Spinner } from "react-bootstrap";
import { format } from "date-fns";

import {
  IShiftTrendData,
  IShiftTrendError,
} from "src/providers/ShiftTrendsContext";
import Trends from "../trends-container";

import styles from "./styles.module.css";
import ErrorTrends from "../trends-container/error";

interface DateCellProps {
  currentDate: Date;
  trendsData: IShiftTrendData;
  errorData: IShiftTrendError;
  loading?: boolean;
}

const DateCell = ({
  currentDate,
  trendsData,
  errorData,
  loading,
}: DateCellProps) => {
  let dataToDisplay;
  if (trendsData) {
    dataToDisplay = <Trends data={trendsData} />;
  } else if (errorData) {
    dataToDisplay = <ErrorTrends message={errorData.message} />;
  } else if (loading) {
    dataToDisplay = <Spinner animation="border" style={{ margin: "auto" }} />;
  } else {
    const defaultMessage =
      "Data could not be retrieved. Please try again later.";
    dataToDisplay = <ErrorTrends message={defaultMessage} />;
  }

  return (
    <div className={`${styles.day}`}>
      <p className={styles.date}>{format(currentDate, "dd")}</p>
      <div
        className="align-self-center d-flex flex-column justify-content-center mt-0"
        style={{ height: "100%", width: "100%" }}
      >
        {dataToDisplay}
      </div>
    </div>
  );
};

export default DateCell;
