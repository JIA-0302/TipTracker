import { getSession } from "next-auth/client";
import { getUserByEmail } from "server/mysql/actions/user";

/**
 * Attaches user to the request based on the session.
 * If no user is found, it will send response back to inform the user must be logged in.
 * Use this middleware to protect API routes where authentication is required.
 *
 * @param handler
 */
const withUser = (handler) => {
  return async (req, res) => {
    const session = await getSession({ req });
    if (!session) {
      return res
        .status(401)
        .json({ message: "You must be logged in to perform this action" });
    }

    try {
      const user = await getUserByEmail(session?.user?.email);
      req.user = user;
      return handler(req, res);
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  };
};

export default withUser;
