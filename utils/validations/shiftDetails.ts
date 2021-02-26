import {
  IHourlyShiftDetails,
  INonHourlyShiftDetails,
} from "server/mysql/models/shiftData";
import { parse, isSameDay } from "date-fns";

export function parseHourlyShiftDetails(body): IHourlyShiftDetails {
  const {
    shift_date,
    start_time,
    end_time,
    hourly_wage,
    credit_card_tips,
    cash_tips,
  } = body;

  validateShiftDate(shift_date);
  validateTime(start_time);
  validateTime(end_time);

  validateShiftTimeRange(shift_date, start_time, end_time);

  if (!hourly_wage) {
    throw Error(`Please specify an hourly wage`);
  }
  validateEarnings(hourly_wage, "hourly wage");
  validateEarnings(credit_card_tips, "credit card tips");
  validateEarnings(cash_tips, "cash tips");

  return {
    shift_date,
    start_time,
    end_time,
    hourly_wage: Number(hourly_wage),
    credit_card_tips: Number(credit_card_tips || 0),
    cash_tips: Number(cash_tips || 0),
  };
}

export function parseNonHourlyShiftDetails(body): INonHourlyShiftDetails {
  const { shift_date, total_base_earning, credit_card_tips, cash_tips } = body;
  validateShiftDate(shift_date);
  validateEarnings(total_base_earning, "total base earning");
  validateEarnings(credit_card_tips, "credit card tips");
  validateEarnings(cash_tips, "cash tips");

  return {
    shift_date,
    total_base_earning: Number(total_base_earning || 0),
    credit_card_tips: Number(credit_card_tips || 0),
    cash_tips: Number(cash_tips || 0),
  };
}

function validateShiftDate(shift_date: string) {
  if (!shift_date || shift_date.trim().length == 0) {
    throw Error(`Please specify the shift date`);
  } else if (!shift_date.match(/^\d{4}-\d{2}-\d{2}$/)) {
    throw Error("The shift date should be formatted as yyyy-MM-dd");
  }
}

function validateTime(shift_time: string) {
  if (!shift_time || shift_time.trim().length == 0) {
    throw Error(`Please specify the shift time`);
  } else if (!shift_time.match(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)) {
    throw Error("The shift time should be formatted as yyyy-MM-dd HH:mm:SS");
  }
}

function validateShiftTimeRange(
  shift_date: string,
  start_time: string,
  end_time: string
) {
  const parsedShiftDate = parse(shift_date, "yyyy-MM-dd", new Date());
  const parsedStartTime = parse(start_time, "yyyy-MM-dd HH:mm:SS", new Date());
  const parsedEndTime = parse(end_time, "yyyy-MM-dd HH:mm:SS", new Date());
  if (!isSameDay(parsedShiftDate, parsedStartTime)) {
    throw Error("Shift start time should be on the same day as the shift date");
  } else if (parsedStartTime > parsedEndTime) {
    throw Error("End time cannot be before the start time");
  }
}

function validateEarnings(amount: string | number, earningType: string) {
  if (!amount) {
    return;
  }

  const parsedAmount = Number(amount);

  if (Number.isNaN(parsedAmount) || parsedAmount < 0) {
    throw Error(`Please specify valid ${earningType}`);
  }
}
