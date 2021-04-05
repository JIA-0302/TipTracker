import PrivateLayout from "../components/layouts/private-layout";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../styles/Summary.module.css";
import stylesBackground from "styles/Home.module.css";
import Spreadsheet from "components/summary/spreadsheet";
import DSelector from "components/summary/dateSelector";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { getFilteredShiftData } from "../src/actions/shift-details";
import { format } from "date-fns";
import { Spinner } from "react-bootstrap";

function createData(
  date: string,
  day: string,
  shiftTime: string,
  totalHours: number,
  hourlyWages: number,
  cashTips: number,
  ccTips: number,
  totalTips: number
) {
  return {
    date,
    day,
    shiftTime,
    totalHours,
    hourlyWages,
    cashTips,
    ccTips,
    totalTips,
  };
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

  function getDayOfWeek(date) {
    const dayOfWeek = new Date(date).getDay();
    return isNaN(dayOfWeek)
      ? null
      : [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ][dayOfWeek];
  }

  const timeDiff = (start_time, end_time) => {
    return moment(end_time, "HH:mm").diff(
      moment(start_time, "HH:mm"),
      "hours",
      true
    );
  };

  const [rows_filtered, setRowsArr] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (startDate && endDate) {
      setLoading(true);
      getFilteredShiftData(
        format(startDate, "yyyy-MM-dd"),
        format(endDate, "yyyy-MM-dd")
      )
        .then((data) => setRowsArr(data))
        .catch((error) => {
          console.error(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [startDate, endDate]);

  const rows = [];
  rows_filtered.forEach((data) => {
    let time_range, time_diff, hourly_wages;

    if (data.start_time && data.end_time) {
      time_range = `${data.start_time}-${data.end_time}`;
      time_diff = timeDiff(data.start_time, data.end_time);
    } else {
      time_range = " ";
      time_diff = 0;
    }
    if (data.hourly_wage) hourly_wages = data.hourly_wage;
    else hourly_wages = 0;

    rows.push(
      createData(
        data.shift_date,
        getDayOfWeek(data.shift_date),
        time_range,
        parseFloat(time_diff.toFixed(2)),
        parseFloat(hourly_wages.toFixed(2)),
        data.cash_tips,
        data.credit_card_tips,
        data.cash_tips + data.credit_card_tips
      )
    );
    hoursWorked += time_diff;
    daysWorked++;
    ccTips += data.credit_card_tips;
    cTips += data.cash_tips;
    hourlyWages += hourly_wages;
  });

  tips = ccTips + cTips;
  earnings = tips + hourlyWages;

  hoursWorked = parseFloat(hoursWorked.toFixed(2));
  hourlyWages = parseFloat(hourlyWages.toFixed(2));
  cTips = parseFloat(cTips.toFixed(2));
  ccTips = parseFloat(ccTips.toFixed(2));
  earnings = parseFloat(earnings.toFixed(2));
  tips = parseFloat(tips.toFixed(2));

  return (
    <PrivateLayout backgroundStyle={stylesBackground.dashboard}>
      <h1 className={styles.summaryHeader}>Summary For</h1>
      <DSelector
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      {loading && (
        <div className="d-flex align-self-center ml-md-5 mb-3 text-muted">
          <Spinner animation="border" className="mr-3" />
          Retrieving shift data
        </div>
      )}
      <div className={styles.gridContainer}>
        <div className={styles.gridHeader}>{"Total Days Worked"}</div>
        <div className={styles.gridHeader}>{"Total Hours Worked"}</div>
        <div className={styles.gridHeader}>{"Total Hourly Wages"}</div>
        <div className={styles.gridItem}>{daysWorked}</div>
        <div className={styles.gridItem}>{hoursWorked}</div>
        <div className={styles.gridItem}>{"$" + hourlyWages}</div>
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
          rows_filtered={rows}
          startDate={startDate}
          endDate={endDate}
        />
      </div>
    </PrivateLayout>
  );
};

export default summary;
