import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import Homepage from "./pages/Homepage";
import StudentDashboard from "./pages/StudentDashboard";
import AdminPanel from "./pages/AdminPanel";
import "./index.css";
import AuthPage from "./pages/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Apply from "./pages/Apply";
import { Toaster } from "react-hot-toast";
import { FaWhatsapp } from "react-icons/fa";

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

// WhatsApp component - always visible with animation
const WhatsAppFloat = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ opacity: 0, scale: 0.5, y: 100 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
    >
      <motion.a
        href="https://wa.me/9243299128"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 text-white p-4 rounded-full shadow-lg flex items-center justify-center relative"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        style={{
          background: "linear-gradient(135deg, #25D366, #128C7E)",
          boxShadow: "0 4px 20px rgba(37, 211, 102, 0.4)"
        }}
      >
        <FaWhatsapp className="w-8 h-8" />
        
        {/* Animated chat bubble */}
        <motion.span
          className="absolute right-14 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-sm px-3 py-2 rounded-md whitespace-nowrap"
          initial={{ opacity: 0, x: 10 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            x: isHovered ? 0 : 10
          }}
          transition={{ duration: 0.2 }}
        >
          Chat with us!
        </motion.span>
      </motion.a>

      {/* Pulsing animation effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-green-400 opacity-0 z-[-1]"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0, 0.5, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3
        }}
      />
    </motion.div>
  );
};

function App() {
  const location = useLocation();

  // Routes where Navbar should be hidden
  const hideNavbarRoutes = ["/student-dashboard", "/admin"];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  // Routes where Footer should be hidden
  const hideFooterRoutes = ["/student-dashboard", "/admin"];
  const shouldShowFooter = !hideFooterRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Toaster position="top-right" reverseOrder={false} />

      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/apply" element={<Apply />} />
        </Routes>
      </div>

      <WhatsAppFloat />

      {shouldShowFooter && <Footer />}
    </>
  );
}

export default AppWrapper;