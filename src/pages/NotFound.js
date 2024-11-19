// src/pages/NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Pi } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-8"
      >
        <div className="relative">
          <Pi className="w-32 h-32 text-blue-500/20 mx-auto" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-8xl font-bold text-white">404</h1>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-white">Page Not Found</h2>
          <p className="text-blue-200 max-w-md mx-auto">
            Even in an infinite sequence of π, we couldn't find the page you're looking for.
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 
            rounded-full hover:bg-blue-700 transition-colors text-white font-medium"
        >
          <Home className="w-5 h-5" />
          <span>Return Home</span>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;