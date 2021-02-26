import format from "date-fns/format";
import { IWorkedShiftDay } from "src/providers/WorkedShiftContext";

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
            shift_date: parseRawDate(shiftDetail["shift_date"]),
            start_time: parseRawTime(shiftDetail["start_time"]),
            end_time: parseRawTime(shiftDetail["end_time"]),
          };
        } else {
          return {
            ...shiftDetail,
            shift_date: parseRawDate(shiftDetail["shift_date"]),
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
          newShiftData[parseRawDate(shift["shift_date"])] = {
            id: shift.shift_id,
            wageType: "HOURLY",
          };
        });
      }
      if (data.nonHourlyShiftDetails) {
        data.nonHourlyShiftDetails.forEach((shift) => {
          newShiftData[parseRawDate(shift["shift_date"])] = {
            id: shift.shift_id,
            wageType: "NON_HOURLY",
          };
        });
      }

      return newShiftData;
    });
};

const parseRawDate = (date: string) => {
  return format(new Date(date), "yyyy-MM-dd");
};

const parseRawTime = (datetime: string) => {
  return format(new Date(datetime), "HH:mm");
};