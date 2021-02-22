import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import {
  getAllShiftDetailsByUserId,
  addHourlyShiftData,
  addNonHourlyShiftData,
} from "server/mysql/actions/shiftData";

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
        const { shiftData, wageType } = req.body;

        switch (wageType) {
          case "HOURLY":
            await addHourlyShiftData(userId, shiftData);
            break;
          case "NON_HOURLY":
            await addNonHourlyShiftData(userId, shiftData);
            break;
          default:
            return res
              .status(400)
              .json({
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
