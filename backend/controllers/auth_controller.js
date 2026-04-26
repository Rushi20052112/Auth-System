import jwt from "jsonwebtoken"
import { User } from "../models/user.js"
import bcryptjs from "bcryptjs"
import crypto from "crypto"
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js"
import { sendPasswordResetEmail, sendVerificationEmail, sendWelcomeEmail, sendResetSuccessful } from "../resend/emails.js"


export const signup = async (req, res) => {
    const { email, password, name } = req.body
    try {
        if (!email || !password || !name) {
            throw new Error("All fields are required")
        }

        const userAlreadyExits = await User.findOne({ email })
        if (userAlreadyExits) {
            return res.status(400).json({ message: "User Already Exits" })
        }

        const hashedPassword = await bcryptjs.hash(password, 10)
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString()
        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 //24 hrs
        })

        await user.save();

        // save refresh token to DB
        const refreshToken = generateTokenAndSetCookie(res, user._id)
        user.refreshToken = refreshToken
        await user.save()

        await sendVerificationEmail(user.email, verificationToken)

        res.status(201).json({
            success: true,
            message: "User created Successfully",
            user: {
                ...user._doc,
                password: undefined,
            }
        })
    } catch (error) {
        console.log("Error in signup", error)
        res.status(500).json({ success: false, message: "Server Error" })
    }
}

export const verifyEmail = async (req, res) => {
    const { code } = req.body
    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() }
        })

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired verification code" })
        }

        user.isverified = true
        user.verificationToken = undefined
        user.verificationTokenExpiresAt = undefined

        await user.save()

        await sendWelcomeEmail(user.email, user.name)

        res.status(201).json({
            success: true,
            message: "Email Verified Successfully",
            user: {
                ...user._doc,
                password: undefined,
            }
        })

    } catch (error) {
        console.log("Error in verifyEmail", error)
        res.status(500).json({ success: false, message: "Server Error" })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid credentials" })
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: "Invalid credentials" })
        }

        // save refresh token to DB
        const refreshToken = generateTokenAndSetCookie(res, user._id)
        user.refreshToken = refreshToken
        user.lastlogin = new Date()
        await user.save()

        res.status(200).json({
            success: true,
            message: "Logged in Successfully",
            user: {
                ...user._doc,
                password: undefined,
            }
        })

    } catch (error) {
        console.log("Error in login", error)
        res.status(400).json({ success: false, message: error.message })
    }
}

export const logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken

    // remove refresh token from DB
    if (refreshToken) {
        await User.findOneAndUpdate(
            { refreshToken },
            { refreshToken: undefined }
        )
    }

    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // 👈
    })
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // 👈
    })

    res.status(200).json({ message: "Logout Successfully" })
}

export const forgotPassword = async (req, res) => {
    const { email } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }

        const resetToken = crypto.randomBytes(20).toString("hex")
        const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000

        user.resetPasswordToken = resetToken
        user.resetPasswordExpiresAt = resetTokenExpiresAt

        await user.save()

        await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`)

        res.status(200).json({ message: "Password reset link sent to your email" })
    } catch (error) {
        console.error("Error sending welcome mail", error)
        throw new Error(`Error sending welcome email:${error}`)
    }
}

export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params
        const { password } = req.body

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() }
        })

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired reset token" })
        }

        const hashedPassword = await bcryptjs.hash(password, 10)

        user.password = hashedPassword
        user.resetPasswordToken = undefined
        user.resetPasswordExpiresAt = undefined

        await user.save()

        await sendResetSuccessful(user.email)

        res.status(200).json({
            success: true,
            message: "Password resetted",
        })

    } catch (error) {
        console.error("Error in reset email", error)
        throw new Error(`Error in reset email:${error}`)
    }
}

export const checkAuth = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password")
        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }
        res.status(200).json({ success: true, user })
    } catch (error) {
        console.error("Error checking Auth", error)
        throw new Error(`Error checking Auth:${error}`)
    }
}

export const resendToken = async (req, res) => {
    try {
        const user = await User.findById(req.userId)

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            })
        }

        if (user.isverified) {
            return res.status(400).json({
                success: false,
                message: "Email already verified",
            })
        }

        const newToken = Math.floor(100000 + Math.random() * 900000).toString()

        user.verificationToken = newToken
        user.verificationTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000

        await user.save()

        await sendVerificationEmail(user.email, newToken)

        res.status(200).json({
            success: true,
            message: "New verification code sent",
        })

    } catch (error) {
        console.log("Error in resendVerificationEmail:", error)
        res.status(500).json({
            success: false,
            message: "Server error",
        })
    }
}

export const refreshAccessToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) {
        return res.status(401).json({ success: false, message: "No refresh token" })
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
        const user = await User.findById(decoded.userId)

        if (!user || user.refreshToken !== refreshToken) {
            return res.status(401).json({ success: false, message: "Invalid refresh token" })
        }

        const newAccessToken = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        )

        res.cookie("token", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // 👈
            maxAge: 15 * 60 * 1000
        })

        res.status(200).json({ success: true, message: "Access token refreshed" })

    } catch (error) {
        res.status(401).json({ success: false, message: "Invalid or expired refresh token" })
    }
}