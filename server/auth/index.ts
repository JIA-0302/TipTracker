import bcrypt from "bcrypt";

export async function isValidPassword(
  password,
  passwordHash
): Promise<boolean> {
  return await bcrypt.compare(password, passwordHash);
}

export async function getPasswordHash(password): Promise<string> {
  const salt = await bcrypt.genSaltSync(process.env.BYCRYPT_SALT_ROUNDS);
  const passwordHash = await bcrypt.hashSync(password, salt);
  return passwordHash;
}
