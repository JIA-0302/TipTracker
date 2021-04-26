import { query } from "../index";

export async function getWorkScheduleById(
  userId: number,
  scheduleId: number | string,
  employerId = 1
) {
  return await query(
    `select * from work_schedule_details
        where schedule_id = ? and user_id = ? and employer_id = ?`,
    [scheduleId, userId, employerId]
  );
}

export async function getWorkScheduleByDate(
  userId: number,
  shiftDate: string,
  employerId = 1
) {
  return await query(
    `select * from work_schedule_details
            where shift_date = ? and user_id = ? and employer_id = ?`,
    [shiftDate, userId, employerId]
  );
}

export async function addWorkSchedule(
  userId: number,
  shiftDate: string,
  startTime: string,
  endTime: string,
  employerId = 1
) {
  const result = await query(
    `insert into work_schedule_details 
    (user_id, employer_id, shift_date, start_time, end_time) 
    values (?, ?, ?, ?, ?)`,
    [userId, employerId, shiftDate, startTime, endTime]
  );

  return result.insertId;
}

export async function updateWorkSchedule(
  userId: number,
  shiftDate: string,
  startTime: string,
  endTime: string,
  employerId = 1
) {
  const result = await query(
    `update work_schedule_details 
        set start_time = ?, end_time = ?
        where user_id = ? and employer_id = ? and shift_date = ?`,
    [startTime, endTime, userId, employerId, shiftDate]
  );

  if (result.affectedRows === 0) {
    throw Error("Could not update the specified work schedule");
  }
}

export async function deleteWorkSchedule(
  userId: number,
  shiftDate: string,
  employerId = 1
) {
  await query(
    `delete from work_schedule_details where user_id = ? and employer_id = ? and shift_date = ? `,
    [userId, employerId, shiftDate]
  );
}
