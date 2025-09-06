import React, { useState, useCallback, memo, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getAuth, signOut, onAuthStateChanged, User } from "firebase/auth";
import LOGO from "../Assets/Logo-BG.jpg";

interface NavLinkProps {
  to: string;
  label: string;
  onClick?: () => void;
  isMobile?: boolean;
}

const NavLink: React.FC<NavLinkProps> = memo(
  ({ to, label, onClick, isMobile = false }) => {
    const location = useLocation();
    const isActive = location.hash === to;

    const baseClass = `font-medium transition-colors duration-200 ${
      isActive ? "text-purple-600" : "text-gray-700 hover:text-purple-600"
    }`;

    if (isMobile) {
      return (
        <Link to={to} className={`block py-2 ${baseClass}`} onClick={onClick}>
          {label}
        </Link>
      );
    }

    return (
      <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
        <Link to={to} className={baseClass}>
          {label}
        </Link>
      </motion.div>
    );
  }
);
NavLink.displayName = "NavLink";

interface NavButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const NavButton: React.FC<NavButtonProps> = memo(
  ({ onClick, children, className = "" }) => (
    <motion.button
      className={`bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  )
);
NavButton.displayName = "NavButton";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  // track user login state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  // scroll effect
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const navLinks = [
    { to: "#why-wyffle", label: "Why Wyffle" },
    { to: "#community", label: "Community" },
    { to: "#contact", label: "Contact" },
  ];

  const handleLogin = () => {
    navigate("/login");
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth); // Firebase logout
      localStorage.removeItem("userData"); // 🔹 Remove user details from localStorage
      setUser(null); // 🔹 Clear React state
      setShowDropdown(false);
      navigate("/"); // Redirect to homepage or login
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleDashboard = () => {
    setShowDropdown(false);
    navigate("/student-dashboard");
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-effect shadow-lg py-6" : "bg-transparent py-6"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-2 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            onClick={() => navigate("/")}
          >
            <div className="w-8 h-8 rounded-2xl flex items-center justify-center">
              <img src={LOGO} alt="logo" className="rounded-md" />
            </div>
            <span className="text-2xl font-bold gradient-text">Wyffle</span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} label={link.label} />
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center space-x-4">
            <NavButton onClick={() => navigate("/apply")}>Apply Now</NavButton>

            {!user ? (
              <NavButton onClick={handleLogin}>Login</NavButton>
            ) : (
              <div className="relative">
                {/* Avatar */}
                <button
                  onClick={() => setShowDropdown((prev) => !prev)}
                  className="w-10 h-10 rounded-full overflow-hidden border-2 border-purple-600 focus:outline-none"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="user avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="bg-purple-600 text-white flex items-center justify-center w-full h-full font-bold">
                      {user.displayName
                        ? user.displayName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()
                        : user.email?.[0].toUpperCase() || "U"}
                    </span>
                  )}
                </button>

                {/* Dropdown */}
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border py-2">
                    <p className="px-4 py-2 text-sm text-gray-700">
                      Hey, {user.displayName || user.email}
                    </p>
                    <button
                      onClick={handleDashboard}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden mt-4 p-4 glass-effect rounded-xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                label={link.label}
                isMobile={true}
                onClick={() => setIsMobileMenuOpen(false)}
              />
            ))}

            <div className="mt-4 space-y-3">
              <NavButton onClick={() => navigate("/apply")} className="w-full">
                Apply Now
              </NavButton>

              {!user ? (
                <NavButton onClick={handleLogin} className="w-full">
                  Login
                </NavButton>
              ) : (
                <div className="relative">
                  {/* Avatar for mobile */}
                  <button
                    onClick={() => setShowDropdown((prev) => !prev)}
                    className="w-12 h-12 rounded-full overflow-hidden border-2 border-purple-600 focus:outline-none mx-auto"
                  >
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="user avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="bg-purple-600 text-white flex items-center justify-center w-full h-full font-bold">
                        {user.displayName
                          ? user.displayName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()
                          : user.email?.[0].toUpperCase() || "U"}
                      </span>
                    )}
                  </button>

                  {/* Dropdown for mobile */}
                  {showDropdown && (
                    <div className="absolute left-1/2 transform -translate-x-1/2 mt-3 w-48 bg-white rounded-lg shadow-lg border py-2 z-50">
                      <p className="px-4 py-2 text-sm text-gray-700 text-center">
                        Hey, {user.displayName || user.email}
                      </p>
                      <button
                        onClick={handleDashboard}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Dashboard
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default memo(Navbar);
