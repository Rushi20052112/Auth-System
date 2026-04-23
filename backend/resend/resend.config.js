// resend/resend.config.js
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

export const resend = new Resend(process.env.RESEND_API_KEY);

export const sender = {
    email: "onboarding@resend.dev",  // use your verified domain email in production
    name: "Rushi",
};