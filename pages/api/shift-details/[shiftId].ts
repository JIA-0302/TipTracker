import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import {
  deleteShiftForUser,
  getShiftDetail,
} from "server/mysql/actions/shiftData";

/**
 * This routes are specific to each shift_id
 * GET /shift-details/[shiftId] ~> Return a detail about the given shift
 * DELETE /shift-details/[shiftId] ~> Delete the given shift
 * PUT /shift-details/[shiftId] ~> Update the given shift
 *
 * It needs wageType as query to retrieve, update, or delete shift details
 * @param req
 * @param res
 */
const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const userId = 2; // TODO - repalce with middleware to extract id from session

  const { wageType, shiftId } = req.query;
  if (!shiftId) {
    return res
      .status(400)
      .json({ message: "Please provided a valid shift id" });
  }

  if (!wageType || (wageType !== "HOURLY" && wageType !== "NON_HOURLY")) {
    return res.status(400).json({
      message: "Please provided a valid wage type [HOURLY, NON_HOURLY]",
    });
  }

  switch (req.method) {
    case "GET":
      try {
        const result = await getShiftDetail(
          userId,
          shiftId as string,
          wageType
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
      res.status(500).json({ message: "Not Implemented" });
      break;
    case "DELETE":
      try {
        await deleteShiftForUser(userId, shiftId as string, wageType);

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

export default handler;
