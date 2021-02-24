import PrivateLayout from "../components/layouts/private-layout";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../styles/Summary.module.css";
import Spreadsheet from "components/summary/spreadsheet";
import DSelector from "components/summary/dateSelector";
import React, { useState } from "react";
import rows from "utils/dummyData";
import moment from "moment";

function stringToDate(_date, _format, _delimiter) {
  const formatLowerCase = _format.toLowerCase();
  const formatItems = formatLowerCase.split(_delimiter);
  const dateItems = _date.split(_delimiter);
  const monthIndex = formatItems.indexOf("mm");
  const dayIndex = formatItems.indexOf("dd");
  const yearIndex = formatItems.indexOf("yyyy");
  let month = parseInt(dateItems[monthIndex]);
  month -= 1;
  const formatedDate = new Date(
    dateItems[yearIndex],
    month,
    dateItems[dayIndex]
  );
  return formatedDate;
}

const summary: React.FunctionComponent = () => {
  let daysWorked = 0,
    ccTips = 0,
    cTips = 0,
    tips,
    hoursWorked = 0,
    hourlyWages = 0,
    earnings;

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);

  const timeDiff = (shiftTime) => {
    const time = shiftTime.split("-");

    return moment(time[1], "HH:mm").diff(
      moment(time[0], "HH:mm"),
      "hours",
      true
    );
  };

  const rows_filtered = rows.filter(function (data) {
    const date = stringToDate(data.date, "mm-dd-yyyy", "-");
    date.setHours(0, 0, 0, 0);
    if (date >= startDate && date <= endDate) {
      hoursWorked += timeDiff(data.shiftTime);
      daysWorked++;
      ccTips += data.ccTips;
      cTips += data.cashTips;
      return true;
    } else return false;
  });

  tips = ccTips + cTips;
  hourlyWages =
    10 * hoursWorked; /*The 10 is a place holder for hourly pay rate.*/
  earnings = tips + hourlyWages;

  cTips = parseFloat(cTips.toFixed(2));
  ccTips = parseFloat(ccTips.toFixed(2));
  earnings = parseFloat(earnings.toFixed(2));
  tips = parseFloat(tips.toFixed(2));

  return (
    <PrivateLayout>
      <h1 className={styles.summaryHeader}>Summary For</h1>
      <DSelector
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      <div className={styles.gridContainer}>
        <div className={styles.gridHeader}>{"Total Days Worked"}</div>
        <div className={styles.gridHeader}>{"Total Hours Worked"}</div>
        <div className={styles.gridHeader}>{"Total Hourly Wages"}</div>
        <div className={styles.gridItem}>{daysWorked}</div>
        <div className={styles.gridItem}>{hoursWorked}</div>
        <div className={styles.gridItem}>{hourlyWages}</div>
        <div className={styles.gridHeader}>{"Total Credit Card Tips"}</div>
        <div className={styles.gridHeader}>{"Total Cash Tips"}</div>
        <div className={styles.gridHeader}>{"Total Tips"}</div>
        <div className={styles.gridItem}>{"$" + ccTips}</div>
        <div className={styles.gridItem}>{"$" + cTips}</div>
        <div className={styles.gridItem}>{"$" + tips}</div>
        <div className={styles.gridItem}>{""}</div>
        <div className={styles.gridItem}>{""}</div>
        <div className={styles.gridHeader}>{"Total Earnings"}</div>
        <div className={styles.gridItem}>{""}</div>
        <div className={styles.gridItem}>{""}</div>
        <div className={styles.gridItem}>{"$" + earnings}</div>
      </div>
      <div className={styles.spreadsheet}>
        <Spreadsheet
          rows_filtered={rows_filtered}
          startDate={startDate}
          endDate={endDate}
        />
      </div>
    </PrivateLayout>
  );
};

export default summary;
