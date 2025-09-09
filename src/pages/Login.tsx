import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../Context/AuthContext";
import logo from "../Assets/Logo-BG.jpg";
import { getAuth, updateCurrentUser } from 'firebase/auth';

const auth = getAuth();

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const { login, signup, resetPassword, loginWithGoogle, currentUser, isAdmin } = useAuth();
  
  const hasRedirected = useRef(false);

  // This effect handles both redirection and storing user data in localStorage
  useEffect(() => {
    if (currentUser) {
      // --- NEW: Store User Data in localStorage ---
      // Create a clean, serializable object for storage
      const userData = {
        uid: currentUser.uid,
        email: currentUser.email,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
        isAdmin: isAdmin,
      };
      // Save the user data to localStorage
      localStorage.setItem('userData', JSON.stringify(userData));
      
      
      // --- Redirection Logic (Unchanged) ---
      if (!hasRedirected.current) {
        hasRedirected.current = true;
        const redirectPath = isAdmin ? "/admin" : "/student-dashboard";
        setTimeout(() => navigate(redirectPath), 500);
      }
    } else {
      // --- NEW: Clear User Data on Logout ---
      // This is crucial to ensure no stale data is left behind
      localStorage.removeItem('userData');
    }
  }, [currentUser, isAdmin, navigate]);

  const toggleForm = () => {
    if (isLoading) return;
    setIsLogin(!isLogin);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // After setting admin claims on server, refresh token
const refreshToken = async () => {
  try {
    const currentUser = auth.currentUser;
    if (currentUser) {
      await currentUser.getIdToken(true); // Force refresh
      console.log('Token refreshed with updated claims');
    }
  } catch (error) {
    console.error('Error refreshing token:', error);
  }
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);

    try {
      if (isLogin) {
        await login(formData.email, formData.password, rememberMe);
        toast.success("Login successful! 🎉");
      } else {
        if (formData.password !== formData.confirmPassword) {
          toast.error("Passwords don't match!");
          setIsLoading(false);
          return;
        }
        await signup(formData.email, formData.password);
        toast.success("Account created successfully! 🎉");
      }
    } catch (error) {
      console.error("Authentication error:", error);
      let errorMessage = "Authentication failed. Please try again.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!formData.email) {
      toast.warn("Please enter your email to reset the password.");
      return;
    }
    try {
      await resetPassword(formData.email);
      toast.success("Password reset email sent! Check your inbox.");
    } catch (error) {
      let errorMessage = "Failed to send reset email.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
    }
  };

  const handleGoogleLogin = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      await loginWithGoogle();
      toast.success("Logged in with Google successfully!");
    } catch (error) {
      console.error("Google login error:", error);
      let errorMessage = "Google login failed. Please try again.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-10 flex items-center justify-center px-6 lg-px-8">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <div className="grid md:grid-cols-2 gap-8 w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <motion.div
          className="hidden md:block relative"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src="https://png.pngtree.com/png-clipart/20230504/original/pngtree-free-vector-login-concept-illustration-png-image_9140539.png"
            alt="Auth illustration"
            className="h-full w-full object-cover"
          />
        </motion.div>

        <motion.div
          className="p-10 flex flex-col justify-center"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
              <img src={logo} alt="logo" className="rounded-md" />
            </div>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">
            {isLogin ? "Welcome Back 👋" : "Create your account"}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={toggleForm}
              disabled={isLoading}
              className="font-medium text-purple-600 hover:text-purple-500 disabled:opacity-50"
            >
              {isLogin ? "Sign up" : "Login"}
            </button>
          </p>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {!isLogin && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <input type="text" name="firstName" placeholder="First name" required={!isLogin} value={formData.firstName} onChange={handleInputChange} className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 sm:text-sm"/>
                  </div>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <input type="text" name="lastName" placeholder="Last name" required={!isLogin} value={formData.lastName} onChange={handleInputChange} className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 sm:text-sm"/>
                  </div>
                </div>
              )}

              <div className="relative">
                <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input type="email" name="email" placeholder="Email address" required value={formData.email} onChange={handleInputChange} className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 sm:text-sm" />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" required value={formData.password} onChange={handleInputChange} className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 sm:text-sm" />
                <button type="button" className="absolute right-3 top-3 text-gray-400 hover:text-gray-600" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              {!isLogin && (
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm password" required={!isLogin} value={formData.confirmPassword} onChange={handleInputChange} className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 sm:text-sm" />
                  <button type="button" className="absolute right-3 top-3 text-gray-400 hover:text-gray-600" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              )}
            </div>

            {isLogin && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="h-4 w-4 text-purple-600 border-gray-300 rounded" />
                  <span className="text-gray-900">Remember me</span>
                </label>
                <button type="button" onClick={handlePasswordReset} className="text-purple-600 hover:text-purple-500 font-medium">
                  Forgot password?
                </button>
              </div>
            )}
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-md text-white font-medium bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:ring-2 focus:ring-purple-500 disabled:opacity-50 transition-all"
            >
              {isLoading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mx-auto"></div> : isLogin ? "Sign in" : "Create account"}
            </button>
          </form>

          <div className="mt-8">
            <p className="text-center text-sm text-gray-500 mb-4">Or continue with</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="flex items-center gap-3 px-5 py-3 border rounded-lg shadow-sm bg-white transition duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" viewBox="0 0 48 48">
                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                  <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                  <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                  <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C44.438,36.333,48,30.662,48,24C48,22.659,47.862,21.35,47.611,20.083z"></path>
                </svg>
                <span className="text-gray-700 font-medium">Continue with Google</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;