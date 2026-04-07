import { useState } from "react";
import FloatingShapes from "../components/FloatingShapes";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react"; // 👈 add this
import { Link, useNavigate } from "react-router";
import { Input } from "../components/Input";
import { signupUser } from "../../services/authService";
import toast from "react-hot-toast"

export default function Signup() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate()

    const [strength, setStrength] = useState(0);
    const [showPassword, setShowPassword] = useState(false); // 👈 new

    const rules = {
        length: form.password.length >= 6,
        upper: /[A-Z]/.test(form.password),
        lower: /[a-z]/.test(form.password),
        number: /[0-9]/.test(form.password),
        special: /[^A-Za-z0-9]/.test(form.password),
    };

    const calculateStrength = (rules) => {
        const count = Object.values(rules).filter(Boolean).length;
        setStrength(count);
    };

    const handleChange = (e) => {
        const updated = { ...form, [e.target.name]: e.target.value };
        setForm(updated);

        if (e.target.name === "password") {
            const newRules = {
                length: updated.password.length >= 6,
                upper: /[A-Z]/.test(updated.password),
                lower: /[a-z]/.test(updated.password),
                number: /[0-9]/.test(updated.password),
                special: /[^A-Za-z0-9]/.test(updated.password),
            };
            calculateStrength(newRules);
        }
    };

    const getStrengthColor = () => {
        if (strength <= 2) return "bg-red-500";
        if (strength <= 4) return "bg-yellow-400";
        return "bg-green-500";
    };

    const getStrengthText = () => {
        if (strength <= 2) return "Weak";
        if (strength <= 4) return "Good";
        return "Very Strong";
    };

    const isPasswordValid = strength >= 5; //  Very Strong

    const handleSignup = async () => {

        try {
            if (!isPasswordValid) {
                toast.error("Password must be Strong or Very Strong");
                return;
            }

            const res = await signupUser(form)

            if (res.data.success) {
                toast.success(res.data.message);

                // 👉 redirect to OTP page
                navigate("/verify-email");
            }
        } catch (error) {
            console.log(error);
            toast.error(
                error.response?.data?.message || "Signup failed"
            );
        }



    };

    return (
        <div className="relative w-full h-screen">
            <FloatingShapes />

            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[380px] p-6 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl">

                    <h2 className="text-white text-2xl font-semibold text-center mb-6">
                        Create Account
                    </h2>

                    <div className="space-y-4">

                        <Input
                            icon={User}
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            onChange={handleChange}
                        // className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />

                        <Input
                            icon={Mail}
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            onChange={handleChange}
                        // className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />

                        {/* 👇 Password with Eye Icon */}
                        <div className="relative">
                            <Input
                                icon={Lock}
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                onChange={handleChange}
                            // className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
                            />

                            <div
                                className="absolute right-3 top-2.5 cursor-pointer text-gray-300"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </div>
                        </div>

                        {/* Strength Bar */}
                        <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                            <div
                                className={`h-full transition-all duration-300 ${getStrengthColor()}`}
                                style={{ width: `${(strength / 5) * 100}%` }}
                            ></div>
                        </div>

                        {/* Strength Label */}
                        <p className="text-xs text-gray-300">
                            Strength:{" "}
                            <span
                                className={
                                    strength <= 2
                                        ? "text-red-400"
                                        : strength <= 4
                                            ? "text-yellow-400"
                                            : "text-green-400"
                                }
                            >
                                {getStrengthText()}
                            </span>
                        </p>

                        {/* Rules */}
                        <div className="text-xs space-y-1">
                            <p className={rules.length ? "text-green-400" : "text-gray-400"}>
                                ✓ At least 6 characters
                            </p>
                            <p className={rules.upper ? "text-green-400" : "text-gray-400"}>
                                ✓ Contains uppercase letter
                            </p>
                            <p className={rules.lower ? "text-green-400" : "text-gray-400"}>
                                ✓ Contains lowercase letter
                            </p>
                            <p className={rules.number ? "text-green-400" : "text-gray-400"}>
                                ✓ Contains number
                            </p>
                            <p className={rules.special ? "text-green-400" : "text-gray-400"}>
                                ✓ Contains special character
                            </p>
                        </div>

                        {/* Button */}
                        <button
                            onClick={handleSignup}
                            className={`w-full mt-4 py-2 rounded-lg text-white font-semibold transition ${isPasswordValid
                                ? "bg-blue-500 hover:bg-blue-600"
                                : "bg-gray-500 cursor-not-allowed"
                                }`}
                        >
                            Sign Up
                        </button>

                        <p className="text-sm text-center text-gray-300">
                            Already have an account?{" "}
                            <Link to={"/login"} className="text-blue-400 cursor-pointer hover:underline">
                                Login
                            </Link>
                        </p>

                    </div>
                </div>
            </div>
        </div>
    );
}