const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
};

const LOCAL_API = process.env.REACT_APP_API_ENDPOINT;
const OPENAI_API = process.env.REACT_APP_OPENAI_API_URL;

export const aiService = {
  async chat(message, piDentity = null) {
    try {
      // Try local API first if available
      if (process.env.REACT_APP_ENV === 'development' && LOCAL_API) {
        try {
          const localResponse = await fetch(`${LOCAL_API}/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message, piDentity })
          });
          if (localResponse.ok) {
            return await localResponse.json();
          }
        } catch (error) {
          console.log('Local API unavailable, falling back to OpenAI');
        }
      }

      // Fallback to OpenAI API
      const response = await fetch(`${OPENAI_API}/chat/completions`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          model: process.env.REACT_APP_OPENAI_MODEL,
          messages: [
            {
              role: "system",
              content: "You are π-THIA, an AI assistant specializing in π analysis and mathematical patterns. You respond with playful yet mathematically accurate insights."
            },
            {
              role: "user",
              content: message
            }
          ],
          temperature: parseFloat(process.env.REACT_APP_AI_TEMPERATURE || '0.7'),
          max_tokens: parseInt(process.env.REACT_APP_AI_MAX_TOKENS || '150')
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error?.message || 'AI service error');
      }

      return {
        message: data.choices[0].message.content,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('AI Service Error:', error);
      return {
        message: "I'm having trouble connecting. Please try again later.",
        error: true
      };
    }
  },

  async analyzePiSequence(sequence) {
    try {
      // Similar fallback pattern for sequence analysis
      if (process.env.REACT_APP_ENV === 'development' && LOCAL_API) {
        try {
          const localResponse = await fetch(`${LOCAL_API}/analyze`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sequence })
          });
          if (localResponse.ok) {
            return await localResponse.json();
          }
        } catch (error) {
          console.log('Local API unavailable, falling back to OpenAI');
        }
      }

      const response = await fetch(`${OPENAI_API}/chat/completions`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          model: process.env.REACT_APP_OPENAI_MODEL,
          messages: [
            {
              role: "system",
              content: "You are a mathematical analysis system. Analyze the given π sequence and provide insights about patterns, significance, and mathematical properties."
            },
            {
              role: "user",
              content: `Analyze this π sequence: ${sequence}`
            }
          ],
          temperature: 0.3,
          max_tokens: 200
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error?.message || 'Analysis error');
      }

      const analysisText = data.choices[0].message.content;
      return {
        analysis: analysisText,
        significance_score: this.calculateSignificanceScore(analysisText),
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Analysis Error:', error);
      return {
        error: true,
        message: "Couldn't analyze sequence"
      };
    }
  },

  calculateSignificanceScore(analysisText) {
    const significantTerms = [
      'rare', 'unique', 'interesting', 'pattern',
      'sequence', 'mathematical', 'significant', 'remarkable'
    ];
    
    const score = significantTerms.reduce((acc, term) => {
      return acc + (analysisText.toLowerCase().includes(term) ? 1 : 0);
    }, 0);

    return Math.min(Math.round((score / significantTerms.length) * 10), 10);
  }
};

export default aiService;