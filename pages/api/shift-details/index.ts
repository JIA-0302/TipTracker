import {
  getAllShiftDetailsByUserId,
  addHourlyShiftData,
  addNonHourlyShiftData,
} from "server/mongodb/actions/shiftData";
import { IHourlyShiftDetails } from "server/mongodb/models/hourlyShiftDetails";
import { INonHourlyShiftDetails } from "server/mongodb/models/nonHourlyShiftDetails";
import {
  parseHourlyShiftDetails,
  parseNonHourlyShiftDetails,
} from "utils/validations/shiftDetails";
import withUser from "utils/user-middleware";

const handler = async (req, res) => {
  const userId = req.user?.id;

  switch (req.method) {
    case "GET":
      try {
        const results = await getAllShiftDetailsByUserId(userId);

        res.status(200).json(results);
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
      break;
    case "POST":
      try {
        const { wageType } = req.body;

        let shiftData: IHourlyShiftDetails | INonHourlyShiftDetails = null;
        let newShiftId = 0;
        switch (wageType) {
          case "HOURLY":
            shiftData = parseHourlyShiftDetails(req.body);
            newShiftId = await addHourlyShiftData(
              userId,
              shiftData as IHourlyShiftDetails
            );
            break;
          case "NON_HOURLY":
            shiftData = parseNonHourlyShiftDetails(req.body);
            newShiftId = await addNonHourlyShiftData(
              userId,
              shiftData as INonHourlyShiftDetails
            );
            break;
          default:
            return res.status(400).json({
              message: "Invalid wage type. Allow: [HOURLY, NON_HOURLY]",
            });
        }

        res.status(200).json({
          success: true,
          shiftDetail: { _id: newShiftId, wageType },
        });
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default withUser(handler);
