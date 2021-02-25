import React, {useEffect, useState} from "react";
import addMonths from "date-fns/addMonths";
import subMonths from "date-fns/subMonths";
import styles from "styles/Calendar.module.css";
import {
    addDays,
    endOfMonth,
    endOfWeek,
    format, formatISO,
    isSameDay,
    isSameMonth,
    startOfMonth,
    startOfWeek,
    toDate,
} from "date-fns";
import ShiftMainAddModal from "../shift-main-add-modal";
import ShiftEditModal from "../shift-edit-modal";

export interface ShiftData {
    earnings: number;
    cashTips: number;
    ccTips: number;
    active: boolean;
}

const WorkCalendar: React.FunctionComponent = () => {
    // Add Work Calendar here
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editData, setEditData] = useState({});
    const [shiftIds, setShiftIds] = useState({});
    const [reload, setReload] = useState(new Date().getTime());

    useEffect(() => {
      const date = formatISO(currentDate, { representation: 'date' });
      const year = date.substring(0,4);
      const month = date.substring(6,7);

      const querystring = require('querystring');
      const params = querystring.stringify({month: month, year:year});


      fetch('api/shift-details/worked?' + params, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
          .then(response => {
                if (response.ok) {
                  return response.json();
                } else {
                  return response.text().then(text => {
                    throw new Error(text)
                  })
                }
              }
          )
          .then(data => {
            setShiftIds(data);
          })
          .catch((error) => {
            console.error(error.message);
          });

    }, [currentDate, reload]);

    const createShiftModal = (calendarDate) => {
        return showAddModal || !showEditModal ? (
            <ShiftMainAddModal
                date={calendarDate}
                show={showAddModal}
                onHide={setShowAddModal}
                reload={setReload}
            />
        ) : (
            <ShiftEditModal
                date={calendarDate}
                show={showEditModal}
                onHide={setShowEditModal}
                data={editData}
                reload={setReload}
            />
        );
    };

    const nextMonth = () => {
        setCurrentDate(addMonths(currentDate, 1));
    };
    const prevMonth = () => {
        setCurrentDate(subMonths(currentDate, 1));
    };

    const header = () => {
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

    const daysOfWeek = () => {
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

    const onDateClick = (day, modalType, id, hourly) => {
        setSelectedDate(day);
        if (modalType === "add") {
            setShowAddModal(true);
        } else {
            setEditData({id: id, hourly:hourly});
            setShowEditModal(true);
        }
    };

    const cells = () => {
        const monthStart = startOfMonth(currentDate);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        const dateFormat = "d";
        const rows = [];
        let days = [];
        let day = startDate;
        let formattedDate = "";
        let traverseIndex = 0;
        let joinedShiftDates = [];
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (shiftIds.hourlyShiftDetails && shiftIds.nonHourlyShiftDetails) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          joinedShiftDates = shiftIds.hourlyShiftDetails.concat(shiftIds.nonHourlyShiftDetails);
          joinedShiftDates = joinedShiftDates.sort((a, b) => {
           const c = new Date(a.shift_date);
           const d = new Date(b.shift_date);
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
           // @ts-ignore
              return c - d;
          });
        }
        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, dateFormat);
                const cloneDay = day;
                let id = -1;
                let foundShift = false;
                let hourly = -1;

                if (isSameMonth(day, monthStart)) {
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  if (shiftIds.hourlyShiftDetails && shiftIds.nonHourlyShiftDetails ) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    if (joinedShiftDates[traverseIndex]
                    && cloneDay.toISOString().substring(0,10) === joinedShiftDates[traverseIndex].shift_date.substring(0,10)) {
                      id = parseInt(joinedShiftDates[traverseIndex].shift_id);
                      foundShift = true;
                      hourly = joinedShiftDates[traverseIndex].hourly;
                      traverseIndex += 1;
                    }

                  }
                }

                days.push(
                    <div
                        className={`${styles.column} ${styles.cell} ${
                            !isSameMonth(day, monthStart)
                                ? styles.disabled
                                : isSameDay(day, selectedDate)
                                ? styles.selected
                                : ""
                        }`}
                        key={day.toDateString()}
                        onClick={() =>
                            foundShift
                                ? onDateClick(toDate(cloneDay), "edit", id , hourly)
                                : onDateClick(toDate(cloneDay), "add", -1, -1)
                        }
                    >
                        <span className={styles.number}>{formattedDate}</span>
                        {foundShift ? (
                            <span
                                className={
                                     styles.check

                                }
                            >
                &#9989;
              </span>
                        ) : (
                            ""
                        )}
                    </div>
                );
                day = addDays(day, 1);

                //end for
            }

            rows.push(
                <div className={styles.row} key={day.toDateString()}>
                    {" "}
                    {days}{" "}
                </div>
            );
            days = [];
        }
        return <div className={styles.body}>{rows}</div>;
    };

    return (
        <div>
            <div className={`${styles.calendar} mt-4`}>
                <div>{header()}</div>
                {<div>{daysOfWeek()}</div>}
                {<div>{cells()}</div>}
            </div>
            {createShiftModal(selectedDate)}
        </div>
    );
};

export default WorkCalendar;
