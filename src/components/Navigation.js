// src/components/Navigation.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Pi, Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navigation = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const connectWallet = async () => {
    // Wallet connection logic here
    setIsConnected(true);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-black/80 backdrop-blur-lg' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <Pi className="h-8 w-8 text-blue-400 group-hover:rotate-180 transition-transform duration-500" />
              <span className="text-2xl font-bold text-white">π-FINITY</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <NavLink to="/explore">Explore π</NavLink>
              <NavLink to="/games">Games</NavLink>
              <NavDropdown />
              <button
                onClick={connectWallet}
                className="px-6 py-2 bg-blue-600 rounded-full hover:bg-blue-700 transition-all text-white font-medium"
              >
                {isConnected ? "Connected" : "Connect Wallet"}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white p-2"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black/95 backdrop-blur-lg"
            >
              <div className="px-4 py-6 space-y-4">
                <MobileNavLink to="/explore">Explore π</MobileNavLink>
                <MobileNavLink to="/games">Games</MobileNavLink>
                <MobileNavLink to="/community">Community</MobileNavLink>
                <button
                  onClick={connectWallet}
                  className="w-full px-6 py-3 bg-blue-600 rounded-full hover:bg-blue-700 transition-all text-white font-medium"
                >
                  {isConnected ? "Connected" : "Connect Wallet"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

const NavLink = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`text-lg transition-colors hover:text-blue-400 ${
        isActive ? 'text-blue-400 font-medium' : 'text-blue-200'
      }`}
    >
      {children}
    </Link>
  );
};

const MobileNavLink = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`block py-2 text-lg ${
        isActive ? 'text-blue-400 font-medium' : 'text-blue-200'
      }`}
    >
      {children}
    </Link>
  );
};

const NavDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative group">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 text-lg text-blue-200 hover:text-blue-400 transition-colors"
      >
        <span>Community</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full right-0 mt-2 w-48 bg-black/90 backdrop-blur-lg rounded-xl overflow-hidden"
          >
            <div className="py-2">
              <DropdownItem to="/community">Hub</DropdownItem>
              <DropdownItem to="/community/leaderboard">Leaderboard</DropdownItem>
              <DropdownItem to="/community/events">Events</DropdownItem>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const DropdownItem = ({ to, children }) => (
  <Link
    to={to}
    className="block px-4 py-2 text-blue-200 hover:bg-blue-600/20 hover:text-white transition-colors"
  >
    {children}
  </Link>
);

export default Navigation;