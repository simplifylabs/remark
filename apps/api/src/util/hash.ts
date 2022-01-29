import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export async function hash(password: string) {
  try {
    const result = await bcrypt.hash(password, SALT_ROUNDS);
    return result;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function comparePasswords(
  hashedPassword: string,
  plainPassword: string
) {
  try {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    return match;
  } catch (e) {
    console.error(e);
    throw e;
  }
}
