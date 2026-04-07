import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FloatingShapes from "../components/FloatingShapes";
import axios from "axios";
import toast from "react-hot-toast";
import { checkAuth, logout } from "../../services/authService";

export default function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // 🔐 Check Auth (using your controller)
    useEffect(() => {
        const checkUser = async () => {
            try {

                const res = await checkAuth()
                if (res.data.success) {
                    setUser(res.data.user);
                }
            } catch (err) {
                console.log(err)
                toast.error("Please login first");
                navigate("/login");
            } finally {
                setLoading(false);
            }
        };

        checkUser();
    }, []);

    // 🚪 Logout
    const handleLogout = async () => {
        try {
            await logout()

            toast.success("Logged out successfully");
            navigate("/login");
        } catch (err) {
            toast.error("Logout failed");
        }
    };

    return (
        <div className="relative w-full h-screen">

            {/* Background */}
            <FloatingShapes />

            {/* Content */}
            <div className="absolute inset-0 z-10 p-6">

                {/* Navbar */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-white text-xl font-semibold">
                        Dashboard
                    </h1>

                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm"
                    >
                        Logout
                    </button>
                </div>

                {/* Card */}
                <div className="max-w-md mx-auto p-6 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl text-center">

                    <h2 className="text-white text-2xl font-semibold mb-4">
                        Welcome 👋
                    </h2>

                    {loading ? (
                        <p className="text-gray-300">Checking authentication...</p>
                    ) : user ? (
                        <>
                            <p className="text-gray-300 mb-2">
                                <span className="text-white font-medium">Name:</span>{" "}
                                {user.name}
                            </p>

                            <p className="text-gray-300">
                                <span className="text-white font-medium">Email:</span>{" "}
                                {user.email}
                            </p>
                        </>
                    ) : (
                        <p className="text-red-400">User not found</p>
                    )}

                </div>
            </div>
        </div>
    );
}