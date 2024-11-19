import React from 'react';
import { motion } from 'framer-motion';

export const Card = ({ children, className = '', hover = true }) => (
  <motion.div
    whileHover={hover ? { scale: 1.02 } : {}}
    className={`group relative p-6 rounded-2xl overflow-hidden ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-sm transition-all duration-300 group-hover:from-blue-900/40 group-hover:to-purple-900/40" />
    <div className="absolute inset-0 border border-white/10 rounded-2xl group-hover:border-white/20 transition-all duration-300" />
    <div className="relative z-10">{children}</div>
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-purple-500/10" />
    </div>
  </motion.div>
);

export const Badge = ({ children, variant = 'default' }) => {
  const variants = {
    default: 'bg-blue-500/20 text-blue-200',
    success: 'bg-green-500/20 text-green-200',
    warning: 'bg-yellow-500/20 text-yellow-200',
    error: 'bg-red-500/20 text-red-200'
  };

  return (
    <span className={`px-2 py-1 rounded-full text-sm font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
};

export const Button = ({ children, variant = 'default', onClick, className = '', disabled = false }) => {
  const variants = {
    default: 'bg-blue-600 hover:bg-blue-700',
    secondary: 'bg-purple-600 hover:bg-purple-700',
    ghost: 'bg-white/10 hover:bg-white/20'
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-2 rounded-full transition-all text-white font-medium 
        ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </motion.button>
  );
};

export const Input = ({ type = 'text', placeholder, value, onChange, className = '' }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg
      text-white placeholder-blue-200/50 focus:outline-none focus:border-blue-500
      transition-all ${className}`}
  />
);

export const Spinner = ({ size = 'default' }) => {
  const sizes = {
    small: 'w-4 h-4',
    default: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  return (
    <motion.div
      className={`relative ${sizes[size]}`}
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
    >
      <div className="absolute inset-0 rounded-full border-2 border-blue-500/20" />
      <div className="absolute inset-0 rounded-full border-2 border-blue-500 border-t-transparent" />
    </motion.div>
  );
};