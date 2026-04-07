import { PASSWORD_RESET_REQUEST_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE,PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emailTemplates.js"
import { mailtrapClient, sender } from "./mailtrap.config.js"

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{ email }]

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Password reset",
        })
        console.log("Email Sent Successfully", response)
    } catch (error) {
        console.error("Error sending verification", error)
        throw new Error(`Error sending verification email:${error}`)
    }
}

export const sendWelcomeEmail = async (email, userName) => {
    const recipient = [{ email }]

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: "6026c5f8-0169-4b38-b55b-73ff8c72d704",
            template_variables: {
                "company_info_name": "Auth Cmpany",
                "name": userName
            }
        })
        console.log("Welcome Email sent successfully", response)
    } catch (error) {
        console.error("Error sending welcome mail", error)
        throw new Error(`Error sending welcome email:${error}`)
    }
}

export const sendPasswordResetEmail = async (email, resetUrl) => {
    const recipient = [{ email }]

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replaceAll("{resetURL}", resetUrl),
            category: "Password Reset"
        })
         console.log("Reset Email sent successfully", response)
    } catch (error) {
        console.error("Error sending mail", error)
        throw new Error(`Error sending email:${error}`)
    }
}

export const sendResetSuccessful = async (email) => {
    const recipient = [{ email }]

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Password Reset Successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset"
        })
         console.log("Reset done successfully", response)
    } catch (error) {
        console.error("Error sending mail", error)
        throw new Error(`Error sending email:${error}`)
    }
}