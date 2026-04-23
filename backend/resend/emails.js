// resend/emails.js
import {
    PASSWORD_RESET_REQUEST_TEMPLATE,
    VERIFICATION_EMAIL_TEMPLATE,
    PASSWORD_RESET_SUCCESS_TEMPLATE,
} from "./emailTemplates.js";
import { resend, sender } from "./resend.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
    try {
        const response = await resend.emails.send({
            from: `${sender.name} <${sender.email}>`,
            to: [email],
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
        });
        console.log("Verification email sent successfully", response);
    } catch (error) {
        console.error("Error sending verification email", error);
        throw new Error(`Error sending verification email: ${error}`);
    }
};

export const sendWelcomeEmail = async (email, userName) => {
    try {
        const response = await resend.emails.send({
            from: `${sender.name} <${sender.email}>`,
            to: [email],
            subject: "Welcome to Auth-System!",
            html: `<h2>Hey ${userName}, welcome aboard! 🎉</h2>
                   <p>Your account is verified and ready to go.</p>`,
        });
        console.log("Welcome email sent successfully", response);
    } catch (error) {
        console.error("Error sending welcome email", error);
        throw new Error(`Error sending welcome email: ${error}`);
    }
};

export const sendPasswordResetEmail = async (email, resetUrl) => {
    try {
        const response = await resend.emails.send({
            from: `${sender.name} <${sender.email}>`,
            to: [email],
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replaceAll("{resetURL}", resetUrl),
        });
        console.log("Password reset email sent successfully", response);
    } catch (error) {
        console.error("Error sending password reset email", error);
        throw new Error(`Error sending password reset email: ${error}`);
    }
};

export const sendResetSuccessful = async (email) => {
    try {
        const response = await resend.emails.send({
            from: `${sender.name} <${sender.email}>`,
            to: [email],
            subject: "Password Reset Successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
        });
        console.log("Password reset success email sent", response);
    } catch (error) {
        console.error("Error sending reset success email", error);
        throw new Error(`Error sending reset success email: ${error}`);
    }
};