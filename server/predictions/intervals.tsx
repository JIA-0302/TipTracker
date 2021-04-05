function stripDate(datetime) {
  return datetime.split(" ")[1];
}

export function findProfitableInterval(shift_intervals, shift_hour) {
  // If there is no interval or
  if (
    shift_intervals === null ||
    shift_intervals.length == 0 ||
    shift_hour <= 0
  ) {
    return null;
  }

  // Order the intervals based on the start time
  shift_intervals.sort((a, b) => {
    const a_start_time = new Date(a.start_time);
    const b_start_time = new Date(b.start_time);

    if (a_start_time < b_start_time) return -1;
    if (a_start_time > b_start_time) return 1;
    return 0;
  });

  // Total intervals retrieve from the ML model
  const total_intervals = shift_intervals.length;

  // Each hour will have to intervals eg: 10:00 - 10:30 and 10:30 - 11:00
  const max_allowed_interval = shift_hour * 2;

  let startIndex = 0;
  let endIndex = max_allowed_interval;

  // If the total number of intervals available than the intervals based on provided shift_hour
  // use the all intervals that we have instead of that provided
  if (endIndex > total_intervals) {
    endIndex = total_intervals;
  }

  // Store the maximum tips here
  let max_tips = 0;
  let max_interval = {
    start_time: "",
    end_time: "",
    cash_tips: 0,
    credit_card_tips: 0,
    hour: shift_hour,
  };

  // Iterate over intervals based on the intervals (shift_hour * 2) specified
  do {
    const subset_intervals = shift_intervals.slice(startIndex, endIndex);
    let total_cash_tips = 0;
    let total_credit_card_tips = 0;

    subset_intervals.forEach((interval) => {
      total_cash_tips += interval["cash_tips"];
      total_credit_card_tips += interval["credit_card_tips"];
    });

    const current_total_tips = total_credit_card_tips + total_cash_tips;

    if (current_total_tips > max_tips) {
      max_tips = current_total_tips;
      max_interval = {
        start_time: subset_intervals[0]["start_time"],
        end_time: subset_intervals[subset_intervals.length - 1]["end_time"],
        cash_tips: total_cash_tips,
        credit_card_tips: total_credit_card_tips,
        hour: subset_intervals.length / 2, // Two intervals are there in an hour
      };
    }

    startIndex++;
    endIndex++;
  } while (endIndex < total_intervals);

  const { start_time, end_time, cash_tips, credit_card_tips } = max_interval;
  // Format the time to include time portion only
  max_interval["start_time"] = stripDate(start_time);
  max_interval["end_time"] = stripDate(end_time);

  // Round up the tips to 2 decimal places
  max_interval["cash_tips"] = Math.round((cash_tips + 0.005) * 100) / 100;
  max_interval["credit_card_tips"] =
    Math.round((credit_card_tips + 0.005) * 100) / 100;

  return max_interval;
}
