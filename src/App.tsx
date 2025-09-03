import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import Homepage from "./pages/Homepage";
import StudentDashboard from "./pages/StudentDashboard";
import AdminPanel from "./pages/AdminPanel";
import "./index.css";
import AuthPage from "./pages/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Apply from "./pages/Apply";
import { Toaster } from "react-hot-toast";

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const [show, setShow] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () =>
      window.scrollY > 300 ? setShow(true) : setShow(false);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  // Routes where Navbar should be hidden
  const hideNavbarRoutes = ["/student-dashboard", "/admin"];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

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

       

      <Footer />

      {/* Scroll to Top Button */}
      {show && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all duration-300"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </>
  );
}

export default AppWrapper;
