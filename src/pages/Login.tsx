import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { FaGoogle, FaGithub  } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider, githubProvider } from "../firebase";
import { 
  signInWithPopup, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  updateProfile 
} from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../Assets/Logo-BG.jpg";

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      navigate("/student-dashboard");
    }
  }, [navigate]);

  const toggleForm = () => setIsLogin(!isLogin);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        // Login with email and password
        const userCredential = await signInWithEmailAndPassword(
          auth, 
          formData.email, 
          formData.password
        );
        const user = userCredential.user;
        
        // Store user data in localStorage
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || `${formData.firstName} ${formData.lastName}`,
          photoURL: user.photoURL
        };
        localStorage.setItem("userData", JSON.stringify(userData));
        console.log(userData.photoURL)
        toast.success("Login successful! 🎉");
        setTimeout(() => navigate("/student-dashboard"), 1500);
      } else {
        // Sign up with email and password
        if (formData.password !== formData.confirmPassword) {
          toast.error("Passwords don't match!");
          setIsLoading(false);
          return;
        }

        const userCredential = await createUserWithEmailAndPassword(
          auth, 
          formData.email, 
          formData.password
        );
        const user = userCredential.user;
        
        // Update profile with name
        await updateProfile(user, {
          displayName: `${formData.firstName} ${formData.lastName}`
        });

        // Store user data in localStorage
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: `${formData.firstName} ${formData.lastName}`,
          photoURL: user.photoURL || null
        };
        localStorage.setItem("userData", JSON.stringify(userData));
        
        toast.success("Account created successfully! 🎉");
        setTimeout(() => navigate("/student-dashboard"), 1500);
      }
    } catch (error: any) {
      console.error("Authentication error:", error);
      toast.error(error.message || "Authentication failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle social login and store user data
  const handleSocialLogin = async (provider: any, providerName: string) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Extract first and last name from displayName
      let firstName = "";
      let lastName = "";
      if (user.displayName) {
        const nameParts = user.displayName.split(" ");
        firstName = nameParts[0] || "";
        lastName = nameParts.slice(1).join(" ") || "";
      }
      
      // Store user data in localStorage
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        firstName,
        lastName
      };
      localStorage.setItem("userData", JSON.stringify(userData));
      
      toast.success(`Logged in with ${providerName} successfully!`);
      setTimeout(() => navigate("/student-dashboard"), 1500);
    } catch (err: any) {
      console.error(`${providerName} login error:`, err);
      toast.error(err.message || `${providerName} login failed. Please try again.`);
    }
  };

  // 🔹 Google login
  const handleGoogleLogin = () => handleSocialLogin(googleProvider, "Google");

  // 🔹 GitHub login
  const handleGithubLogin = () => handleSocialLogin(githubProvider, "GitHub");

  return (
    <div className="min-h-screen mt-10 flex items-center justify-center px-6 lg:px-8">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      <div className="grid md:grid-cols-2 gap-8 w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Left Side (Image) */}
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

        {/* Right Side (Form) */}
        <motion.div
          className="p-10 flex flex-col justify-center"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
              <img src={logo} alt="logo" className="rounded-md" />
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">
            {isLogin ? "Welcome Back 👋" : "Create your account"}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isLogin ? (
              <>
                Don't have an account?{" "}
                <button
                  onClick={toggleForm}
                  className="font-medium text-purple-600 hover:text-purple-500"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={toggleForm}
                  className="font-medium text-purple-600 hover:text-purple-500"
                >
                  Login
                </button>
              </>
            )}
          </p>

          {/* Form */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Signup extra fields */}
              {!isLogin && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      required={!isLogin}
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                      required={!isLogin}
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>

              {/* Confirm Password (only signup) */}
              {!isLogin && (
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm password"
                    required={!isLogin}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Remember me + Forgot password (only login) */}
            {isLogin && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-purple-600 border-gray-300 rounded"
                  />
                  <span className="text-gray-900">Remember me</span>
                </label>
                <a
                  href="#"
                  className="text-purple-600 hover:text-purple-500 font-medium"
                >
                  Forgot password?
                </a>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-md text-white font-medium bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:ring-2 focus:ring-purple-500 disabled:opacity-50 transition-all"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mx-auto"></div>
              ) : isLogin ? (
                "Sign in"
              ) : (
                "Create account"
              )}
            </button>
          </form>

          {/* Social login */}
          <div className="mt-8">
            <p className="text-center text-sm text-gray-500 mb-4">
              Or continue with
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleGoogleLogin}
                className="p-3 border rounded-lg hover:bg-gray-50 transition"
              >
                <FaGoogle className="h-5 w-5 text-red-500" />
              </button>
              <button
                onClick={handleGithubLogin}
                className="p-3 border rounded-lg hover:bg-gray-50 transition"
              >
                <FaGithub className="h-5 w-5 text-gray-800" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;