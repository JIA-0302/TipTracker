import mongoDB from "../index";
import FutureTrends from "../models/FutureTrends";

export async function addProcessedData(processedData: any[]) {
  await mongoDB();

  // Use transaction to ensure either all or no data is saved
  const session = await FutureTrends.startSession();
  session.startTransaction();

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
        week_of_month,
        day_of_week,
        month,
        year,
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
        week_of_month,
        day_of_week,
        month,
        year,
        industry,
        hash,
      });
    });

    await session.commitTransaction();
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
}

export async function deleteFutureTrendData(shiftDataHash: string) {
  await mongoDB();

  await FutureTrends.deleteMany({
    hash: shiftDataHash,
  });
}
