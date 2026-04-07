import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FloatingShapes from "../components/FloatingShapes";

import { Mail, Lock, Eye, EyeOff, Loader } from "lucide-react";
import { Input } from "../components/Input";
import { loginUser } from "../../services/authService";
import toast from "react-hot-toast";

export default function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const isLoading = false
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {

    try {

      const res = await loginUser(form)

      if (res.data.success) {
        toast.success(res.data.message);

        // 👉 redirect to OTP page
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "login failed"
      );
    }


  };

  return (
    <div className="relative w-full h-screen">

      {/* Background Animation */}
      <FloatingShapes />

      {/* Login Card */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[380px] p-6 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl">

          <h2 className="text-white text-2xl font-semibold text-center mb-6">
            Welcome Back
          </h2>

          <div className="space-y-4">

            {/* Email */}

            <Input
              icon={Mail}
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
            // className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {/* </div> */}

            {/* Password */}

            <div className="relative">
              <Input
                icon={Lock}
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                onChange={handleChange}
              // className="w-full pl-10 pr-10 py-2 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <div
                className="absolute right-3 top-2.5 cursor-pointer text-gray-300 hover:text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>


            {/* Error */}
            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            {/* Links */}
            <div className="flex justify-between text-sm text-gray-300">
              <span
                className="cursor-pointer hover:text-white"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Password?
              </span>

              <span
                className="cursor-pointer text-blue-400 hover:underline"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </span>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full mt-0 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold transition"
            >
              {isLoading ? <Loader className="w-6 h-6 mx-auto animate-spin" /> : "Login"}


            </button>
          </div>
        </div>
      </div>
    </div>
  );
}