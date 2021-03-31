import withUser from "utils/user-middleware";
import { getWeeklyFutureTrendsData } from "../../../server/mongodb/actions/FutureTrends";

/**
 * This routes are specific to each shift_id for Hourly wage type
 * GET /shift-details/hourly/:shiftId ~> Return a detail about the given shift
 *
 * @param req
 * @param res
 */

const handler = async (req, res) => {
  const userId = req.user?.id;
  switch (req.method) {
    case "GET":
      try {
        const result = await getWeeklyFutureTrendsData(
          userId,
          req.query.start_date,
          req.query.end_date
        );
        if (!result) {
          throw Error("No specified shift details could be found");
        }
        res.status(200).json({ futureShiftDetail: result });
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
      break;
  }
};

export default withUser(handler);
