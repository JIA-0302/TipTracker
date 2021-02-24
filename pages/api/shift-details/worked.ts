import { getWorkedDaysForMonth } from "server/mysql/actions/shiftData";
import withUser from "utils/user-middleware";

interface SearchDate {
  month: number;
  year: number;
}

const handler = async (req, res) => {
  const userId = req.user?.id;

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

function getSearchDateFromQuery(query): SearchDate {
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

export default withUser(handler);
