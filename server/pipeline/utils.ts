import { createHash } from "crypto";
import { addMinutes, format, parse, getWeekOfMonth } from "date-fns";
import { getEmployerById } from "server/mongodb/actions/employers";
import { IHourlyShiftDetails } from "server/mongodb/models/hourlyShiftDetails";

// This will be used to uniquely identify shift data for ML to perform updates and deletes
export function generateHashForShiftData(shiftId, employerId, userId) {
  const stringToHash = `${shiftId}|${employerId}|${userId}`;

  return createHash("sha512").update(stringToHash).digest("hex");
}

/**
 * We need to round up/down the shift time as follows:
 *     0 - 15  |  Round down to 0 minutes
 *    16 - 45  |  Round down/up to 30 minutes
 *    46 - 59  |  Round up to 0 minutes and increment hour by 1
 *
 * @param shiftTime Date that needs to be adjusted
 * @returns Adjusted date
 */
function adjustShiftTime(shiftTime: Date) {
  const minutes = shiftTime.getMinutes();
  if (minutes <= 15) {
    shiftTime.setMinutes(0);
  } else if (minutes <= 45) {
    shiftTime.setMinutes(30);
  } else {
    shiftTime.setHours(shiftTime.getHours() + 1, 0);
  }
  return shiftTime;
}

/**
 * Split the start time and end time based on the defined interval
 * TODO - FUTURE GOAL, perform OCR on receipts to get accurate time ranges to find tip amounts
 *
 * @param startTime Start Time for shift
 * @param endTime End Time for shift
 * @param intervalTime Interval between shift times
 * @returns array of shift times divided into equal intervals between start and end
 */
export function splitShiftTime(
  startTime: Date,
  endTime: Date,
  intervalTime: number
) {
  const shiftTimes = [];
  let currentStartTime = adjustShiftTime(startTime);
  const adjustedEndTime = adjustShiftTime(endTime);

  let currentEndTime = addMinutes(
    startTime,
    Number(process.env.SHIFT_INTERVAL_MINUTES)
  );

  // Ensures there is atleast one shift time
  do {
    shiftTimes.push({
      start_time: format(currentStartTime, "HHmm"),
      end_time: format(currentEndTime, "HHmm"),
    });
    currentStartTime = currentEndTime;
    currentEndTime = addMinutes(currentStartTime, intervalTime);
  } while (currentStartTime < adjustedEndTime);

  return shiftTimes;
}

export async function getProcessedShiftData(shiftData: IHourlyShiftDetails) {
  const {
    _id,
    user_id,
    employer_id,
    start_time,
    end_time,
    hourly_wage,
    credit_card_tips,
    cash_tips,
  } = shiftData;

  // Divide shift into equal intervals
  const parsedStartTime = parse(start_time, "yyyy-MM-dd HH:mm:SS", new Date());
  const parsedEndTime = parse(end_time, "yyyy-MM-dd HH:mm:SS", new Date());
  const splitShiftData = splitShiftTime(
    parsedStartTime,
    parsedEndTime,
    Number(process.env.SHIFT_INTERVAL_MINUTES)
  );

  const employerIndustry = (await getEmployerById(employer_id)).industry;
  const shiftDate = format(parsedStartTime, "yyyy-MM-dd");
  const dayOfWeek = format(parsedStartTime, "i");
  const month = parsedStartTime.getMonth();
  const year = format(parsedStartTime, "yyyy");
  const weekOfMonth = getWeekOfMonth(parsedStartTime);

  // Add additional features for ML Model if needed here

  const totalIntervals = splitShiftData.length;

  // Add all relevant data to each shift interval
  splitShiftData.forEach((data) => {
    data["user_id"] = user_id;
    data["shift_date"] = shiftDate;
    data["industry"] = employerIndustry;

    data["hourly_wage"] = hourly_wage;
    data["day_of_week"] = dayOfWeek;
    data["month"] = month;
    data["year"] = year;
    data["week_of_month"] = weekOfMonth;

    // Split the tips equally among each shift interval
    data["credit_card_tips"] = parseFloat(
      (credit_card_tips / totalIntervals).toFixed(2)
    );
    data["cash_tips"] = parseFloat((cash_tips / totalIntervals).toFixed(2));

    // This will uniquely identify a shift data which is required for updates/deletes
    data["hash"] = generateHashForShiftData(_id, employer_id, user_id);
  });

  return splitShiftData;
}
