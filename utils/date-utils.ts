import { addMinutes, format, parseISO } from "date-fns";

function parseISODate(isoDate: string): Date {
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
