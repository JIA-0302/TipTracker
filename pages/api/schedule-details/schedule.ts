import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        res.status(200).json({
          workDay: "02/26/2021",
          startTime: "11:30",
          endTime: "21:00",
        });
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
      break;
    case "PUT":
      try {
        res.status(200).json({
          success: true,
          details: "put",
        });
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
      break;
    case "DELETE":
      try {
        res.status(200).json({
          success: true,
          details: "deleted",
        });
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
