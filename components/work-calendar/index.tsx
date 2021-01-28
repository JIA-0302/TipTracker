import React, { useState } from "react"
import addMonths from "date-fns/addMonths"
import subMonths from "date-fns/subMonths"
import styles from "styles/Calendar.module.css"
import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  toDate,
} from "date-fns"

const WorkCalendar: React.FunctionComponent = () => {
  // Add Work Calendar here
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1))
  }
  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1))
  }

  const header = () => {
    const dateFormat = "MMMM yyyy"
    return (
        <div className={` ${styles.header} ${styles.row} `}>
          <div className={` ${styles.column} ${styles.row}`}>
            <div className={styles.icon} onClick={prevMonth}>
              chevron_left
            </div>
          </div>
          <div className={` ${styles.column} ${styles.colCenter} `}>
            <span>{format(currentDate, dateFormat)}</span>
          </div>
          <div className={` ${styles.column} ${styles.colEnd}`}>
            <div className={styles.icon} onClick={nextMonth}>
              chevron_right
            </div>
          </div>
        </div>
    )
  }

  const daysOfWeek = () => {
    const dateFormat = "E"
    const days = []
    const startDate = startOfWeek(currentDate)
    for (let i = 0; i < 7; i++) {
      days.push(
          <div className={`${styles.column} ${styles.colCenter}`} key={i}>
            {format(addDays(startDate, i), dateFormat)}
          </div>
      )
    }
    return <div className={`${styles.days} ${styles.row}`}>{days}</div>
  }

  const onDateClick = (day) => {
    setSelectedDate(day)
  }

  const cells = () => {
    const monthStart = startOfMonth(currentDate)
    const monthEnd = endOfMonth(monthStart)
    const startDate = startOfWeek(monthStart)
    const endDate = endOfWeek(monthEnd)

    const dateFormat = "d"
    const rows = []
    let days = []
    let day = startDate
    let formattedDate = ""
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat)
        const cloneDay = day

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
                onClick={() => onDateClick(toDate(cloneDay))}
            >
              <span className={styles.number}>{formattedDate}</span>
              <span className={styles.bg}>{formattedDate}</span>
            </div>
        )
        day = addDays(day, 1)
      }
      rows.push(
          <div className={styles.row} key={day.toDateString()}>
            {" "}
            {days}{" "}
          </div>
      )
      days = []
    }
    return <div className={styles.body}>{rows}</div>
  }

  return (
      <div className={styles.calendar}>
        <div>{header()}</div>
        {<div>{daysOfWeek()}</div>}
        {<div>{cells()}</div>}
      </div>
  )
}

export default WorkCalendar
