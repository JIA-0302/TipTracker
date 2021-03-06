import { format, endOfMonth } from "date-fns";
import {
  addNewShiftData,
  deleteExistingShiftData,
  updateExistingShiftData,
} from "server/pipeline";
import { query } from "../index";
import {
  IHourlyShiftDetails,
  INonHourlyShiftDetails,
} from "../models/shiftData";

const SHIFT_DATE_FORMAT = "yyyy-MM-dd";

export async function getAllShiftDetailsByUserIdWithinDateRange(
  userId: number,
  start_date: string,
  end_date: string
) {
  const hourlyShiftDetails = await query(
    `select * from hourly_shift_details where user_id = ?
                                          AND (shift_date >= ? AND shift_date <= ?)`,
    [userId, start_date, end_date]
  );
  const nonHourlyShiftDetails = await query(
    `select * from non_hourly_shift_details where user_id = ?
                                     AND (shift_date >= ? AND shift_date <= ?)`,
    [userId, start_date, end_date]
  );

  return {
    hourlyShiftDetails,
    nonHourlyShiftDetails,
  };
}

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
  shiftId: string | number,
  wageType: "HOURLY" | "NON_HOURLY"
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
  shiftData: IHourlyShiftDetails,
  employerId = 1
) {
  const {
    start_time,
    end_time,
    shift_date,
    hourly_wage,
    credit_card_tips,
    cash_tips,
  } = shiftData;

  const result = await query(
    `insert into hourly_shift_details (user_id, employer_id, shift_date, start_time, end_time, hourly_wage, credit_card_tips, cash_tips)
    values (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      userId,
      employerId,
      shift_date,
      start_time,
      end_time,
      hourly_wage,
      credit_card_tips,
      cash_tips,
    ]
  );

  // Hook to process new data for ML
  shiftData.shift_id = result.insertId;
  shiftData.user_id = userId;
  shiftData.employer_id = employerId;
  addNewShiftData(shiftData);

  return result.insertId;
}

export async function addNonHourlyShiftData(
  userId: number,
  shiftData: INonHourlyShiftDetails,
  employerId = 1
) {
  const {
    shift_date,
    total_base_earning,
    credit_card_tips,
    cash_tips,
  } = shiftData;

  const result = await query(
    `insert into non_hourly_shift_details (user_id, employer_id, shift_date, total_base_earning, credit_card_tips, cash_tips)
    values (?, ?, ?, ?, ?, ?)`,
    [
      userId,
      employerId,
      shift_date,
      total_base_earning,
      credit_card_tips,
      cash_tips,
    ]
  );

  return result.insertId;
}

export async function deleteShiftForUser(
  userId: number,
  shiftId: string,
  wageType: string
) {
  switch (wageType) {
    case "HOURLY":
      try {
        // Retrieve data to delete from ML
        const existingShiftData = await getShiftDetail(
          userId,
          shiftId,
          "HOURLY"
        );
        if (existingShiftData.length > 0) {
          deleteExistingShiftData(existingShiftData[0] as IHourlyShiftDetails);
        }
      } catch (err) {
        // Skip on error, nightly validation will remove inconsistent data
        console.error(err);
      }

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

export async function updateHourlyShiftData(
  userId: number | string,
  shiftId: string | number,
  shiftData: IHourlyShiftDetails,
  employerId = 1
) {
  const {
    start_time,
    end_time,
    shift_date,
    hourly_wage,
    credit_card_tips,
    cash_tips,
  } = shiftData;

  const result = await query(
    `update hourly_shift_details
    set shift_date = ?, start_time = ?, end_time = ?, hourly_wage = ?, credit_card_tips = ?, cash_tips = ?
    where user_id = ? and employer_id = ? and shift_id = ?`,
    [
      shift_date,
      start_time,
      end_time,
      hourly_wage,
      credit_card_tips,
      cash_tips,
      userId,
      employerId,
      shiftId,
    ]
  );

  if (result.affectedRows === 0) {
    throw Error("Could not update the specified shift");
  }

  // Hook to process update data for ML
  shiftData.shift_id = shiftId as number;
  shiftData.user_id = userId as number;
  shiftData.employer_id = employerId;
  updateExistingShiftData(shiftData);
}

export async function updateNonHourlyShiftData(
  userId: number | string,
  shiftId: number | string,
  shiftData: INonHourlyShiftDetails,
  employerId = 1
) {
  const {
    shift_date,
    total_base_earning,
    credit_card_tips,
    cash_tips,
  } = shiftData;

  const result = await query(
    `update non_hourly_shift_details
    set shift_date = ?, total_base_earning = ?, credit_card_tips = ?, cash_tips = ?
    where user_id = ? and employer_id = ? and shift_id = ?`,
    [
      shift_date,
      total_base_earning,
      credit_card_tips,
      cash_tips,
      userId,
      employerId,
      shiftId,
    ]
  );

  if (result.affectedRows === 0) {
    throw Error("Could not update the specified shift");
  }
}
