import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FloatingShapes from "../components/FloatingShapes";
import { Mail } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { forgotPassword } from "../../services/authService";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email) {
      toast.error("Email is required");
      return;
    }

    try {
      setLoading(true);

      const res=await forgotPassword(email)

      toast.success(res.data.message);

      // 👉 redirect to reset page or OTP page
      navigate("/reset-password");

    } catch (err) {
      toast.error(
        err.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full h-screen">
      
      {/* Background */}
      <FloatingShapes />

      {/* Card */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[380px] p-6 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl">

          <h2 className="text-white text-2xl font-semibold text-center mb-4">
            Forgot Password
          </h2>

          <p className="text-gray-300 text-sm text-center mb-6">
            Enter your email to receive reset instructions
          </p>

          {/* Email Input */}
          <div className="relative mb-4">
            <Mail className="absolute left-3 top-2.5 text-gray-300" size={18} />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white font-semibold transition ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          {/* Back to Login */}
          <p className="text-sm text-center text-gray-300 mt-4">
            Back to{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-400 cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}