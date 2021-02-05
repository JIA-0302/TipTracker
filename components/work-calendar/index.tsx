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
import ShiftMainAddModal from "../shift-main-add-modal"
import ShiftEditModal from "../shift-edit-modal"

export interface ShiftData {
  earnings: number
  cashTips: number
  ccTips: number
  active: boolean
}

const WorkCalendar: React.FunctionComponent = () => {
  // Add Work Calendar here
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [mockEditData, setMockEditData] = useState<ShiftData>({
    earnings: 110.5,
    cashTips: 230,
    ccTips: 55,
    active: true,
  })

  const createShiftModal = (calendarDate) => {
    return showAddModal || !showEditModal ? (
      <ShiftMainAddModal
        date={calendarDate}
        show={showAddModal}
        onHide={setShowAddModal}
      />
    ) : (
      <ShiftEditModal
        date={calendarDate}
        show={showEditModal}
        onHide={setShowEditModal}
        data={mockEditData}
        updateData={setMockEditData}
      />
    )
  }

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1))
  }
  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1))
  }

  const header = () => {
    const dateFormat = "MMMM yyyy"
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
    )
  }

  const daysOfWeek = () => {
    const dateFormat = "E"
    const days = []
    const startDate = startOfWeek(currentDate)
    for (let i = 0; i < 7; i++) {
      days.push(
        <div
          className={`${styles.column} ${styles.colCenter} ${styles.daysOfTheWeek}`}
          key={i}
        >
          {format(addDays(startDate, i), dateFormat)}
        </div>
      )
    }
    return <div className={`${styles.days} ${styles.row}`}>{days}</div>
  }

  const onDateClick = (day, modalType) => {
    setSelectedDate(day)
    if (modalType === "add") {
      setShowAddModal(true)
    } else {
      setShowEditModal(true)
    }
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
            onClick={() =>
              cloneDay.toDateString() === "Sun Feb 14 2021" &&
              mockEditData.active
                ? onDateClick(toDate(cloneDay), "edit")
                : onDateClick(toDate(cloneDay), "add")
            }
          >
            <span className={styles.number}>{formattedDate}</span>
            {cloneDay.toDateString() === "Sun Feb 14 2021" &&
            mockEditData.active ? (
              <span
                className={
                  cloneDay.toDateString() === "Sun Feb 14 2021"
                    ? styles.check
                    : ""
                }
              >
                &#9989;
              </span>
            ) : (
              ""
            )}
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
    <div>
      <div className={`${styles.calendar} mt-4`}>
        <div>{header()}</div>
        {<div>{daysOfWeek()}</div>}
        {<div>{cells()}</div>}
      </div>
      {createShiftModal(selectedDate)}
    </div>
  )
}

export default WorkCalendar
