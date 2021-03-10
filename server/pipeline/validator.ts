import {
  addShiftToQueue,
  getMissingShiftData,
  retrieveAllUnprocessedData,
} from "server/mysql/actions/queue";
import { getShiftDetail } from "server/mysql/actions/shiftData";
import { IHourlyShiftDetails } from "server/mysql/models/shiftData";
import { addNewShiftData } from ".";

async function addMissingShiftDataToQueue() {
  try {
    const missingShiftData = await getMissingShiftData();

    for (const data of missingShiftData) {
      const { shift_id, employer_id, user_id } = data;
      await addShiftToQueue(shift_id, employer_id, user_id);
    }
  } catch (err) {
    // TODO - notify Admin that it failed to add missing data to queue
  }
}

export async function processMissingShiftData() {
  // Add all missing data first
  await addMissingShiftDataToQueue();

  let attempts = 5;
  while (attempts > 0) {
    try {
      let hasErrors = false;
      const unprocessedData = await retrieveAllUnprocessedData();

      for (const data of unprocessedData) {
        try {
          const shiftData = await getShiftDetail(
            data.user_id,
            data.shift_id,
            "HOURLY"
          )[0];
          addNewShiftData(shiftData as IHourlyShiftDetails);
        } catch (err) {
          // Even if error is detected, allow remaining data to be processed in this batch
          hasErrors = true;
        }
      }

      if (hasErrors) {
        throw Error("Error processing few unprocessed data");
      }

      // On success return
      return;
    } catch (err) {
      // On error, try again
      attempts--;
    }
  }

  // If this is reached, there were some error detected while processing the data
  // TODO - Notify admins that it failed to process data
}
