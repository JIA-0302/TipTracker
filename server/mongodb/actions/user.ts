import { getPasswordHash, matchesPasswordHash } from "server/auth";
import { User } from "server/mongodb/models/user";
import mongoDB from "server/mongodb";

export async function getUserByCredentials(email: string, password: string) {
  await mongoDB();

  const user = await getUserByEmail(email);

  if (user) {
    if (await matchesPasswordHash(password, user.password_hash)) {
      return user;
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
  await mongoDB();
  if (await isExistingEmail(email)) {
    throw Error(`${email} is already registered`);
  }

  try {
    const password_hash = await getPasswordHash(password.trim());

    await User.create({
      name,
      email,
      password_hash,
    });
  } catch (err) {
    throw Error(`Couldn't Register Please try again later`);
  }
}

export async function isExistingEmail(email: string): Promise<boolean> {
  await mongoDB();
  return User.exists({ email });
}

export async function getUserByEmail(email: string) {
  await mongoDB();
  const user = await User.findOne({ email: email }).exec();

  if (user) {
    return user;
  }

  throw Error("No user found in the current session");
}

export async function getUserById(id: string) {
  await mongoDB();
  const user = await User.findById(id).exec();

  if (user) {
    return user;
  }
  throw Error("No user found in the current session");
}

export async function updateUserData(id: string, name: string, email: string) {
  await mongoDB();

  const user = await getUserById(id);

  user.name = name;
  user.email = email;

  await user.save();
}
