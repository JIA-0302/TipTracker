import {
  addProcessedData,
  deleteFutureTrendData,
} from "server/mongodb/actions/FutureTrends";
import {
  addShiftToQueue,
  deleteShiftInQueue,
  updateShiftInQueue,
} from "server/mysql/actions/queue";
import { IHourlyShiftDetails } from "server/mysql/models/shiftData";
import { generateHashForShiftData, getProcessedShiftData } from "./utils";

export async function addNewShiftData(shiftData: IHourlyShiftDetails) {
  const { shift_id, employer_id, user_id } = shiftData;

  try {
    // Mark it was added to queue
    await addShiftToQueue(shift_id, employer_id, user_id);

    const processedData = await getProcessedShiftData(shiftData);
    await addProcessedData(processedData);

    // Mark it was successfully processed
    await updateShiftInQueue(shift_id, employer_id, user_id, 1);
  } catch (err) {
    // Skip on error, nightly validation will add data that wasn't processed
    console.error(err);
  }
}

export async function updateExistingShiftData(
  newShiftData: IHourlyShiftDetails
) {
  try {
    const { shift_id, employer_id, user_id } = newShiftData;
    await updateShiftInQueue(shift_id, employer_id, user_id, 0);

    const shiftDataHash = generateHashForShiftData(
      shift_id,
      employer_id,
      user_id
    );
    await deleteFutureTrendData(shiftDataHash);

    const newProcessedData = await getProcessedShiftData(newShiftData);
    await addProcessedData(newProcessedData);

    // Mark it was successfully processed
    await updateShiftInQueue(shift_id, employer_id, user_id, 1);
  } catch (err) {
    // Skip on error, nightly validation will update data if not processed again
    console.error(err);
  }
}

export async function deleteExistingShiftData(shiftData: IHourlyShiftDetails) {
  try {
    const { shift_id, employer_id, user_id } = shiftData;

    const shiftDataHash = generateHashForShiftData(
      shift_id,
      employer_id,
      user_id
    );
    await deleteFutureTrendData(shiftDataHash);

    // On success, delete from queue
    await deleteShiftInQueue(shift_id, employer_id, user_id);
  } catch (err) {
    // Skip on error, nightly validation will remove data that shouldn't be there
    console.error(err);
  }
}
