// resend/resend.config.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const transporter = nodemailer.createTransport({
  host: process.env.BREVO_SMTP_HOST,
  port: 587,
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASS,
  },
});

export const sender = {
  email: "rushikeshrepale746@gmail.com",
  name: "Rushi",
};