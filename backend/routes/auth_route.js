import express from "express"
import { login, logout, signup, verifyEmail, forgotPassword, resetPassword,checkAuth,resendToken,refreshAccessToken } from "../controllers/auth_controller.js"
import { verifyToken } from "../middleware/verifyToken.js"

const router = express.Router()

router.get("/check-auth",verifyToken,checkAuth)

router.post("/signup", signup)

router.post("/login", login)

router.post("/logout", logout)
router.post("/verify-email", verifyEmail)
router.post("/resend", resendToken)

router.post("/forgot-password", forgotPassword)

router.post("/reset-password/:token", resetPassword)
router.post("/refresh-token", refreshAccessToken)

export default router