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


export async function getWeeklyFutureTrendsData(
    userId: number,
    start_date: string,
    end_date: string
) {
 // await mongoDB();

  const futureShiftDetails = [
    {
      "userId" : 1,
      "shift_date":"2021-03-28",
      "start_time":"2021-03-28T10:14:01.054Z",
      "end_time":"2021-03-28T16:18:01.054Z",
      "cash_tips": 100,
      "credit_card_tips": 50
    },
    {
      "userId" : 1,
      "shift_date":"2021-03-29",
      "start_time":"2021-03-29T16:04:01.054Z",
      "end_time":"2021-03-29T21:10:01.054Z",
      "cash_tips": 250,
      "credit_card_tips": 49
    },
    {
      "userId" : 1,
      "shift_date":"2021-03-30",
      "start_time":"2021-03-30T10:14:01.054Z",
      "end_time":"2021-03-30T16:18:01.054Z",
      "cash_tips": 50,
      "credit_card_tips": 200
    },
    {
      "userId" : 1,
      "shift_date":"2021-03-31",
      "start_time":"2021-03-31T16:10:01.054Z",
      "end_time":"2021-03-28T19:18:01.054Z",
      "cash_tips": 117,
      "credit_card_tips": 35
    },
    {
      "userId" : 1,
      "shift_date":"2021-04-01",
      "start_time":"2021-04-01T12:13:01.054Z",
      "end_time":"2021-04-01T21:21:01.054Z",
      "cash_tips": 121,
      "credit_card_tips": 23
    },
    {
      "userId" : 1,
      "shift_date":"2021-04-02",
      "start_time":"2021-04-02T05:14:01.054Z",
      "end_time":"2021-03-28T16:13:01.054Z",
      "cash_tips": 323,
      "credit_card_tips": 12
    },
    {
      "userId" : 1,
      "shift_date":"2021-04-03",
      "start_time":"2021-04-03T16:14:01.054Z",
      "end_time":"2021-04-03T20:18:01.054Z",
      "cash_tips": 110,
      "credit_card_tips": 66
    }
  ];

  return futureShiftDetails;
}
