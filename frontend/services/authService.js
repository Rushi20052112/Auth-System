// frontend/src/services/authService.js

import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL + "/api/auth",  // your backend URL
    withCredentials: true,                 // ✅ sends cookies on every request
});

export const signupUser = (data) => {
    return API.post("/signup", data, {
        withCredentials: true,
    });
};

export const verifyEmail = (code) => {
    return API.post("/verify-email", { code });
};

export const resendToken = (email) => {
    return API.post("/resend", { email })
}

export const loginUser = (data) => {
    return API.post("/login", data, {
        withCredentials: true,
    });
};


export const checkAuth = () => {
    return API.get("/check-auth", {
        withCredentials: true
    });
};


export const logout = () => {
    return API.post("/logout", {
        withCredentials: true
    });
};

export const forgotPassword = (email) => {
    return API.post("/forgot-password", { email }, {
        withCredentials: true
    });
};

export const resetPassword = (token, password) => {
  return API.post(`/reset-password/${token}`, { password }, {
    withCredentials: true
  });
};