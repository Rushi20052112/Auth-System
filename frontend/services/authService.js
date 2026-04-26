import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL + "/api/auth",
    withCredentials: true,
});

// ─── Refresh Token Interceptor ───────────────────────────────────────────────
API.interceptors.response.use(
    (response) => response, // success → pass through

    async (error) => {
        const original = error.config

        // if token expired and not already retried
        if (error.response?.data?.expired && !original._retry) {
            original._retry = true

            try {
                // silently refresh the access token
                await axios.post(
                    import.meta.env.VITE_BASE_URL + "/api/auth/refresh-token",
                    {},
                    { withCredentials: true }
                )

                // retry the original failed request
                return API(original)

            } catch (refreshError) {
                // refresh token also expired → force logout
                window.location.href = "/login"
                return Promise.reject(refreshError)
            }
        }

        return Promise.reject(error)
    }
)


export const signupUser = (data) => {
    return API.post("/signup", data)
}

export const verifyEmail = (code) => {
    return API.post("/verify-email", { code })
}

export const resendToken = (email) => {
    return API.post("/resend", { email })
}

export const loginUser = (data) => {
    return API.post("/login", data)
}

export const checkAuth = () => {
    return API.get("/check-auth")
}

export const logout = () => {
    return API.post("/logout")
}

export const forgotPassword = (email) => {
    return API.post("/forgot-password", { email })
}

export const resetPassword = (token, password) => {
    return API.post(`/reset-password/${token}`, { password })
}