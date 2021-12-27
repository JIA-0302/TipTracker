import { IWorkedShiftDay } from "src/providers/WorkedShiftContext";
import { getFormattedShiftDate, getFormattedShiftTime } from "utils/date-utils";

type APIWageType = "hourly" | "non-hourly";

export const createShiftData = async (data) => {
  return fetch("api/shift-details", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((json) => {
      if (!json.success) {
        throw new Error(json.message);
      }
      return json.shiftDetail;
    });
};

export const getFilteredShiftData = async (
  start_date: string,
  end_date: string
) => {
  return fetch(
    `/api/summary/summary-data?start_date=${encodeURIComponent(
      start_date
    )}&end_date=${encodeURIComponent(end_date)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      const shiftDataArr = [];
      data.shiftDetail.hourlyShiftDetails.forEach((shiftDetail) =>
        shiftDataArr.push({
          ...shiftDetail,
          shift_date: getFormattedShiftDate(shiftDetail["shift_date"]),
          start_time: getFormattedShiftTime(shiftDetail["start_time"]),
          end_time: getFormattedShiftTime(shiftDetail["end_time"]),
        })
      );
      data.shiftDetail.nonHourlyShiftDetails.forEach((shiftDetail) =>
        shiftDataArr.push({
          ...shiftDetail,
          shift_date: getFormattedShiftDate(shiftDetail["shift_date"]),
        })
      );

      return shiftDataArr;
    });
};

export const getShiftData = async (wageType: APIWageType, shiftId) => {
  const url = `api/shift-details/${wageType}/${shiftId}`;
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const shiftDetail = data.shiftDetail;
      if (shiftDetail) {
        if (wageType === "hourly") {
          return {
            ...shiftDetail,
            shift_date: getFormattedShiftDate(shiftDetail["shift_date"]),
            start_time: getFormattedShiftTime(shiftDetail["start_time"]),
            end_time: getFormattedShiftTime(shiftDetail["end_time"]),
          };
        } else {
          return {
            ...shiftDetail,
            shift_date: getFormattedShiftDate(shiftDetail["shift_date"]),
          };
        }
      }
      return {};
    });
};

export const updateShiftData = async (wageType: APIWageType, shiftId, data) => {
  const url = `api/shift-details/${wageType}/${shiftId}`;
  return fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((json) => {
      if (!json.success) {
        throw new Error(json.message);
      }
    });
};

export const deleteShiftData = async (wageType: APIWageType, shiftId) => {
  const url = `api/shift-details/${wageType}/${shiftId}`;
  return fetch(url, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((json) => {
      if (!json.success) {
        throw new Error(json.message);
      }
    });
};

export const getWorkedDays = async (month, year) => {
  const url = `api/shift-details/worked?month=${month}&year=${year}`;

  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const newShiftData: IWorkedShiftDay = {};

      if (data.hourlyShiftDetails) {
        data.hourlyShiftDetails.forEach((shift) => {
          newShiftData[getFormattedShiftDate(shift["shift_date"])] = {
            id: shift._id,
            wageType: "HOURLY",
          };
        });
      }
      if (data.nonHourlyShiftDetails) {
        data.nonHourlyShiftDetails.forEach((shift) => {
          newShiftData[getFormattedShiftDate(shift["shift_date"])] = {
            id: shift._id,
            wageType: "NON_HOURLY",
          };
        });
      }

      return newShiftData;
    });
};

export const getFilteredFutureShiftData = async (
  start_date: string,
  end_date: string
) => {
  return fetch(
    `api/future-trends/future-shifts?start_date=${encodeURIComponent(
      start_date
    )}&end_date=${encodeURIComponent(end_date)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      const weeklyFutureShiftData = [];
      data.futureShiftDetail.forEach((shiftDetail) =>
        weeklyFutureShiftData.push({
          ...shiftDetail,
          shift_date: getFormattedShiftDate(shiftDetail["shift_date"]),
          start_time: getFormattedShiftTime(shiftDetail["start_time"]),
          end_time: getFormattedShiftTime(shiftDetail["end_time"]),
        })
      );

      return weeklyFutureShiftData;
    });
};
