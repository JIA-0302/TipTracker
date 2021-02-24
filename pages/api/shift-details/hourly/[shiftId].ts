import {
  deleteShiftForUser,
  getShiftDetail,
  updateHourlyShiftData,
} from "server/mysql/actions/shiftData";
import { IHourlyShiftDetails } from "server/mysql/models/shiftData";
import withUser from "utils/user-middleware";
import { parseHourlyShiftDetails } from "utils/validations/shiftDetails";

/**
 * This routes are specific to each shift_id for Hourly wage type
 * GET /shift-details/hourly/:shiftId ~> Return a detail about the given shift
 * DELETE /shift-details/hourly/:shiftId ~> Delete the given shift
 * PUT /shift-details/hourly/:shiftId ~> Update the given shift
 *
 * @param req
 * @param res
 */
const handler = async (req, res) => {
  const userId = req.user?.id; // TODO - repalce with middleware to extract id from session

  const { shiftId } = req.query;
  if (!shiftId) {
    return res
      .status(400)
      .json({ message: "Please provided a valid shift id" });
  }

  switch (req.method) {
    case "GET":
      try {
        const result = await getShiftDetail(
          userId,
          shiftId as string,
          "HOURLY"
        );

        if (!result || !Array.isArray(result) || result.length == 0) {
          throw Error("No specified shift details could be found");
        }

        res.status(200).json({ shiftDetail: result[0] });
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
      break;
    case "PUT":
      try {
        const shiftData: IHourlyShiftDetails = parseHourlyShiftDetails(
          req.body
        );
        await updateHourlyShiftData(userId, shiftId as string, shiftData);
        res.status(200).json({ success: true });
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
      break;
    case "DELETE":
      try {
        await deleteShiftForUser(userId, shiftId as string, "HOURLY");

        res.status(200).json({ success: true });
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default withUser(handler);
