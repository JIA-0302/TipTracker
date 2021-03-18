import { query } from "..";
import { IQueue } from "../models/queue";

// These are helper functions to keep track of shift data that has been processed
const TABLE_NAME = "shift_data_queue";

export async function addShiftToQueue(shiftId, employerId, userId) {
  await query(
    `insert into ${TABLE_NAME} (shift_id, employer_id, user_id, processed)
        values (?, ?, ?, 0)`,
    [shiftId, employerId, userId]
  );
}

export async function updateShiftInQueue(
  shiftId,
  employerId,
  userId,
  hasProcessed: 0 | 1
) {
  await query(
    `update ${TABLE_NAME}
        set processed = ?
        where shift_id = ? and employer_id = ? and user_id = ?`,
    [hasProcessed, shiftId, employerId, userId]
  );
}

export async function deleteShiftInQueue(shiftId, employerId, userId) {
  await query(
    `delete from ${TABLE_NAME}
        where shift_id = ? and employer_id = ? and user_id = ?`,
    [shiftId, employerId, userId]
  );
}

export async function retrieveAllUnprocessedData(): Promise<IQueue[]> {
  return await query(
    `select shift_id, employer_id, user_id
        from ${TABLE_NAME}
        where processed = 0`
  );
}

/**
 * Compare hourly_shift_data with shift_data_queue
 * and find shifts that have not been added to shift_data_queue
 *
 * @returns array with shift_id, employer_id, and user_id to
 *          uniquely identify shift data
 */
export async function getMissingShiftData(): Promise<IQueue[]> {
  const missingShiftData = await query(
    `SELECT h.user_id, h.employer_id, h.shift_id
    FROM hourly_shift_details as h
    LEFT JOIN shift_data_queue s ON
    h.user_id = s.user_id and h.employer_id = s.employer_id and h.shift_id = s.shift_id
    WHERE s.queue_id is NULL`
  );

  return missingShiftData as IQueue[];
}

/**
 * Compare hourly_shift_data with shift_data_queue
 * and find shifts do not exist but are in shift_data_queue
 */
export async function findDeletedShiftData(): Promise<IQueue[]> {
  const deletedShiftData = await query(
    `SELECT dq.user_id, dq.employer_id, dq.shift_id
    FROM shift_data_queue as dq
    LEFT JOIN hourly_shift_details h ON
    dq.user_id = h.user_id and h.employer_id = dq.employer_id and h.shift_id = dq.shift_id
    WHERE h.shift_id is NULL;`
  );

  return deletedShiftData as IQueue[];
}
