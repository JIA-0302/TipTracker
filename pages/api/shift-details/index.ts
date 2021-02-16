import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getShiftDetailsByUserId } from "server/mysql/actions/shiftData";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "GET") {
    try {
      const userId = 2; // TODO - add middleware to extract user id after authentication is implemented
      const results = await getShiftDetailsByUserId(userId);

      res.status(200).json(results);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
};

export default handler;
