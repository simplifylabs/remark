import dotenv from "dotenv";
import fs from "fs";

export default function loadEnv() {
  if (exists() && validate()) {
    dotenv.config({ path: "./apps/api/.env" });
    if (process.env.JEST_WORKER_ID) process.env.NODE_ENV = "test";
  }
}

function exists(): boolean {
  if (!fs.existsSync("./apps/api/.env")) {
    console.error(".env doesn't exist! Use .env.template to create it.");
    process.exit(1);
  }
  return true;
}

function validate(): boolean {
  const parsed = dotenv.parse(fs.readFileSync("./apps/api/.env"));
  const template = dotenv.parse(fs.readFileSync("./apps/api/.env.template"));

  const missing: string[] = [];
  Object.keys(template).forEach((key) => {
    if (!Object.keys(parsed).includes(key)) missing.push(key);
  });

  if (missing.length === 0) return true;
  console.error(`.env is missing the following keys: ${missing.join(", ")}`);
  console.error("Use .env.template for creating a valid .env file.");
  process.exit(1);
}

module.exports = loadEnv;
