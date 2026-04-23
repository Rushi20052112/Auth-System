import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FloatingShapes from "../components/FloatingShapes";
import toast from "react-hot-toast";
import { resetPassword } from "../../services/authService";
import { Eye, EyeOff, Lock } from "lucide-react";

export default function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!password || !confirmPassword) {
            toast.error("All fields are required");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            setLoading(true);

            const res = await resetPassword(token, password);

            toast.success(res.data.message);
            setTimeout(() => {
                navigate("/login");
            }, 1000);
        } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* Background */}
            <FloatingShapes />

            {/* Card */}
            <div className="absolute inset-0 flex items-center justify-center px-4">
                <div className="w-full max-w-md p-8 rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl">

                    {/* Icon */}
                    <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-6">
                        <Lock className="text-gray-200" size={22} />
                    </div>

                    {/* Heading */}
                    <h2 className="text-white text-4xl font-bold mb-3 tracking-tight">
                        Reset Password
                    </h2>

                    <p className="text-gray-300 text-sm mb-8 leading-relaxed">
                        Choose a strong new password for your account.
                    </p>

                    {/* Password */}
                    <div className="mb-5">
                        <label className="block text-sm text-gray-300 mb-2 uppercase tracking-wide">
                            New Password
                        </label>

                        <div className="relative">
                            <input
                                type={showPass ? "text" : "password"}
                                placeholder="Enter new password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPass(!showPass)}
                                className="absolute right-4 top-3.5 text-gray-400"
                            >
                                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="mb-6">
                        <label className="block text-sm text-gray-300 mb-2 uppercase tracking-wide">
                            Confirm Password
                        </label>

                        <div className="relative">
                            <input
                                type={showConfirm ? "text" : "password"}
                                placeholder="Confirm new password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />

                            <button
                                type="button"
                                onClick={() => setShowConfirm(!showConfirm)}
                                className="absolute right-4 top-3.5 text-gray-400"
                            >
                                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Button */}
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className={`w-full py-3 rounded-xl text-white font-semibold transition ${loading
                                ? "bg-gray-500 cursor-not-allowed"
                                : "bg-blue-500 hover:bg-blue-600"
                            }`}
                    >
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>

                    {/* Back */}
                    <p className="text-sm text-center text-gray-300 mt-5">
                        ←{" "}
                        <span
                            onClick={() => navigate("/login")}
                            className="cursor-pointer hover:text-blue-400"
                        >
                            Back to login
                        </span>
                    </p>

                </div>
            </div>
        </div>
    );
}