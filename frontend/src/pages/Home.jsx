import { useNavigate } from "react-router-dom";
import FloatingShapes from "../components/FloatingShapes";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen">

      {/* Background Animation */}
      <FloatingShapes />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">

        {/* Title */}
        <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">
          Secure Auth System 🔐
        </h1>

        {/* Subtitle */}
        <p className="text-gray-300 max-w-xl mb-8">
          A modern authentication system with email verification, secure login,
          and password recovery — built using MERN stack.
        </p>

        {/* Buttons */}
        <div className="flex gap-4 flex-wrap justify-center">

          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold transition"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="px-6 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition"
          >
            Sign Up
          </button>

        </div>

        {/* Optional Dashboard Button */}
        <div className="mt-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-sm text-gray-400 hover:text-white underline"
          >
            Go to Dashboard →
          </button>
        </div>

      </div>
    </div>
  );
}