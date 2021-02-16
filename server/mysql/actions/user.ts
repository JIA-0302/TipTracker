import { isValidPassword } from "server/auth";
import { query } from "../index";

export async function getUserByCredentials(credentials) {
  const { email, password } = credentials;

  const user = await query("SELECT * FROM users WHERE email = ?", [email]);

  if (user.length == 1) {
    const currentUser = user[0];
    if (await isValidPassword(password, currentUser["password_hash"])) {
      return user;
    }
  }

  return null;
}
