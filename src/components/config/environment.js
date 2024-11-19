const environments = {
  development: {
    ENABLE_LOGS: true,
    MAX_PI_DIGITS: 1000000,
    CACHE_DURATION: 3600000, // 1 hour in milliseconds
  },
  production: {
    ENABLE_LOGS: false,
    MAX_PI_DIGITS: 1000000,
    CACHE_DURATION: 86400000, // 24 hours in milliseconds
  }
};

// OpenAI Configuration
export const OPENAI_CONFIG = {
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  endpoint: process.env.REACT_APP_API_ENDPOINT || 'https://api.openai.com/v1',
  model: process.env.REACT_APP_OPENAI_MODEL || 'gpt-4',
  temperature: parseFloat(process.env.REACT_APP_AI_TEMPERATURE) || 0.7,
  maxTokens: parseInt(process.env.REACT_APP_AI_MAX_TOKENS) || 150,
};

// AI Assistant Configuration
export const AI_CONFIG = {
  personality: {
    name: 'π-THIA',
    traits: [
      'Mathematical expertise',
      'Playful with numbers',
      'Pattern-focused',
      'Community-oriented'
    ],
    contextWindow: 10
  },
  prompts: {
    initial: "You are π-THIA, an AI assistant specializing in π analysis and community engagement...",
    fallback: "I'm still processing that sequence. Could you share more about what you've noticed?",
    error: "Even π has its limits. Let's try that again!"
  }
};

// Service Configuration
export const serviceConfig = {
  ai: {
    maxRetries: 3,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
    },
    endpoints: {
      chat: '/chat/completions',
      analyze: '/completions',
      stream: '/stream'
    }
  },
  pi: {
    cacheKey: 'pi_calculations_cache',
    maxCacheSize: 50 * 1024 * 1024, // 50MB
    chunkSize: 1000,
    maxSequenceLength: parseInt(process.env.REACT_APP_MAX_PI_DIGITS) || 1000000
  }
};

// Get current environment configuration
const getEnvironment = () => {
  const env = process.env.REACT_APP_ENV || 'development';
  return environments[env] || environments.development;
};

// Export combined configuration
const config = {
  ...getEnvironment(),
  services: serviceConfig,
  ai: {
    ...AI_CONFIG,
    ...OPENAI_CONFIG
  },
  version: process.env.REACT_APP_VERSION || '0.1.0',
  isDevelopment: process.env.REACT_APP_ENV === 'development',
  isProduction: process.env.REACT_APP_ENV === 'production',
  enableLogs: process.env.REACT_APP_ENABLE_LOGS === 'true'
};

export default config;