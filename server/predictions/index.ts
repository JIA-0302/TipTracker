import { findProfitableInterval } from "./intervals";

/**
 * Make API call to ML microservice to retrieve predicted tips.
 *
 * @param user_id User Id for which data is being requested
 * @param dates Dates for which data is required
 * @returns Dictionary of days with list of predicted tips for different intervals for the given day
 */
async function getPredictedTips(user_id: number, dates: string[]) {
  const url = `${process.env.ML_SERVICE_URL}/predict-tips`;
  const requestData = { user_id, dates };

  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.ML_ACCESS_TOKEN}`,
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch(() => {
      throw "Error connecting to the server. Please try again later";
    });
}

// Returns a dict with list of shift date and the most profitable shift time for each day.
// If null, it means there was not sufficient data to make predictions
export async function findProfitableShifts(user_id: number, dates: string[]) {
  try {
    const { result, error } = await getPredictedTips(user_id, dates);

    if (error) {
      throw error;
    }

    const possibleShiftHours = [4, 5, 6];

    const profitableShifts = {};
    for (const shiftDay in result) {
      // TODO: Retrieve User's desired shift hour for each weekday from settings once implemented
      const shiftHour =
        possibleShiftHours[
          Math.floor(Math.random() * possibleShiftHours.length)
        ];

      profitableShifts[shiftDay] = findProfitableInterval(
        result[shiftDay],
        shiftHour
      );
    }

    return profitableShifts;
  } catch (err) {
    throw err.message || err;
  }
}
