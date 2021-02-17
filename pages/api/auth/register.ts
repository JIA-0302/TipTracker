import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { isValidEmail, isValidPassword } from "server/auth";
import { registerUser } from "server/mysql/actions/user";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { method, body } = req;
  switch (method) {
    case "POST":
      try {
        const { name, email, password } = body;
        validateRegistrationData(name, email, password);
        await registerUser(name, email, password);

        res.status(200).json({ success: true });
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

function validateRegistrationData(
  name: string,
  email: string,
  password: string
): void {
  if (!name || name.trim().length == 0) {
    throw Error("Please enter a valid name");
  }

  if (!email || !isValidEmail(email)) {
    throw Error("Please enter a valid email");
  }

  if (!password || !isValidPassword(password)) {
    throw Error("Invalid password. Please check the password requirements");
  }
}
export default handler;
