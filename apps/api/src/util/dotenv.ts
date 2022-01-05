import dotenv from "dotenv";
import fs from "fs";

const globalEnv = ".env";
const localEnv = "apps/api/.env";

export default function loadEnv() {
  exists(globalEnv);
  exists(localEnv);

  validate(globalEnv);
  validate(localEnv);

  dotenv.config({ path: globalEnv });
  dotenv.config({ path: localEnv });
}

function exists(path: string) {
  if (!fs.existsSync(path)) {
    console.error(`${path} doesn't exist! Use ${path}.template to create it.`);
    process.exit(1);
  }
}

function validate(path: string) {
  const parsed = dotenv.parse(fs.readFileSync(path));
  const template = dotenv.parse(fs.readFileSync(`${path}.template`));

  const missing: string[] = [];
  Object.keys(template).forEach((key) => {
    if (!Object.keys(parsed).includes(key)) missing.push(key);
  });

  if (missing.length === 0) return;
  console.error(`${path} is missing the following keys: ${missing.join(", ")}`);
  console.error(`Use ${path}.template for creating a valid .env file.`);
  process.exit();
}

module.exports = loadEnv;
