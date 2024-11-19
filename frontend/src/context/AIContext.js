import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useAI } from '../hooks/useAI';
import { AnimatePresence } from 'framer-motion';

const AIContext = createContext(null);

export const AIProvider = ({ children }) => {
  const ai = useAI();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const contextValue = {
    ...ai,
    isTransitioning,
    setIsTransitioning,
  };

  return (
    <AIContext.Provider value={contextValue}>
      <AnimatePresence mode="wait">{children}</AnimatePresence>
    </AIContext.Provider>
  );
};

AIProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAIContext = () => {
  const context = useContext(AIContext);
  if (!context) {
    throw new Error('useAIContext must be used within an AIProvider');
  }
  return context;
};

export default AIContext;
