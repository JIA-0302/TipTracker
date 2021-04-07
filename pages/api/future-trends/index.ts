import { findProfitableShifts } from "server/predictions";
import withUser from "utils/user-middleware";

/**
 * This route will return most profitable shift times for each passed day.
 *
 * @param req
 * @param res
 */

const handler = async (req, res) => {
  const userId = req.user?.id;
  const { shift_dates } = req.body;

  switch (req.method) {
    case "POST":
      try {
        const result = await findProfitableShifts(userId, shift_dates, 4);
        if (!result) {
          throw "No prediction data found. Please try again later";
        }
        return res.status(200).json({ result });
      } catch (e) {
        return res.status(500).json({ message: e.message || e });
      }
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default withUser(handler);
