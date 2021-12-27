import {
  getFormattedShiftDate,
  getFormattedShiftTime,
  parseTimeString,
} from "utils/date-utils";

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
      if (data && data._id) {
        return {
          shift_date: getFormattedShiftDate(data["shift_date"]),
          start_time: getFormattedShiftTime(data["start_time"]),
          end_time: getFormattedShiftTime(data["end_time"]),
          isExistingData: true,
        };
      }

      return {
        shift_date: "",
        start_time: "",
        end_time: "",
        isExistingData: false,
      };
    });
};

export const getUpcomingWorkSchedule = async (shiftDate: string) => {
  const encodedShiftDate = encodeURIComponent(shiftDate);
  return fetch(`${BASE_URL}/upcoming?shift_date=${encodedShiftDate}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      const { data } = json;
      if (data && data._id) {
        const startTime = getFormattedShiftTime(data["start_time"]);
        const endTime = getFormattedShiftTime(data["end_time"]);

        return {
          shiftDate: getFormattedShiftDate(data["shift_date"]),
          startTime: parseTimeString(startTime),
          endTime: parseTimeString(endTime),
        };
      }

      return null;
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

export const deleteWorkSchedule = async (shiftDate: string) => {
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
