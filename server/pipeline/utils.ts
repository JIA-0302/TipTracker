import { createHash } from "crypto";
import { addMinutes, format, parse, getWeekOfMonth } from "date-fns";
import { getEmployerById } from "server/mysql/actions/employers";
import { IHourlyShiftDetails } from "server/mysql/models/shiftData";

// This will be used to uniquely identify shift data for ML to perform updates and deletes
export function generateHashForShiftData(shiftId, employerId, userId) {
  const stringToHash = `${shiftId}|${employerId}|${userId}`;

  return createHash("sha512").update(stringToHash).digest("hex");
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
  let currentStartTime = startTime;
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
  } while (currentStartTime < endTime);

  return shiftTimes;
}

export async function getProcessedShiftData(shiftData: IHourlyShiftDetails) {
  const {
    shift_id,
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
    data["hash"] = generateHashForShiftData(shift_id, employer_id, user_id);
  });

  return splitShiftData;
}
