import { addDays, differenceInMinutes, format } from "date-fns";
import { getFormattedShiftDate, parseISODate } from "utils/date-utils";

const getRequestURL = (days: number) => {
  const endDate = new Date();
  const startDate = addDays(endDate, -days);

  const baseUrl = "api/summary/summary-data";
  const queries = `start_date=${encodeURIComponent(
    format(startDate, "yyyy-MM-dd")
  )}&end_date=${encodeURIComponent(format(endDate, "yyyy-MM-dd"))}`;

  return `${baseUrl}?${queries}`;
};

export const getEarningsDistributionData = async (days: number) => {
  const earnings = {
    wages: 0,
    ccTips: 0,
    cashTips: 0,
  };

  const url = getRequestURL(days);
  return await fetch(url, {
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

export const getEarningsTrendsData = async (days: number) => {
  const url = getRequestURL(days);

  const dataByDays = {};

  return await fetch(url, {
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

        dataByDays[formattedShiftDate] = {
          wages: shiftInterval * hourly_wage,
          ccTips: credit_card_tips,
          cashTips: cash_tips,
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
        dataByDays[formattedShiftDate] = {
          wages: total_base_earning,
          ccTips: credit_card_tips,
          cashTips: cash_tips,
        };
      });

      const trends = {
        wages: [],
        "Cash Tips": [],
        "Credit Card Tips": [],
      };

      const today = new Date();
      let currentDate = addDays(today, -days);

      while (currentDate <= today) {
        const day = format(currentDate, "yyyy-MM-dd");
        const index = format(currentDate, "d");

        trends.wages.push({
          x: index,
          y: dataByDays[day]?.wages?.toFixed(2) || 0,
        });

        trends["Cash Tips"].push({
          x: index,
          y: dataByDays[day]?.cashTips?.toFixed(2) || 0,
        });

        trends["Credit Card Tips"].push({
          x: index,
          y: dataByDays[day]?.ccTips?.toFixed(2) || 0,
        });

        currentDate = addDays(currentDate, 1);
      }

      return Object.keys(trends).map((x) => {
        return { id: x, data: trends[x] };
      });
    });
};
