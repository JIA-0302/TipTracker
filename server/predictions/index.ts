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
export async function findProfitableShifts(
  user_id: number,
  dates: string[],
  shift_hour: number
) {
  try {
    const { result, error } = await getPredictedTips(user_id, dates);

    if (error) {
      throw error;
    }

    const profitableShifts = {};
    for (const shiftDay in result) {
      profitableShifts[shiftDay] = findProfitableInterval(
        result[shiftDay],
        shift_hour
      );
    }

    return profitableShifts;
  } catch (err) {
    throw err.message || err;
  }
}
