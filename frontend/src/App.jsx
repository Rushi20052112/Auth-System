import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
// import FloatingShapes from './components/FloatingShapes'
import Home from './pages/Home'
import VerifyEmail from './pages/VerifyEmail'
import ForgotPassword from './pages/ForgotPassword'
import { Toaster } from "react-hot-toast"
import Dashboard from './pages/Dashboard'
import { checkAuth } from '../services/authService'

// import ProtectedRoute from './components/ProtectedRoutes'

  const ProtectedRoute = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const verify = async () => {
        try {
          const res = await checkAuth();

          if (res.data.success) {
            setUser(res.data.user);
          }
        } catch (err) {
          setUser(null);
        } finally {
          setLoading(false);
        }
      };

      verify();
    }, []);

    // ⛔ wait for API
    if (loading) return null;

    // ❌ not logged in
    if (!user) {
      return <Navigate to="/login" replace />;
    }

    // ❌ not verified
    if (!user.isverified) {
      return <Navigate to="/verify-email" replace />;
    }

    // ✅ allow access
    return children;

  }
  
const App = () => {
  return (
    <div className='w-screen h-screen'>
      {/* <FloatingShapes /> */}
      <Toaster position="top-center" />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/verify-email' element={<VerifyEmail />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/dashboard'
          element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>
          } />


      </Routes>
    </div>
  )
}

export default App
