import { getPasswordHash, matchesPasswordHash } from "server/auth";
import { query } from "../index";

export async function getUserByCredentials(email: string, password: string) {
  const user = await query("SELECT * FROM users WHERE email = ?", [email]);

  if (user.length == 1) {
    const currentUser = user[0];
    if (await matchesPasswordHash(password, currentUser["password_hash"])) {
      return currentUser;
    }
  }

  return null;
}

/**
 * Make sure to validate the user data before calling this method
 *
 * @param name Valid name for the new user
 * @param email Email address for the user
 * @param password Password for the user
 */
export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  if (await isExistingEmail(email)) {
    throw Error(`${email} is already registered`);
  }

  try {
    const passwordHash = await getPasswordHash(password.trim());

    await query(
      "INSERT INTO users (name, email, password_hash) values (?, ?, ?)",
      [name, email, passwordHash]
    );
  } catch (err) {
    throw Error(`Couldn't Register Please try again later`);
  }
}

export async function isExistingEmail(email: string): Promise<boolean> {
  const count = await query("SELECT 1 FROM users WHERE email = ?", [email]);

  return count.length >= 1;
}
