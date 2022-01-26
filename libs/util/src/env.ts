import dotenv from "dotenv";

const globalEnv = ".env";
let app = "{...}";

export function env(key: string) {
  if (!process.env[key]) {
    console.error(
      `Missing environment variable "${key}"!
      \tUse ${globalEnv}.template and apps/${app}/.env.template to create valid .env files.`
    );
    process.exit(1);
  }

  return process.env[key];
}

export function load(name: string) {
  app = name;
  dotenv.config({ path: globalEnv });
  dotenv.config({ path: `apps/${app}/.env` });
}

export default env;
