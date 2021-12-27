import withUser from "utils/user-middleware";
import { getUserById, updateUserData } from "server/mongodb/actions/user";
import { isValidEmail } from "server/auth";

/**
 * This routes are specific to each user_id
 * GET /user-profile/:userId ~> Return a detail about the given user
 * PUT /user-profile/:userId ~> Update the given user
 *
 * @param req
 * @param res
 */
const handler = async (req, res) => {
  const userId = req.user?.id;
  switch (req.method) {
    case "GET":
      try {
        const result = await getUserById(userId);
        if (!result) {
          throw Error("No specified user could be found");
        }
        res.status(200).json({ user: result });
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
      break;

    case "PUT":
      try {
        const name = req.body.name;
        const email = req.body.email;
        validateUpdatedUserData(name, email);
        await updateUserData(userId, name, email);

        res.status(200).json({ success: true });
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
      break;

    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

function validateUpdatedUserData(name: string, email: string): void {
  if (!name || name.trim().length == 0) {
    throw Error("Please enter a valid name");
  }

  if (!email || !isValidEmail(email)) {
    throw Error("Please enter a valid email");
  }
}

export default withUser(handler);
