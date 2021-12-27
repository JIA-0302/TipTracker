import mongoDB from "server/mongodb";
import { WorkSchedule } from "../models/workSchedule";

const DEFAULT_EMPLOYER_ID = null;

export async function getWorkScheduleById(scheduleId: string) {
  await mongoDB();

  return await WorkSchedule.findById(scheduleId).exec();
}

export async function getUpcomingWorkSchedule(
  userId: string,
  shiftDate: string,
  employerId = DEFAULT_EMPLOYER_ID
) {
  await mongoDB();

  return await WorkSchedule.findOne({
    user_id: userId,
    employer_id: employerId,
    shift_date: { $gte: shiftDate },
  })
    .sort({ shift_date: -1 })
    .exec();
}

export async function getWorkScheduleByDate(
  userId: string,
  shiftDate: string,
  employerId = DEFAULT_EMPLOYER_ID
) {
  await mongoDB();

  return await WorkSchedule.findOne({
    user_id: userId,
    employer_id: employerId,
    shift_date: shiftDate,
  }).exec();
}

export async function addWorkSchedule(
  userId: string,
  shiftDate: string,
  startTime: string,
  endTime: string,
  employerId = DEFAULT_EMPLOYER_ID
) {
  await mongoDB();

  const data = new WorkSchedule({
    user_id: userId,
    employer_id: employerId,
    shift_date: shiftDate,
    start_time: startTime,
    end_time: endTime,
  });

  const result = await data.save();

  return result._id;
}

export async function updateWorkSchedule(
  userId: string,
  shiftDate: string,
  startTime: string,
  endTime: string,
  employerId = DEFAULT_EMPLOYER_ID
) {
  const existingSchedule = await getWorkScheduleByDate(
    userId,
    shiftDate,
    employerId
  );

  try {
    existingSchedule.start_time = startTime;
    existingSchedule.end_time = endTime;

    await existingSchedule.save();
  } catch (err) {
    throw Error("Could not update the specified work schedule");
  }
}

export async function deleteWorkSchedule(
  userId: string,
  shiftDate: string,
  employerId = DEFAULT_EMPLOYER_ID
) {
  await WorkSchedule.deleteOne({
    user_id: userId,
    employer_id: employerId,
    shift_date: shiftDate,
  }).exec();
}
