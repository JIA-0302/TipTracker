import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getWorkedDaysForMonth } from "server/mysql/actions/shiftData";

interface SearchDate {
  month: number;
  year: number;
}

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const userId = 2; // TODO - repalce with middleware to extract id from session

  switch (req.method) {
    case "GET":
      try {
        const { month, year } = getSearchDateFromQuery(req.query);

        const results = await getWorkedDaysForMonth(userId, month, year);

        res.status(200).json(results);
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

function getSearchDateFromQuery(query: NextApiRequest["query"]): SearchDate {
  const { month, year } = query;

  if (!month) {
    throw Error(
      "Please specify a valid search month. Usage: [/shift-details/worked?month=3]"
    );
  } else if (!year || Number.isNaN(year)) {
    throw Error(
      "Please specify a valid search year. Usage: [/shift-details/worked?year=2020]"
    );
  }

  const parsedMonth = Number(month);
  if (parsedMonth < 1 || parsedMonth > 13 || Number.isNaN(parsedMonth)) {
    throw Error("Plese specify a valid month");
  }
  const parsedYear = Number(year);
  if (parsedYear < 1 || Number.isNaN(parsedYear)) {
    throw Error("Plese specify a valid year");
  }

  return {
    month: parsedMonth,
    year: parsedYear,
  };
}

export default handler;
