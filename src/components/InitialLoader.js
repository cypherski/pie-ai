// src/components/InitialLoader.js
import React from 'react';
import { motion } from 'framer-motion';

const InitialLoader = ({ onComplete }) => {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-[#020817]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onAnimationComplete={onComplete}
    >
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="text-8xl font-bold text-blue-500"
      >
        π
      </motion.div>
    </motion.div>
  );
};

export default InitialLoader;