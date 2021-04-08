import { endOfWeek, format, startOfWeek } from "date-fns";

interface MonthDisplayProps {
  currentDate: Date;
}

const MonthDisplay = ({ currentDate }: MonthDisplayProps) => {
  const startDate = startOfWeek(currentDate);
  const endDate = endOfWeek(currentDate);

  const formattedStartDate = format(startDate, "LLLL yyyy");
  const formattedEndDate = format(endDate, "LLLL yyyy");

  return (
    <h3>
      {formattedStartDate === formattedEndDate
        ? formattedStartDate
        : `${formattedStartDate} - ${formattedEndDate}`}
    </h3>
  );
};

export default MonthDisplay;
