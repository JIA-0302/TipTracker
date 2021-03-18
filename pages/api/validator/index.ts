/**
 * This routes is used to trigger functions to check for consistency and integrity
 * of data between user's shift data and processed data for ML model
 *
 * GET /validator?task=add-missing-data ~> Find all missing data, process it, and store it in MongoDB for ML
 * GET /validator?task=remove-deleted-data ~> Find all deleted data and remove it from MongoDB
 *
 * @param req
 * @param res
 */

import { NextApiRequest } from "next";
import {
  processDeletedShiftData,
  processMissingShiftData,
} from "server/pipeline/validator";

const handler = async (req: NextApiRequest, res) => {
  if (!hasValidAuthToken(req)) {
    return res
      .status(401)
      .json({ message: "Please provide a valid Authorization Bearer Token" });
  }

  const { task } = req.query;

  switch (req.method) {
    case "GET":
      switch (task) {
        case "add-missing-data":
          processMissingShiftData();
          break;

        case "remove-deleted-data":
          processDeletedShiftData();
          break;

        default:
          return res
            .status(400)
            .end(
              `Please provide a valid task: [add-missing-data, remove-deleted-data]`
            );
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

function hasValidAuthToken(req: NextApiRequest) {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    return token === process.env.VALIDATOR_AUTH_TOKEN;
  }
  return false;
}

export default handler;
