import dotenv from "dotenv";

const globalEnv = ".env";
const localEnv = "apps/api/.env";

export function env(key: string) {
  if (!process.env[key]) {
    console.error(
      `Missing environment variable "${key}"!
      \tUse ${globalEnv}.template and ${localEnv}.template to create valid .env files.`
    );
    process.exit(1);
  }

  return process.env[key];
}

export function loadEnv() {
  dotenv.config({ path: globalEnv });
  dotenv.config({ path: localEnv });
}

export default env;
