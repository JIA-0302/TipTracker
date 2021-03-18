import mongoDB from "../index";
import FutureTrends from "../models/FutureTrends";

export async function addProcessedData(processedData: any[]) {
  await mongoDB();

  const session = await FutureTrends.startSession();
  try {
    processedData.forEach(async (data) => {
      const {
        user_id,
        shift_date,
        start_time,
        end_time,
        credit_card_tips,
        cash_tips,
        hourly_wage,
        day_of_week,
        industry,
        hash,
      } = data;

      await FutureTrends.create({
        user_id,
        shift_date,
        start_time,
        end_time,
        credit_card_tips,
        cash_tips,
        hourly_wage,
        day_of_week,
        industry,
        hash,
      });

      await (await session).commitTransaction();
    });
  } catch (err) {
    (await session).abortTransaction();
    throw err;
  } finally {
    (await session).endSession();
  }
}

export async function deleteFutureTrendData(shiftDataHash: string) {
  await mongoDB();

  await FutureTrends.deleteMany({
    hash: shiftDataHash,
  });
}
