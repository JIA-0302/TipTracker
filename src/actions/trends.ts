import { parse } from "date-fns";
import { IShiftTrends } from "src/providers/ShiftTrendsContext";
import { parseTimeString } from "utils/date-utils";

export const getPastTrends = async (dates: string[]): Promise<IShiftTrends> => {
  dates.map((x) => x.trim()); // Added to ignore lint error
  const data: IShiftTrends = {
    "2021-04-11": {
      shiftTime: "10:00 AM - 5:00 PM",
      hourlyWages: 123,
      creditCardTips: 54,
      cashTips: 45,
    },
    "2021-04-12": {
      shiftTime: "12:00 PM - 6:00 PM",
      hourlyWages: 54,
      creditCardTips: 323,
      cashTips: 64,
    },
    "2021-04-13": {
      shiftTime: "2:00 PM - 8:00 PM",
      hourlyWages: 87,
      creditCardTips: 32,
      cashTips: 75,
    },
  };

  return data;
};

export const getFutureTrends = async (
  dates: string[]
): Promise<IShiftTrends> => {
  const data = {
    shift_dates: dates,
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
        const futureTrends: IShiftTrends = {};
        const currentDate: Date = new Date();

        for (const shiftDate in result) {
          // Do not display past date's predictions to the user
          if (parse(shiftDate, "yyyy-MM-dd", currentDate) < currentDate) {
            futureTrends[shiftDate] = {
              message:
                "We cannot show predictions for past dates. Please visit Past Trends.",
            };
          }
          // There is no data for this day
          else if (!result[shiftDate]) {
            futureTrends[shiftDate] = {
              message:
                "We do not have sufficient data to make predictions for the day",
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
