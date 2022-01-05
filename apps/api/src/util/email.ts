import fs from "fs";
import nodemailer from "nodemailer";
import env from "@api/util/env";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const resetEmail = fs.readFileSync("./apps/api/email/reset.html", "utf-8");

export async function sendResetEmail(
  email: string,
  username: string,
  link: string
) {
  if (!process.env.EMAIL_USER) return;

  const info = await transporter.sendMail({
    from: `Remark <${env("EMAIL_USER")}>`,
    to: email,
    subject: "Remark - Reset your password.",
    html: resetEmail.replace(/%LINK%/g, link).replace(/%USERNAME%/g, username),
  });

  console.info(`Sent email ${info.messageId}`);
}
