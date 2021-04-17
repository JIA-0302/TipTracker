import { addDays, differenceInMinutes, format } from "date-fns";
import { parseISODate } from "utils/date-utils";

export const getEarningsDistributionData = async (days: number) => {
  const endDate = new Date();
  const startDate = addDays(endDate, -days);

  const baseUrl = "api/summary/summary-data";
  const queries = `start_date=${encodeURIComponent(
    format(startDate, "yyyy-MM-dd")
  )}&end_date=${encodeURIComponent(format(endDate, "yyyy-MM-dd"))}`;

  const earnings = {
    wages: 0,
    ccTips: 0,
    cashTips: 0,
  };

  return await fetch(`${baseUrl}?${queries}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      data.shiftDetail?.hourlyShiftDetails.forEach((shiftDetail) => {
        const {
          start_time,
          end_time,
          hourly_wage,
          credit_card_tips,
          cash_tips,
        } = shiftDetail;

        const parsedStartTime = parseISODate(start_time);
        const parsedEndTime = parseISODate(end_time);
        const shiftInterval =
          differenceInMinutes(parsedEndTime, parsedStartTime) / 60;

        earnings.wages += shiftInterval * hourly_wage;
        earnings.cashTips += cash_tips || 0;
        earnings.ccTips += credit_card_tips || 0;
      });

      data.shiftDetail?.nonHourlyShiftDetails.forEach((shiftDetail) => {
        const { total_base_earning, credit_card_tips, cash_tips } = shiftDetail;

        earnings.wages += total_base_earning;
        earnings.cashTips += cash_tips || 0;
        earnings.ccTips += credit_card_tips || 0;
      });

      return [
        {
          id: "Wages",
          label: "Wages",
          value: earnings.wages.toFixed(2),
        },
        {
          id: "Cash Tips",
          label: "Cash Tips",
          value: earnings.cashTips.toFixed(2),
        },
        {
          id: "Credit Card Tips",
          label: "Credit Card Tips",
          value: earnings.ccTips.toFixed(2),
        },
      ];
    });
};
