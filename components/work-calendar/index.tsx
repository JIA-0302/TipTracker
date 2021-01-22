type WorkCalendarProps = {
  selectedDate?: string
}

const WorkCalendar: React.FunctionComponent<WorkCalendarProps> = ({
  selectedDate,
}) => {
  // Add Work Calendar here
  return <p>{selectedDate}</p>
}

export default WorkCalendar
