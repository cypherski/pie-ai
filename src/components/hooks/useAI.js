import { useState, useCallback } from 'react';
import { aiService } from '../services/aiService';
import { AI_CONFIG } from '../config/environment';

export const useAI = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = useCallback(async (message, context = {}) => {
    setIsProcessing(true);
    setError(null);
    try {
      const response = await aiService.chat(message, context);
      return response;
    } catch (err) {
      setError(err.message);
      return { error: true, message: AI_CONFIG.prompts.error };
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const analyzeSequence = useCallback(async (sequence) => {
    setIsProcessing(true);
    setError(null);
    try {
      const analysis = await aiService.analyzePiSequence(sequence);
      return analysis;
    } catch (err) {
      setError(err.message);
      return { error: true };
    } finally {
      setIsProcessing(false);
    }
  }, []);

  return {
    sendMessage,
    analyzeSequence,
    isProcessing,
    error
  };
};

export default useAI;