import { query } from "../index"

export async function getShiftDetailsByUserId(userId: number) {
  const hourlyShiftDetails = await query(
    `select * from hourly_shift_details where user_id = ?`,
    [userId]
  )
  const nonHourlyShiftDetails = await query(
    `select * from non_hourly_shift_details where user_id = ?`,
    [userId]
  )

  return {
    hourlyShiftDetails,
    nonHourlyShiftDetails,
  }
}

// TODO - Implement other functions to edit and delete shift details for a user
