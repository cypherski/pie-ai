// src/config/environment.js

/* global process */

const isClient = typeof window !== 'undefined';

// Safe environment variable getter
const getEnvVar = (key, defaultValue = '') => {
  if (isClient) {
    return window?.process?.env?.[key] ?? defaultValue;
  }

  // Handle Node.js environment
  try {
    return process?.env?.[key] ?? defaultValue;
  } catch {
    return defaultValue;
  }
};

// OpenAI Configuration
export const OPENAI_CONFIG = {
  apiKey: getEnvVar('REACT_APP_OPENAI_API_KEY'),
  apiEndpoint: getEnvVar('REACT_APP_API_ENDPOINT'),
  model: getEnvVar('REACT_APP_OPENAI_MODEL'),
};

// AI Configuration
export const AI_CONFIG = {
  temperature: parseFloat(getEnvVar('REACT_APP_AI_TEMPERATURE', '0.7')),
  maxTokens: parseInt(getEnvVar('REACT_APP_AI_MAX_TOKENS', '150'), 10),
  prompts: {
    initial: 'You are π-THIA, an AI assistant specializing in π (pi) and mathematics.',
    error: "I apologize, but I'm having trouble processing that request. Please try again.",
  },
};

// Environment configuration
const environment = {
  openai: OPENAI_CONFIG,
  app: {
    env: getEnvVar('REACT_APP_ENV', 'development'),
    version: getEnvVar('REACT_APP_VERSION', '1.0.0'),
    maxPiDigits: parseInt(getEnvVar('REACT_APP_MAX_PI_DIGITS', '1000000'), 10),
    enableLogs: getEnvVar('REACT_APP_ENABLE_LOGS', 'false') === 'true',
  },
  ai: AI_CONFIG,
  isDevelopment: getEnvVar('REACT_APP_ENV', 'development') === 'development',
  isProduction: getEnvVar('REACT_APP_ENV') === 'production',
};

export default environment;
