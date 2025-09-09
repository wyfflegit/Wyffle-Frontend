import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";
import { ReactNode, useState } from "react";
import { motion } from "framer-motion";
import { AuthProvider, useAuth } from "./Context/AuthContext";

// Page and Component Imports
import Homepage from "./pages/Homepage";
import StudentDashboard from "./pages/StudentDashboard";
import AdminPanel from "./pages/AdminPanel";
import AuthPage from "./pages/Login";
import Apply from "./pages/Apply";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// UI Imports
import { Toaster } from "react-hot-toast";
import { FaWhatsapp } from "react-icons/fa";
import "./index.css";

// --- Main App Entry Point (Unchanged) ---
function AppWrapper() {
  return (
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  );
}

// --- CORRECTED: Layout Component ---
// This component now conditionally hides the Navbar, Footer, and WhatsApp button
// on specific dashboard routes.
const AppLayout = () => {
  const location = useLocation();
  const hideLayoutOnRoutes = ["/student-dashboard", "/admin"];
  const shouldShowLayout = !hideLayoutOnRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowLayout && <Navbar />}
      <main>
        {/* Outlet always renders the matched child route's component */}
        <Outlet />
      </main>
      {shouldShowLayout && <WhatsAppFloat />}
      {shouldShowLayout && <Footer />}
    </>
  );
};

// --- ProtectedRoute Component (Unchanged) ---
type ProtectedRouteProps = {
  children: ReactNode;
  adminOnly?: boolean;
};

function ProtectedRoute({ children, adminOnly = false }: ProtectedRouteProps) {
  const { currentUser, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/student-dashboard" replace />;
  }

  return <>{children}</>;
}

// --- App Component (Unchanged) ---
// The routing structure remains the same, as the layout logic is handled in AppLayout.
function App() {
  return (
    <>
       {/* Toast containers */}
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
        theme="colored"
      />

      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/apply" element={<Apply />} />
          <Route
            path="/student-dashboard"
            element={
              <ProtectedRoute>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

// --- WhatsApp Floating Button Component (Unchanged) ---
const WhatsAppFloat = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
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
          boxShadow: "0 4px 20px rgba(37, 211, 102, 0.4)",
        }}
      >
        <FaWhatsapp className="w-8 h-8" />
        <motion.span
          className="absolute right-14 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-sm px-3 py-2 rounded-md whitespace-nowrap"
          initial={{ opacity: 0, x: 10 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            x: isHovered ? 0 : 10,
          }}
          transition={{ duration: 0.2 }}
        >
          Chat with us!
        </motion.span>
      </motion.a>
    </motion.div>
  );
};

export default AppWrapper;