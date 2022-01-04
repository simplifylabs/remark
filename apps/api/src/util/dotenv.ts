import dotenv from "dotenv";
import fs from "fs";
import path from "path";

const envPath = path.join(__dirname, "..", ".env");

export default function loadEnv() {
  if (exists() && validate()) dotenv.config({ path: envPath });
}

function exists(): boolean {
  if (!fs.existsSync(envPath)) {
    console.error(".env doesn't exist! Use .env.template to create it.");
    process.exit(1);
  }
  return true;
}

function validate(): boolean {
  const parsed = dotenv.parse(fs.readFileSync(envPath));
  const template = dotenv.parse(fs.readFileSync(`${envPath}.template`));

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
