import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import {
  getAllShiftDetailsByUserId,
  addHourlyShiftData,
  addNonHourlyShiftData,
} from "server/mysql/actions/shiftData";
import {
  IHourlyShiftDetails,
  INonHourlyShiftDetails,
} from "server/mysql/models/shiftData";

import {
  parseHourlyShiftDetails,
  parseNonHourlyShiftDetails,
} from "utils/validations/shiftDetails";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const userId = 2; // TODO - repalce with middleware to extract id from session

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

        switch (wageType) {
          case "HOURLY":
            shiftData = parseHourlyShiftDetails(req.body);
            await addHourlyShiftData(userId, shiftData as IHourlyShiftDetails);
            break;
          case "NON_HOURLY":
            shiftData = parseNonHourlyShiftDetails(req.body);
            await addNonHourlyShiftData(
              userId,
              shiftData as INonHourlyShiftDetails
            );
            break;
          default:
            return res.status(400).json({
              message: "Invalid wage type. Allow: [HOURLY, NON_HOURLY]",
            });
        }

        res.status(200).json({ success: true });
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
