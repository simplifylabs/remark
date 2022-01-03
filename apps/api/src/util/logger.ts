import chalk from "chalk";

export default function getConsole() {
  const old = { ...console };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  console.log = (...args: any[]) => log(old, ...args);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  console.info = (...args: any[]) => info(old, ...args);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  console.warn = (...args: any[]) => warn(old, ...args);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  console.error = (...args: any[]) => error(old, ...args);

  return console;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function log(con: Console, ...args: any[]) {
  con.log(chalk.cyan("[LOG]"), ...args);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function info(con: Console, ...args: any[]) {
  con.info(chalk.blue("[INFO]"), ...args);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function error(con: Console, ...args: any[]) {
  con.error(chalk.red("[ERROR]"), ...args);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function warn(con: Console, ...args: any[]) {
  con.warn(chalk.yellow("[WARN]"), ...args);
}

module.exports = getConsole;
