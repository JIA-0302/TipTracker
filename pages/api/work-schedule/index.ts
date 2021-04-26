import {
  addWorkSchedule,
  deleteWorkSchedule,
  getWorkScheduleByDate,
  updateWorkSchedule,
} from "server/mysql/actions/workSchedule";
import withUser from "utils/user-middleware";
import {
  validateShiftDate,
  validateTime,
} from "utils/validations/shiftDetails";

const handler = async (req, res) => {
  const userId = req.user?.id;

  switch (req.method) {
    case "GET":
      try {
        const shiftDate = req.query.shift_date as string;
        validateShiftDate(shiftDate);

        const result = await getWorkScheduleByDate(userId, shiftDate);

        if (!result || !Array.isArray(result)) {
          throw Error("No specified work schedule could be found");
        }

        if (result.length == 0) {
          res.status(200).json({ data: {} });
        } else {
          res.status(200).json({ data: result[0] });
        }
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
      break;
    case "POST":
      try {
        const { shift_date, start_time, end_time } = validateWorkScheduleData(
          req.body
        );

        const workScheduleId = await addWorkSchedule(
          userId,
          shift_date,
          start_time,
          end_time
        );

        res.status(200).json({
          success: true,
          workScheduleDetail: { schedule_id: workScheduleId },
        });
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
      break;
    case "PUT":
      try {
        const { shift_date, start_time, end_time } = validateWorkScheduleData(
          req.body
        );

        await updateWorkSchedule(userId, shift_date, start_time, end_time);
        res.status(200).json({ success: true });
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
      break;
    case "DELETE":
      try {
        const shiftDate = req.query.shift_date as string;
        validateShiftDate(shiftDate);

        await deleteWorkSchedule(userId, shiftDate);
        res.status(200).json({ success: true });
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

function validateWorkScheduleData(body) {
  const { shift_date, start_time, end_time } = body;
  validateShiftDate(shift_date);
  validateTime(start_time);
  validateTime(end_time);

  return { shift_date, start_time, end_time };
}

export default withUser(handler);
