import { createHash } from "crypto";
import { addMinutes, format, parse } from "date-fns";
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
    endTime,
    Number(process.env.SHIFT_INTERVAL_MINUTES)
  );

  // Ensures there is atleast one shift time
  do {
    shiftTimes.push({
      start_time: format(currentStartTime, "yyyy-MM-dd HH:mm:SS"),
      end_time: format(currentEndTime, "yyyy-MM-dd HH:mm:SS"),
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

  // Get employer details
  const employerIndustry = (await getEmployerById(employer_id)).industry;

  // TODO - Fetch additional information if needed to create ML model

  // Add all relevant data to each shift interval
  const totalIntervals = splitShiftData.length;
  splitShiftData.forEach((data) => {
    // Split the tips equally among each shift interval
    data["credit_card_tips"] = credit_card_tips / totalIntervals;
    data["cash_tips"] = cash_tips / totalIntervals;

    data["hourly_wage"] = hourly_wage;
    data["day_of_week"] = format(parsedStartTime, "dddd");
    data["industry"] = employerIndustry;

    // This will uniquely identify a shift data which is required for updates/deletes
    data["hash"] = generateHashForShiftData(shift_id, employer_id, user_id);
  });

  return splitShiftData;
}
