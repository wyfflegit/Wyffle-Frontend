import React, { useState, useCallback, memo, useEffect, useRef } from "react";
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
    const isActive = location.pathname === to || location.hash === to;

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

interface NavbarProps {
  profileImage?: string | null;
}

const Navbar: React.FC<NavbarProps> = ({ profileImage = null }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLButtonElement>(null);

  // track user login state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  // Handle click outside dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        avatarRef.current &&
        !avatarRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // scroll effect
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const navLinks = [
    { to: "/#why-wyffle", label: "Why Wyffle" },
    { to: "/#community", label: "Community" },
    { to: "/#contact", label: "Contact" },
    { to: "/discord", label: "Discord Server" },
  ];

  const handleLogin = () => {
    navigate("/login");
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("userData");
      setUser(null);
      setShowDropdown(false);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleDashboard = () => {
    setShowDropdown(false);
    navigate("/student-dashboard");
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  const handleMouseEnterDropdown = () => {
    setShowDropdown(true);
  };

  // const handleMouseLeaveDropdown = () => {
  //   setShowDropdown(false);
  // };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-effect shadow-lg py-3" : "bg-transparent py-4"
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
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-white p-1 shadow-sm">
              <img src={LOGO} alt="logo" className="rounded-md w-full h-full object-contain" />
            </div>
            <span className="text-2xl font-bold gradient-text bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Wyffle
            </span>
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
              <div className="relative" 
                onMouseEnter={handleMouseEnterDropdown}
                // onMouseLeave={handleMouseLeaveDropdown}
                ref={dropdownRef}
              >
                {/* Avatar */}
                <button
                  ref={avatarRef}
                  className="w-10 h-10 rounded-full overflow-hidden border-2 focus:outline-none transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  {profileImage || user.photoURL ? (
                    <img
                      src={profileImage || user.photoURL || ""}
                      alt="user avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex items-center justify-center w-full h-full font-bold">
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
                  <motion.div 
                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-200 py-3 z-50"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* User Info */}
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-800 truncate">
                        Hey, {user.displayName || user.email}
                      </p>
                    </div>

                    {/* Dashboard Button */}
                    <button
                      onClick={handleDashboard}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-indigo-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6"
                        />
                      </svg>
                      Dashboard
                    </button>

                    {/* Logout Button */}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5"
                        />
                      </svg>
                      Logout
                    </button>
                  </motion.div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X size={24} className="text-gray-700" />
            ) : (
              <Menu size={24} className="text-gray-700" />
            )}
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
                    className="w-12 h-12 rounded-full overflow-hidden border-2 border-purple-600 focus:outline-none mx-auto block"
                  >
                    {profileImage || user.photoURL ? (
                      <img
                        src={profileImage || user.photoURL || ""}
                        alt="user avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex items-center justify-center w-full h-full font-bold">
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
                    <motion.div 
                      className="absolute left-1/2 transform -translate-x-1/2 mt-3 w-48 bg-white rounded-lg shadow-lg border py-2 z-50"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <p className="px-4 py-2 text-sm text-gray-700 text-center border-b truncate">
                        Hey, {user.displayName || user.email}
                      </p>
                      <button
                        onClick={handleDashboard}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        Dashboard
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Custom CSS for glass effect */}
      <style>{`
        .glass-effect {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
        @media (max-width: 768px) {
          .glass-effect {
            background: rgba(255, 255, 255, 0.95);
          }
        }
      `}</style>
    </motion.nav>
  );
};

export default memo(Navbar);