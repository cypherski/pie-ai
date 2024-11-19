// src/layouts/AppLayout.js
import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { PiThiaChat } from '../components/PiThiaChat';
import { PiDigitStream } from '../components/PiDigitStream';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2,
      ease: "easeIn"
    }
  }
};

export const AppLayout = ({ children }) => {
  const location = useLocation();

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="min-h-screen bg-[#020817] overflow-hidden"
    >
      {/* Background Effects */}
      <motion.div 
        className="fixed inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 via-blue-900/20 to-black opacity-70" />
        <motion.div 
          className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-blue-500/10 blur-3xl"
          animate={{ 
            opacity: [0.5, 0.8, 0.5],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-purple-500/10 blur-3xl"
          animate={{ 
            opacity: [0.5, 0.8, 0.5],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
        <PiDigitStream />
      </motion.div>

      {/* Content */}
      <div className="relative z-10">
        <Navigation />
        <main>
          <motion.div
            key={location.pathname}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
          >
            {children}
          </motion.div>
        </main>
      </div>

      {/* Fixed Chat */}
      <PiThiaChat />
    </motion.div>
  );
};

export default AppLayout;