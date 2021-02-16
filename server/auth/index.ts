import bcrypt from "bcrypt";

export async function matchesPasswordHash(
  password: string,
  passwordHash: string
): Promise<boolean> {
  return await bcrypt.compare(password, passwordHash);
}

export async function getPasswordHash(password: string): Promise<string> {
  const saltRounds = Number(process.env.BYCRYPT_SALT_ROUNDS);
  const salt = await bcrypt.genSaltSync(saltRounds);
  const passwordHash = await bcrypt.hashSync(password, salt);
  return passwordHash;
}

/**
 * Check if the new registering user's password is valid.
 * Currently it only checks if the length >= 8
 *
 * @param password New password entered by the user
 */
export function isValidPassword(password: string): boolean {
  return password.trim().length >= 8;
}

/**
 * Uses regular expression to check if the email is valid
 *
 * @param email Email provided by the user
 */
export function isValidEmail(email: string): boolean {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
