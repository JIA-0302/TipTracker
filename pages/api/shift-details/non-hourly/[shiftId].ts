import {
  deleteShiftForUser,
  getShiftDetail,
  updateNonHourlyShiftData,
} from "server/mongodb/actions/shiftData";
import { INonHourlyShiftDetails } from "server/mongodb/models/nonHourlyShiftDetails";
import withUser from "utils/user-middleware";
import { parseNonHourlyShiftDetails } from "utils/validations/shiftDetails";

/**
 * This routes are specific to each shift_id for Non-hourly wage type
 * GET /shift-details/non-hourly/:shiftId ~> Return a detail about the given shift
 * DELETE /shift-details/non-hourly/:shiftId ~> Delete the given shift
 * PUT /shift-details/non-hourly/:shiftId ~> Update the given shift
 *
 * @param req
 * @param res
 */
const handler = async (req, res) => {
  const userId = req.user?.id;

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
          "NON_HOURLY"
        );

        if (result) {
          return res.status(200).json({ shiftDetail: result });
        }

        throw Error("No specified shift details could be found");
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
      break;
    case "PUT":
      try {
        const shiftData: INonHourlyShiftDetails = parseNonHourlyShiftDetails(
          req.body
        );
        await updateNonHourlyShiftData(userId, shiftId as string, shiftData);
        res.status(200).json({ success: true });
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
      break;
    case "DELETE":
      try {
        await deleteShiftForUser(userId, shiftId as string, "NON_HOURLY");

        res.status(200).json({ success: true });
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default withUser(handler);
