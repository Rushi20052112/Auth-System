import jwt from "jsonwebtoken"

export const generateTokenAndSetCookie = (res, userId) => {

    const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "15m"
    })

    const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: "7d"
    })

    res.cookie("token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // 👈
        maxAge: 15 * 60 * 1000
    })

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // 👈
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    return refreshToken  // 👈 needed to save in DB
}