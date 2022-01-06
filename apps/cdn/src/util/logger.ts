import chalk from "chalk";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function getConsole() {
  const old = { ...console };

  console.log = (...args: any[]) => log(old, ...args);
  console.info = (...args: any[]) => info(old, ...args);
  console.warn = (...args: any[]) => warn(old, ...args);
  console.error = (...args: any[]) => error(old, ...args);

  return console;
}

export function log(con: any, ...args: any[]) {
  con.log(chalk.cyan("[LOG]"), ...args);
}

export function info(con: any, ...args: any[]) {
  con.info(chalk.blue("[INFO]"), ...args);
}

export function error(con: any, ...args: any[]) {
  con.error(chalk.red("[ERROR]"), ...args);
}

export function warn(con: any, ...args: any[]) {
  con.warn(chalk.yellow("[WARN]"), ...args);
}
/* eslint-enable @typescript-eslint/no-explicit-any */

module.exports = getConsole;
