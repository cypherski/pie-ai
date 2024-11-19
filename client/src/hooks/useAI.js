// src/hooks/useAI.js
import { useState, useCallback } from 'react';
import { aiService } from '../services/aiService';

export const useAI = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = useCallback(async (message, context = {}) => {
    if (!message) {
      setError('Message is required');
      return { error: true, message: 'Message is required' };
    }

    setIsProcessing(true);
    setError(null);

    try {
      const response = await aiService.chat(message, context);
      return response;
    } catch (err) {
      const errorMessage = err.message || "I'm having trouble connecting. Please try again later.";
      setError(errorMessage);
      return { error: true, message: errorMessage };
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const analyzeSequence = useCallback(async sequence => {
    if (!sequence) {
      setError('Sequence is required');
      return { error: true, message: 'Sequence is required' };
    }

    setIsProcessing(true);
    setError(null);

    try {
      const analysis = await aiService.analyzePiSequence(sequence);
      return analysis;
    } catch (err) {
      const errorMessage = err.message || 'Analysis failed. Please try again.';
      setError(errorMessage);
      return { error: true, message: errorMessage };
    } finally {
      setIsProcessing(false);
    }
  }, []);

  return {
    sendMessage,
    analyzeSequence,
    isProcessing,
    error,
    clearError: () => setError(null),
  };
};

export default useAI;
