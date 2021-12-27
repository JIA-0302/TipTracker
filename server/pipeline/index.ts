import {
  addProcessedData,
  deleteFutureTrendData,
} from "server/mongodb/actions/FutureTrends";
import {
  addShiftToQueue,
  deleteShiftInQueue,
  updateShiftInQueue,
} from "server/mysql/actions/queue";
import { IHourlyShiftDetails } from "server/mysql/models/hourlyShiftDetails";
import { generateHashForShiftData, getProcessedShiftData } from "./utils";

export async function addNewShiftData(shiftData: IHourlyShiftDetails) {
  const { id, employer_id, user_id } = shiftData;

  try {
    // Mark it was added to queue
    await addShiftToQueue(id, employer_id, user_id);

    const processedData = await getProcessedShiftData(shiftData);
    await addProcessedData(processedData);

    // Mark it was successfully processed
    await updateShiftInQueue(id, employer_id, user_id, true);
  } catch (err) {
    // Skip on error, nightly validation will add data that wasn't processed
    console.error(err);
  }
}

export async function updateExistingShiftData(
  newShiftData: IHourlyShiftDetails
) {
  try {
    const { id, employer_id, user_id } = newShiftData;
    await updateShiftInQueue(id, employer_id, user_id, false);

    const shiftDataHash = generateHashForShiftData(id, employer_id, user_id);
    await deleteFutureTrendData(shiftDataHash);

    const newProcessedData = await getProcessedShiftData(newShiftData);
    await addProcessedData(newProcessedData);

    // Mark it was successfully processed
    await updateShiftInQueue(id, employer_id, user_id, false);
  } catch (err) {
    // Skip on error, nightly validation will update data if not processed again
    console.error(err);
  }
}

export async function deleteExistingShiftData(
  shiftId: string,
  userId: string,
  employerId: string
) {
  try {
    const shiftDataHash = generateHashForShiftData(shiftId, employerId, userId);
    await deleteFutureTrendData(shiftDataHash);

    // On success, delete from queue
    await deleteShiftInQueue(shiftId, employerId, userId);
  } catch (err) {
    // Skip on error, nightly validation will remove data that shouldn't be there
    console.error(err);
  }
}
