function createData(
  date: string,
  day: string,
  shiftTime: string,
  totalHours: number,
  hourlyWages: number,
  cashTips: number,
  ccTips: number,
  totalTips: number
) {
  return {
    date,
    day,
    shiftTime,
    totalHours,
    hourlyWages,
    cashTips,
    ccTips,
    totalTips,
  };
}
const hourlyRate = 10;

const rows = [
  createData(
    "09-01-2020",
    "Mon",
    "4:30PM-10:00PM",
    5.5,
    hourlyRate * 5.5,
    96,
    72.42,
    168.42
  ),
  createData(
    "09-02-2020",
    "Tues",
    "2:30PM-8:00PM",
    5.5,
    hourlyRate * 5.5,
    36.65,
    23.75,
    60.4
  ),
  createData(
    "09-03-2020",
    "Wed",
    "4:30PM-10:00PM",
    5.5,
    hourlyRate * 5.5,
    96,
    72.42,
    168.42
  ),
  createData(
    "09-04-2020",
    "Thurs",
    "2:30PM-8:00PM",
    5.5,
    hourlyRate * 5.5,
    36.65,
    23.75,
    60.4
  ),
  createData(
    "09-05-2020",
    "Fri",
    "4:30PM-10:00PM",
    5.5,
    hourlyRate * 5.5,
    96,
    72.42,
    168.42
  ),
  createData(
    "09-06-2020",
    "Sat",
    "2:30PM-8:00PM",
    5.5,
    hourlyRate * 5.5,
    36.65,
    23.75,
    60.4
  ),
  createData(
    "09-07-2020",
    "Sun",
    "4:30PM-10:00PM",
    5.5,
    hourlyRate * 5.5,
    96,
    72.42,
    168.42
  ),
  createData(
    "09-08-2020",
    "Mon",
    "2:30PM-8:00PM",
    5.5,
    hourlyRate * 5.5,
    36.65,
    23.75,
    60.4
  ),
  createData(
    "09-09-2020",
    "Tues",
    "4:30PM-10:00PM",
    5.5,
    hourlyRate * 5.5,
    96,
    72.42,
    168.42
  ),
  createData(
    "09-10-2020",
    "Wed",
    "2:30 PM-8:00 PM",
    5.5,
    hourlyRate * 5.5,
    36.65,
    23.75,
    60.4
  ),
];

export default rows;
