import { format, endOfMonth } from "date-fns";
// import {
//   addNewShiftData,
//   deleteExistingShiftData,
//   updateExistingShiftData,
// } from "server/pipeline";
import mongoDB from "server/mongodb";
import {
  IHourlyShiftDetails,
  HourlyShiftDetails,
} from "../models/hourlyShiftDetails";
import {
  INonHourlyShiftDetails,
  NonHourlyShiftDetails,
} from "../models/nonHourlyShiftDetails";

const SHIFT_DATE_FORMAT = "yyyy-MM-dd";

export async function getAllShiftDetailsByUserIdWithinDateRange(
  userId: string,
  start_date: string,
  end_date: string
) {
  await mongoDB();

  const hourlyShiftDetails = await HourlyShiftDetails.find({
    user_id: userId,
    shift_date: { $gte: start_date, $lte: end_date },
  }).exec();

  const nonHourlyShiftDetails = await NonHourlyShiftDetails.find({
    user_id: userId,
    shift_date: { $gte: start_date, $lte: end_date },
  }).exec();

  return {
    hourlyShiftDetails,
    nonHourlyShiftDetails,
  };
}

export async function getAllShiftDetailsByUserId(userId: string) {
  await mongoDB();

  const hourlyShiftDetails = await HourlyShiftDetails.find({
    user_id: userId,
  }).exec();

  const nonHourlyShiftDetails = await NonHourlyShiftDetails.find({
    user_id: userId,
  }).exec();

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
  userId: string,
  month: number,
  year: number
) {
  await mongoDB();

  const startDate = new Date(year, month - 1); // January starts at 0
  const endDate = endOfMonth(startDate);

  const formattedStartDate = format(startDate, SHIFT_DATE_FORMAT);
  const formattedEndDate = format(endDate, SHIFT_DATE_FORMAT);

  return await getAllShiftDetailsByUserIdWithinDateRange(
    userId,
    formattedStartDate,
    formattedEndDate
  );
}

export async function getShiftDetail(
  userId: string,
  shiftId: string,
  wageType: "HOURLY" | "NON_HOURLY"
) {
  await mongoDB();

  switch (wageType) {
    case "HOURLY":
      return await HourlyShiftDetails.findOne({
        _id: shiftId,
        user_id: userId,
      }).exec();

    case "NON_HOURLY":
      return await NonHourlyShiftDetails.findOne({
        _id: shiftId,
        user_id: userId,
      }).exec();
  }
  return null;
}

export async function addHourlyShiftData(
  userId: string,
  shiftData: IHourlyShiftDetails
) {
  await mongoDB();

  const {
    start_time,
    end_time,
    shift_date,
    hourly_wage,
    credit_card_tips,
    cash_tips,
  } = shiftData;

  const data = new HourlyShiftDetails({
    user_id: userId,
    shift_date,
    start_time,
    end_time,
    hourly_wage,
    credit_card_tips,
    cash_tips,
  });

  const savedData = await data.save();

  // Hook to process new data for ML
  // shiftData.id = result.insertId;
  // shiftData.user_id = userId;
  // shiftData.employer_id = 1;
  // addNewShiftData(shiftData);

  return savedData.id;
}

export async function addNonHourlyShiftData(
  userId: number,
  shiftData: INonHourlyShiftDetails
) {
  await mongoDB();

  const {
    shift_date,
    total_base_earning,
    credit_card_tips,
    cash_tips,
  } = shiftData;

  const data = new NonHourlyShiftDetails({
    user_id: userId,
    shift_date,
    total_base_earning,
    credit_card_tips,
    cash_tips,
  });

  const savedData = await data.save();

  return savedData.id;
}

export async function deleteShiftForUser(
  userId: string,
  shiftId: string,
  wageType: string
) {
  await mongoDB();

  switch (wageType) {
    case "HOURLY":
      try {
        // Retrieve data to delete from ML
        await getShiftDetail(userId, shiftId, "HOURLY");
        // if (existingShiftData) {
        //   deleteExistingShiftData(existingShiftData[0] as IHourlyShiftDetails);
        // }
      } catch (err) {
        // Skip on error, nightly validation will remove inconsistent data
        console.error(err);
      }

      await HourlyShiftDetails.deleteOne({
        _id: shiftId,
        user_id: userId,
      }).exec();

      break;

    case "NON_HOURLY":
      await NonHourlyShiftDetails.deleteOne({
        _id: shiftId,
        user_id: userId,
      }).exec();

      break;
  }

  return;
}

export async function updateHourlyShiftData(
  userId: string,
  shiftId: string,
  shiftData: IHourlyShiftDetails
) {
  await mongoDB();

  const {
    start_time,
    end_time,
    shift_date,
    hourly_wage,
    credit_card_tips,
    cash_tips,
  } = shiftData;

  try {
    const existingShiftData = await getShiftDetail(userId, shiftId, "HOURLY");

    existingShiftData.start_time = start_time;
    existingShiftData.end_time = end_time;
    existingShiftData.shift_date = shift_date;
    existingShiftData.hourly_wage = hourly_wage;
    existingShiftData.credit_card_tips = credit_card_tips;
    existingShiftData.cash_tips = cash_tips;

    await existingShiftData.save();
  } catch (err) {
    throw Error("Could not update the specified shift");
  }

  // Hook to process update data for ML
  // shiftData.shift_id = shiftId as number;
  // shiftData.user_id = userId as number;
  // shiftData.employer_id = 1;
  // updateExistingShiftData(shiftData);
}

export async function updateNonHourlyShiftData(
  userId: string,
  shiftId: string,
  shiftData: INonHourlyShiftDetails
) {
  await mongoDB();

  const {
    shift_date,
    total_base_earning,
    credit_card_tips,
    cash_tips,
  } = shiftData;

  try {
    const existingShiftData = await getShiftDetail(
      userId,
      shiftId,
      "NON_HOURLY"
    );

    existingShiftData.shift_date = shift_date;
    existingShiftData.total_base_earning = total_base_earning;
    existingShiftData.credit_card_tips = credit_card_tips;
    existingShiftData.cash_tips = cash_tips;

    await existingShiftData.save();
  } catch (err) {
    throw Error("Could not update the specified shift");
  }
}
