import { differenceInMinutes, format, parse } from "date-fns";
import { IShiftTrends } from "src/providers/ShiftTrendsContext";
import {
  getFormattedShiftDate,
  parseISODate,
  parseTimeString,
} from "utils/date-utils";

export const getPastTrends = async (dates: string[]): Promise<IShiftTrends> => {
  sortSearchDates(dates);

  const baseUrl = "api/summary/summary-data";
  const queries = `start_date=${encodeURIComponent(
    dates[0]
  )}&end_date=${encodeURIComponent(dates[dates.length - 1])}`;

  return fetch(`${baseUrl}?${queries}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const pastTrends: IShiftTrends = {};

      dates.forEach((date) => {
        pastTrends[date] = {
          message: "No data found for the specified day",
        };
      });

      data.shiftDetail?.hourlyShiftDetails.forEach((shiftDetail) => {
        const {
          shift_date,
          start_time,
          end_time,
          hourly_wage,
          credit_card_tips,
          cash_tips,
        } = shiftDetail;

        const formattedShiftDate = getFormattedShiftDate(shift_date);

        const parsedStartTime = parseISODate(start_time);
        const parsedEndTime = parseISODate(end_time);

        const shiftInterval =
          differenceInMinutes(parsedEndTime, parsedStartTime) / 60;

        const formattedStartTime = format(parsedStartTime, "HH:mm:ss");
        const formattedEndTime = format(parsedEndTime, "HH:mm:ss");

        pastTrends[formattedShiftDate] = {
          creditCardTips: credit_card_tips,
          cashTips: cash_tips,
          shiftTime: `${parseTimeString(
            formattedStartTime
          )} - ${parseTimeString(formattedEndTime)}`,
          hourlyWages: (shiftInterval * hourly_wage).toFixed(2),
          totalTips: credit_card_tips + cash_tips,
        };
      });

      data.shiftDetail?.nonHourlyShiftDetails.forEach((shiftDetail) => {
        const {
          shift_date,
          total_base_earning,
          credit_card_tips,
          cash_tips,
        } = shiftDetail;

        const formattedShiftDate = getFormattedShiftDate(shift_date);

        pastTrends[formattedShiftDate] = {
          creditCardTips: credit_card_tips,
          cashTips: cash_tips,
          shiftTime: `N/A`,
          hourlyWages: total_base_earning,
          totalTips: credit_card_tips + cash_tips,
        };
      });

      return pastTrends;
    });
};

export const getFutureTrends = async (
  dates: string[]
): Promise<IShiftTrends> => {
  const currentDate: Date = new Date();

  // Do not send API requests for dates that has already passed
  const pastDates = dates.filter((x) => new Date(x) < currentDate);
  const futureDates = dates.filter((x) => new Date(x) >= currentDate);

  const futureTrends: IShiftTrends = {};

  pastDates.forEach((date) => {
    futureTrends[date] = {
      message:
        "We cannot show predictions for past dates. Please visit Past Trends to view data.",
    };
  });

  // No more dates to query. All dates were past dates
  if (futureDates.length == 0) {
    return futureTrends;
  }

  const data = {
    shift_dates: futureDates,
  };

  return fetch("api/future-trends", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((json) => {
      if (json.message) {
        throw new Error(json.message);
      } else if (json.result) {
        const { result } = json;
        for (const shiftDate in result) {
          // Do not display past date's predictions to the user
          if (parse(shiftDate, "yyyy-MM-dd", currentDate) < currentDate) {
            futureTrends[shiftDate] = {
              message:
                "We cannot show predictions for past dates. Please visit Past Trends to view data.",
            };
          }
          // There is no data for this day
          else if (!result[shiftDate]) {
            futureTrends[shiftDate] = {
              message:
                "We do not have sufficient data to make predictions for the day. Please continue entering shift data.",
            };
          }
          // Valid data, retrieve relevant data
          else {
            const {
              start_time,
              end_time,
              cash_tips,
              credit_card_tips,
              hour,
            } = result[shiftDate];

            const startTime = parseTimeString(start_time);
            const endTime = parseTimeString(end_time);

            futureTrends[shiftDate] = {
              shiftTime: `${startTime} - ${endTime}`,
              hourlyWages: hour * 9, // TODO - Calculate wage based on user default once implemented
              creditCardTips: credit_card_tips,
              cashTips: cash_tips,
              totalTips: credit_card_tips + cash_tips,
            };
          }
        }

        return futureTrends;
      } else {
        throw new Error(
          "We could not retrieve the data. Please try again later"
        );
      }
    });
};

const sortSearchDates = (dates: string[]) => {
  dates.sort((a, b) => {
    const a_date = new Date(a);
    const b_date = new Date(b);

    if (a_date < b_date) return -1;
    if (a_date > b_date) return 1;
    return 0;
  });
};
