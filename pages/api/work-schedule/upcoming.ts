import { getUpcomingWorkSchedule } from "server/mysql/actions/workSchedule";
import withUser from "utils/user-middleware";
import { validateShiftDate } from "utils/validations/shiftDetails";

const handler = async (req, res) => {
  const userId = req.user?.id;

  switch (req.method) {
    case "GET":
      try {
        const shiftDate = req.query.shift_date as string;
        validateShiftDate(shiftDate);

        const result = await getUpcomingWorkSchedule(userId, shiftDate);

        if (result) {
          return res.status(200).json({ data: result });
        }

        throw Error("No specified work schedule could be found");
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
      break;

    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default withUser(handler);
