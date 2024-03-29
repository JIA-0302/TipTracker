import { addMinutes, format, parse, parseISO } from "date-fns";

export function parseISODate(isoDate: string): Date {
  const parsedDate = parseISO(isoDate);
  if (process.env.NODE_ENV === "production") {
    return addMinutes(parsedDate, parsedDate.getTimezoneOffset());
  }
  return parsedDate;
}

export function getFormattedShiftDate(shiftDate: string): string {
  const parsedDate = parseISODate(shiftDate);
  return format(parsedDate, "yyyy-MM-dd");
}

export function getFormattedShiftTime(shiftTime: string): string {
  const parsedDate = parseISODate(shiftTime);
  return format(parsedDate, "HH:mm");
}

export function parseTimeString(time: string): string {
  const splitTime = time.split(":").map((x) => Number(x));
  let hour = splitTime[0];
  const minutes = splitTime[1];

  // Adjust hour to PM if needed
  let timeOfDay = "AM";
  if (hour >= 12) {
    timeOfDay = "PM";
    if (hour > 12) {
      hour = hour % 12;
    }
  }

  // Pad minutes with leading 0
  const formattedMinutes = minutes < 10 ? `0${minutes}` : String(minutes);

  return `${hour}:${formattedMinutes} ${timeOfDay}`;
}

export function getDateFromRequestQuery(query) {
  let currentDate = new Date();
  if (query?.date) {
    const { date } = query;
    let rawStartDate = "";
    if (typeof date === "string") {
      rawStartDate = date;
    } else {
      rawStartDate = date[0];
    }
    try {
      currentDate = parse(rawStartDate, "yyyy-MM-dd", currentDate);
    } catch (err) {
      console.error(err);
    }
  }

  return currentDate;
}
