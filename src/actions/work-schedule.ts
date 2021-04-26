import { getFormattedShiftDate, getFormattedShiftTime } from "utils/date-utils";

const BASE_URL = "api/work-schedule";

export const getWorkSchedule = async (shiftDate: string) => {
  const encodedShiftDate = encodeURIComponent(shiftDate);
  return fetch(`${BASE_URL}?shift_date=${encodedShiftDate}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      const { data } = json;
      if (data.schedule_id) {
        return {
          shift_date: getFormattedShiftDate(data["shift_date"]),
          start_time: getFormattedShiftTime(data["start_time"]),
          end_time: getFormattedShiftTime(data["end_time"]),
        };
      }

      return {};
    });
};

export const addWorkSchedule = async (
  shift_date: string,
  start_time: string,
  end_time: string
) => {
  return fetch(`${BASE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      shift_date,
      start_time,
      end_time,
    }),
  })
    .then((response) => response.json())
    .then((json) => {
      if (!json.success) {
        throw new Error(json.message);
      }
      return json.workScheduleDetail;
    });
};

export const updateWorkSchedule = async (
  shift_date: string,
  start_time: string,
  end_time: string
) => {
  return fetch(`${BASE_URL}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      shift_date,
      start_time,
      end_time,
    }),
  })
    .then((response) => response.json())
    .then((json) => {
      if (!json.success) {
        throw new Error(json.message);
      }
    });
};

export const deleteShiftData = async (shiftDate: string) => {
  const encodedShiftDate = encodeURIComponent(shiftDate);
  return fetch(`${BASE_URL}?shift_date=${encodedShiftDate}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((json) => {
      if (!json.success) {
        throw new Error(json.message);
      }
    });
};
