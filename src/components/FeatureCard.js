// src/components/FeatureCard.js
import React from 'react';
import { motion } from 'framer-motion';

export const FeatureCard = ({ icon, title, description, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05 }}
      className="group relative p-6 rounded-2xl overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-sm transition-all duration-300 group-hover:from-blue-900/40 group-hover:to-purple-900/40" />
      
      {/* Border gradient */}
      <div className="absolute inset-0 border border-white/10 rounded-2xl group-hover:border-white/20 transition-all duration-300" />
      
      {/* Content */}
      <div className="relative flex flex-col items-center text-center space-y-4">
        <div className="text-blue-400 transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-blue-200">{description}</p>
      </div>
      
      {/* Hover effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-purple-500/10" />
      </div>
    </motion.div>
  );
};

export default FeatureCard;