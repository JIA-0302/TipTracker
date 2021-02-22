import { format, endOfMonth } from "date-fns";
import { query } from "../index";

const SHIFT_DATE_FORMAT = "yyyy-MM-dd";

export async function getAllShiftDetailsByUserId(userId: number) {
  const hourlyShiftDetails = await query(
    `select * from hourly_shift_details where user_id = ?`,
    [userId]
  );
  const nonHourlyShiftDetails = await query(
    `select * from non_hourly_shift_details where user_id = ?`,
    [userId]
  );

  return {
    hourlyShiftDetails,
    nonHourlyShiftDetails,
  };
}

/**
 * Returns a list of shift_id and shift_date for the days worked
 * for the given month and year
 *
 * @param userId
 * @param month
 * @param year
 */
export async function getWorkedDaysForMonth(
  userId: number,
  month: number,
  year: number
) {
  const startDate = new Date(year, month - 1); // January starts at 0
  const endDate = endOfMonth(startDate);

  const formattedStartDate = format(startDate, SHIFT_DATE_FORMAT);
  const formattedEndDate = format(endDate, SHIFT_DATE_FORMAT);

  const hourlyShiftDetails = await query(
    `select shift_id, shift_date from hourly_shift_details
    where (shift_date between ? and ?) and user_id = ?`,
    [formattedStartDate, formattedEndDate, userId]
  );

  const nonHourlyShiftDetails = await query(
    `select shift_id, shift_date from non_hourly_shift_details
    where (shift_date between ? and ?) and user_id = ?`,
    [formattedStartDate, formattedEndDate, userId]
  );

  return {
    hourlyShiftDetails,
    nonHourlyShiftDetails,
  };
}

export async function getShiftDetail(
  userId: number,
  shiftId: string,
  wageType: string
) {
  switch (wageType) {
    case "HOURLY":
      return await query(
        `select * from hourly_shift_details where user_id = ? and shift_id = ?`,
        [userId, shiftId]
      );

    case "NON_HOURLY":
      return await query(
        `select * from non_hourly_shift_details where user_id = ? and shift_id = ?`,
        [userId, shiftId]
      );
  }
  return null;
}

export async function addHourlyShiftData(
  userId: number,
  shiftData,
  employerId = 2
) {
  const {
    startTime,
    endTime,
    shiftDate,
    hourlyWage,
    creditCardTips,
    cashTips,
  } = shiftData;

  await query(
    `insert into hourly_shift_details (user_id, employer_id, shift_date, start_time, end_time, hourly_wage, credit_card_tips, cash_tips)
    values (?, ?, ?, ?, ?)`,
    [
      userId,
      employerId,
      shiftDate,
      startTime,
      endTime,
      hourlyWage,
      creditCardTips,
      cashTips,
    ]
  );
}

export async function addNonHourlyShiftData(
  userId: number,
  shiftData,
  employerId = 2
) {
  const { shiftDate, baseEarnings, creditCardTips, cashTips } = shiftData;

  await query(
    `insert into hourly_shift_details (user_id, employer_id, shift_date, base_earnings, credit_card_tips, cash_tips)
    values (?, ?, ?, ?)`,
    [userId, employerId, shiftDate, baseEarnings, creditCardTips, cashTips]
  );
}

export async function deleteShiftForUser(
  userId: number,
  shiftId: string,
  wageType: string
) {
  switch (wageType) {
    case "HOURLY":
      await query(
        `delete from hourly_shift_details where user_id = ? and shift_id = ?`,
        [userId, shiftId]
      );
      break;

    case "NON_HOURLY":
      await query(
        `delete from non_hourly_shift_details where user_id = ? and shift_id = ?`,
        [userId, shiftId]
      );
      break;
  }

  return;
}
