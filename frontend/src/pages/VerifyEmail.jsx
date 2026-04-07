import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FloatingShapes from "../components/FloatingShapes";
import { resendToken, verifyEmail } from "../../services/authService";
import toast from "react-hot-toast";
import { Trophy } from "lucide-react";
// import {User} from "../../../backend/models/user.js"

export default function VerifyEmail() {
    const navigate = useNavigate();

    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [error, setError] = useState("");

    // Handle OTP input
    const handleChange = (value, index) => {
        if (!/^[0-9]?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            document.getElementById(`otp-${index + 1}`).focus();
        }
    };

    // Handle paste
    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").trim();

        // Only allow digits
        if (!/^\d+$/.test(pastedData)) return;

        const newOtp = [...otp];
        for (let i = 0; i < 6; i++) {
            newOtp[i] = pastedData[i] || "";
        }
        setOtp(newOtp);

        // Focus last filled box
        const lastIndex = Math.min(pastedData.length - 1, 5);
        document.getElementById(`otp-${lastIndex}`).focus();
    };
    // Handle backspace
    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            document.getElementById(`otp-${index - 1}`).focus();
        }
    };

    // Verify OTP
    const handleVerify = async () => {

        const finalOtp = otp.join("").trim();

        if (finalOtp.length < 6) {
            setError("Enter complete OTP");
            return;
        }

        try {
            const res = await verifyEmail(finalOtp)

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/login");

            }
        } catch (err) {
            console.log(err);
            toast.error(err.response?.data?.message || err.message || "Verification failed");
        }
    };

    // Resend OTP
    const handleResend = async () => {
        try {

        } catch (error) {
            console.log(error)
        }

        // 👉 Call your resend API
    };

    return (
        <div className="relative w-full h-screen">

            {/* Background */}
            <FloatingShapes />

            {/* Card */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[380px] p-6 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl text-center">

                    <h2 className="text-white text-2xl font-semibold mb-2">
                        Verify Email
                    </h2>

                    <p className="text-gray-300 text-sm mb-6">
                        Enter the 6-digit OTP sent to your email
                    </p>

                    {/* OTP Inputs */}
                    <div className="flex justify-between gap-2 mb-4">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                id={`otp-${index}`}
                                type="text"
                                maxLength="1"
                                value={digit}
                                onChange={(e) => handleChange(e.target.value, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                onPaste={index === 0 ? handlePaste : "undefined"}
                                className="w-12 h-12 text-center text-white text-lg rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        ))}
                    </div>

                    {/* Error */}
                    {error && (
                        <p className="text-red-400 text-sm mb-2">{error}</p>
                    )}

                    {/* Verify Button */}
                    <button
                        onClick={handleVerify}

                        className="w-full py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold transition"
                    >
                        Verify
                    </button>

                    {/* Resend */}
                    <p className="text-sm text-gray-300 mt-4">
                        Didn’t receive code?{" "}
                        <span
                            onClick={handleResend}
                            className="text-blue-400 cursor-pointer hover:underline"
                        >
                            Resend
                        </span>
                    </p>

                </div>
            </div>
        </div>
    );
}