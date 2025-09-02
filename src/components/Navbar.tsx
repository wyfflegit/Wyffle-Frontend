import React, { useState, useCallback, memo, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import LOGO from "../Assets/Logo-BG.jpg"

interface NavLinkProps {
  href: string;
  label: string;
  onClick?: () => void;
  isMobile?: boolean;
}

// Memoized NavLink component to prevent unnecessary re-renders
const NavLink: React.FC<NavLinkProps> = memo(({ href, label, onClick, isMobile = false }) => {
  const location = useLocation();
  const isActive = location.hash === href;
  
  if (isMobile) {
    return (
      <a
        href={href}
        className={`block py-2 font-medium transition-colors duration-200 ${
          isActive ? "text-purple-600" : "text-gray-700 hover:text-purple-600"
        }`}
        onClick={onClick}
      >
        {label}
      </a>
    );
  }

  return (
    <motion.a
      href={href}
      className={`font-medium transition-colors duration-200 ${
        isActive ? "text-purple-600" : "text-gray-700 hover:text-purple-600"
      }`}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      {label}
    </motion.a>
  );
});

NavLink.displayName = 'NavLink';

interface NavButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

// Memoized Button component
const NavButton: React.FC<NavButtonProps> = memo(({ onClick, children, className = "", ...props }) => (
  <motion.button
    className={`bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 ${className}`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    {...props}
  >
    {children}
  </motion.button>
));

NavButton.displayName = 'NavButton';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  // Use useCallback to memoize the scroll handler
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#why-wyffle", label: "Why Wyffle" },
    { href: "#programs", label: "Programs" },
    { href: "#community", label: "Community" },
    { href: "#contact", label: "Contact" },
  ];

  const handleLogin = (): void => {
    navigate("/login");
    setIsMobileMenuOpen(false);
  };

  const handleApplyNow = (): void => {
    // Application logic here
    console.log("Apply Now clicked");
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = (): void => {
    setIsMobileMenuOpen(prev => !prev);
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 mb-20 ${
        isScrolled ? "glass-effect shadow-lg py-6" : "bg-transparent py-6"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
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
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
              />
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <NavButton onClick={handleApplyNow}>
              Apply Now
            </NavButton>
            <NavButton onClick={handleLogin}>
              Login
            </NavButton>
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
                key={link.href}
                href={link.href}
                label={link.label}
                isMobile={true}
                onClick={() => setIsMobileMenuOpen(false)}
              />
            ))}
            <div className="mt-4 space-y-3">
              <NavButton 
                onClick={handleApplyNow}
                className="w-full"
              >
                Apply Now
              </NavButton>
              <NavButton 
                onClick={handleLogin}
                className="w-full"
              >
                Login
              </NavButton>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default memo(Navbar);