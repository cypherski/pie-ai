// src/context/AIContext.js
import React, { createContext, useContext, useState } from 'react';
import { useAI } from '../hooks/useAI';
import { motion, AnimatePresence } from 'framer-motion';

const AIContext = createContext(null);

export const AIProvider = ({ children }) => {
  const ai = useAI();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const contextValue = {
    ...ai,
    isTransitioning,
    setIsTransitioning
  };
  
  return (
    <AIContext.Provider value={contextValue}>
      <AnimatePresence mode="wait">
        {children}
      </AnimatePresence>
    </AIContext.Provider>
  );
};