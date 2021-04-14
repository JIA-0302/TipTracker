import { addDays, endOfWeek, format, startOfWeek } from "date-fns";
import { IShiftTrends } from "src/providers/ShiftTrendsContext";

export function getVisualizationDataForWeek(
  currentDate: Date,
  shiftTrends: IShiftTrends
) {
  const startDate = startOfWeek(currentDate);
  const endDate = endOfWeek(currentDate);
  const visDataForWeek = [];

  let day = startDate;
  while (day <= endDate) {
    const formattedDate = format(day, "yyyy-MM-dd");
    const data = shiftTrends[formattedDate];

    if (data) {
      let formattedData = {
        date: formattedDate,
        "Credit Card Tips": 0,
        "Cash Tips": 0,
        Wages: 0,
      };

      if (!("message" in data)) {
        const { cashTips, creditCardTips, hourlyWages } = data;
        formattedData = {
          ...formattedData,
          "Credit Card Tips": Number(creditCardTips),
          "Cash Tips": Number(cashTips),
          Wages: Number(hourlyWages),
        };
      }

      visDataForWeek.push(formattedData);
    }
    day = addDays(day, 1);
  }

  return visDataForWeek;
}
