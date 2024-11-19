// src/services/aiService.js
import { OPENAI_CONFIG, AI_CONFIG } from '../config/environment';
import config from '../config/environment';

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${OPENAI_CONFIG.apiKey}`,
};

const LOCAL_API = OPENAI_CONFIG.apiEndpoint;
const OPENAI_API = OPENAI_CONFIG.apiEndpoint;

// Add missing AI prompts
const DEFAULT_PROMPTS = {
  initial: 'You are π-THIA, an AI assistant specializing in π (pi) and mathematics.',
  error: "I apologize, but I'm having trouble processing that request. Please try again.",
};

// Custom error handler to replace console.error
const handleError = (error, context) => {
  // In production, you might want to send this to an error tracking service
  if (config.app.enableLogs) {
    // eslint-disable-next-line no-console
    console.error(`${context}:`, error);
  }
  return {
    error: true,
    message: DEFAULT_PROMPTS.error,
  };
};

// Custom logger to replace console.log
const logMessage = message => {
  if (config.app.enableLogs) {
    // eslint-disable-next-line no-console
    console.log(message);
  }
};

export const aiService = {
  async chat(message, piDentity = null) {
    try {
      // Try local API first if available
      if (config.isDevelopment && LOCAL_API) {
        try {
          const localResponse = await fetch(`${LOCAL_API}/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message, piDentity }),
          });
          if (localResponse.ok) {
            return await localResponse.json();
          }
        } catch (error) {
          logMessage('Local API unavailable, falling back to OpenAI');
        }
      }

      const response = await fetch(`${OPENAI_API}/chat/completions`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          model: OPENAI_CONFIG.model,
          messages: [
            {
              role: 'system',
              content: DEFAULT_PROMPTS.initial,
            },
            {
              role: 'user',
              content: message,
            },
          ],
          temperature: AI_CONFIG.temperature,
          max_tokens: AI_CONFIG.maxTokens,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'AI service error');
      }

      return {
        message: data.choices[0].message.content,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return handleError(error, 'AI Service Error');
    }
  },

  async analyzePiSequence(sequence) {
    try {
      // Similar fallback pattern for sequence analysis
      if (config.isDevelopment && LOCAL_API) {
        try {
          const localResponse = await fetch(`${LOCAL_API}/analyze`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sequence }),
          });
          if (localResponse.ok) {
            return await localResponse.json();
          }
        } catch (error) {
          logMessage('Local API unavailable, falling back to OpenAI');
        }
      }

      const response = await fetch(`${OPENAI_API}/chat/completions`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          model: OPENAI_CONFIG.model,
          messages: [
            {
              role: 'system',
              content:
                'You are a mathematical analysis system. Analyze the given π sequence and provide insights about patterns, significance, and mathematical properties.',
            },
            {
              role: 'user',
              content: `Analyze this π sequence: ${sequence}`,
            },
          ],
          temperature: 0.3, // Lower temperature for more precise analysis
          max_tokens: OPENAI_CONFIG.maxTokens,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Analysis error');
      }

      const analysisText = data.choices[0].message.content;
      return {
        analysis: analysisText,
        significance_score: this.calculateSignificanceScore(analysisText),
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return handleError(error, 'Analysis Error');
    }
  },

  calculateSignificanceScore(analysisText) {
    const significantTerms = [
      'rare',
      'unique',
      'interesting',
      'pattern',
      'sequence',
      'mathematical',
      'significant',
      'remarkable',
    ];

    const score = significantTerms.reduce((acc, term) => {
      return acc + (analysisText.toLowerCase().includes(term) ? 1 : 0);
    }, 0);

    return Math.min(Math.round((score / significantTerms.length) * 10), 10);
  },
};

export default aiService;
