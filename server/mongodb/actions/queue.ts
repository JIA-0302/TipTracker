import { IQueue, Queue } from "../models/queue";
import mongoDB from "server/mongodb";

export async function addShiftToQueue(shiftId, employerId, userId) {
  await mongoDB();

  const data = new Queue({
    shift_id: shiftId,
    employer_id: employerId,
    user_id: userId,
  });

  await data.save();
}

export async function updateShiftInQueue(
  shiftId,
  employerId,
  userId,
  hasProcessed: boolean
) {
  await mongoDB();

  const data = await Queue.findOne({
    shift_id: shiftId,
    employer_id: employerId,
    user_id: userId,
  }).exec();

  data.processed = hasProcessed;

  await data.save();
}

export async function deleteShiftInQueue(shiftId, employerId, userId) {
  await Queue.deleteOne({
    shift_id: shiftId,
    employer_id: employerId,
    user_id: userId,
  }).exec();
}

export async function retrieveAllUnprocessedData(): Promise<IQueue[]> {
  return await Queue.find({ processed: false }).exec();
}

/**
 * Compare hourly_shift_data with shift_data_queue
 * and find shifts that have not been added to shift_data_queue
 *
 * @returns array with shift_id, employer_id, and user_id to
 *          uniquely identify shift data
 */
export async function getMissingShiftData(): Promise<IQueue[]> {
  // TODO - Implement this logic for Mongo

  // const missingShiftData = await query(
  //   `SELECT h.user_id, h.employer_id, h.shift_id
  //   FROM hourly_shift_details as h
  //   LEFT JOIN shift_data_queue s ON
  //   h.user_id = s.user_id and h.employer_id = s.employer_id and h.shift_id = s.shift_id
  //   WHERE s.queue_id is NULL`
  // );

  return [] as IQueue[];
}

/**
 * Compare hourly_shift_data with shift_data_queue
 * and find shifts do not exist but are in shift_data_queue
 */
export async function findDeletedShiftData(): Promise<IQueue[]> {
  // TODO - Implement this logic for MongoDB

  // const deletedShiftData = await query(
  //   `SELECT dq.user_id, dq.employer_id, dq.shift_id
  //   FROM shift_data_queue as dq
  //   LEFT JOIN hourly_shift_details h ON
  //   dq.user_id = h.user_id and h.employer_id = dq.employer_id and h.shift_id = dq.shift_id
  //   WHERE h.shift_id is NULL;`
  // );

  return [] as IQueue[];
}
