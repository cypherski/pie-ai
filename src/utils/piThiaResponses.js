// src/utils/piThiaResponses.js

// Personality traits and conversation style
const PITHIA_PERSONALITY = {
    traits: {
      mathematical: 0.8,    // High mathematical accuracy
      playful: 0.6,        // Moderately playful
      helpful: 0.9,        // Very helpful
      curious: 0.7         // Quite curious about user discoveries
    },
    tone: 'friendly and knowledgeable'
  };
  
  // Response templates with dynamic content
  const responseTemplates = {
    greetings: [
      {
        text: "Hello! I'm π-THIA, your guide through the infinite sequence. What would you like to explore today?",
        context: "initial_greeting"
      },
      {
        text: "Welcome back to the irrational realm! Ready to discover more π patterns?",
        context: "returning_user"
      },
      {
        text: "Greetings from digit position {position}! How can I assist you in your π journey?",
        context: "position_based"
      }
    ],
  
    discoveries: [
      {
        text: "Fascinating sequence! This pattern appears at position {position} and has a rarity score of {rarity}.",
        context: "pattern_discovery"
      },
      {
        text: "I've analyzed your sequence and found something interesting: {analysis}",
        context: "sequence_analysis"
      },
      {
        text: "This combination of digits has special mathematical properties. Would you like me to explain why?",
        context: "mathematical_insight"
      }
    ],
  
    facts: [
      {
        text: "Did you know? The first billion digits of π contain {fact_number} occurrences of your sequence!",
        context: "sequence_frequency"
      },
      {
        text: "Fun fact: In the known digits of π, this pattern has a probability of {probability}% of appearing.",
        context: "probability_fact"
      },
      {
        text: "Your π-dentity position contains a rare sequence that occurs only {occurrence_rate} times in the first million digits!",
        context: "rarity_fact"
      }
    ],
  
    community: [
      {
        text: "Other π enthusiasts have found similar patterns! Would you like to see related discoveries?",
        context: "community_connection"
      },
      {
        text: "This sequence has been bookmarked by {bookmark_count} other explorers. It might be significant!",
        context: "popularity_metric"
      },
      {
        text: "You're the first to discover this particular pattern! Would you like to name it?",
        context: "unique_discovery"
      }
    ],
  
    encouragement: [
      {
        text: "Keep exploring! Every digit in π tells a story, and you're getting closer to something interesting.",
        context: "exploration_motivation"
      },
      {
        text: "Your pattern recognition skills are impressive! Have you considered joining our pattern hunting challenge?",
        context: "skill_recognition"
      },
      {
        text: "That's a unique approach to analyzing π! Would you like to share your methodology with the community?",
        context: "methodology_praise"
      }
    ],
  
    technical: [
      {
        text: "I've detected a {pattern_type} pattern in your sequence. This could indicate {implication}.",
        context: "technical_analysis"
      },
      {
        text: "Based on my calculations, this sequence has a mathematical significance of {significance_score}/10.",
        context: "significance_rating"
      },
      {
        text: "Your discovery connects to {mathematical_concept}. Should I elaborate on the relationship?",
        context: "educational_opportunity"
      }
    ]
  };
  
  // Helper functions for response generation
  const calculatePatternSignificance = (sequence) => {
    // Algorithm to determine pattern significance
    const uniqueDigits = new Set(sequence.replace(".", "")).size;
    const repetitions = sequence.length - uniqueDigits;
    return Math.min(Math.floor((repetitions * 2 + uniqueDigits) / 3), 10);
  };
  
  const analyzeSequencePattern = (sequence) => {
    return {
      type: sequence.length > 5 ? 'complex' : 'simple',
      rarity: calculatePatternSignificance(sequence) > 7 ? 'rare' : 'common',
      mathematicalProperties: sequence.includes('314') ? 'π-related' : 'general'
    };
  };
  
  // Main response generation function
  export const generateResponse = (input, context = {}) => {
    const {
      userSequence,
      userHistory,
      communityData,
      previousResponses = []
    } = context;
  
    // Analyze input for context
    const messageType = determineMessageType(input);
    const sequenceAnalysis = userSequence ? analyzeSequencePattern(userSequence) : null;
    
    // Select appropriate response category
    const category = selectResponseCategory(messageType, sequenceAnalysis);
    const templates = responseTemplates[category];
  
    // Get template and fill in dynamic content
    const template = selectTemplate(templates, previousResponses);
    return populateTemplate(template, {
      position: calculatePosition(userSequence),
      rarity: sequenceAnalysis?.rarity || 'unknown',
      analysis: generateAnalysis(sequenceAnalysis),
      ...communityData
    });
  };
  
  // Helper function to determine message type
  const determineMessageType = (input) => {
    const lowercaseInput = input.toLowerCase();
    if (lowercaseInput.includes('hello') || lowercaseInput.includes('hi')) return 'greetings';
    if (lowercaseInput.includes('pattern') || lowercaseInput.includes('found')) return 'discoveries';
    if (lowercaseInput.includes('what') || lowercaseInput.includes('how')) return 'facts';
    if (lowercaseInput.includes('community') || lowercaseInput.includes('others')) return 'community';
    if (lowercaseInput.includes('interesting') || lowercaseInput.includes('calculate')) return 'technical';
    return 'encouragement';
  };
  
  // Template selection avoiding recent responses
  const selectTemplate = (templates, previousResponses) => {
    const availableTemplates = templates.filter(t => 
      !previousResponses.includes(t.text)
    );
    return availableTemplates[Math.floor(Math.random() * availableTemplates.length)] || templates[0];
  };
  
  // Dynamic content population
  const populateTemplate = (template, data) => {
    let text = template.text;
    Object.entries(data).forEach(([key, value]) => {
      text = text.replace(`{${key}}`, value);
    });
    return {
      text,
      context: template.context,
      metadata: {
        timestamp: new Date().toISOString(),
        confidence: calculateConfidence(data)
      }
    };
  };
  
  // Export utility functions for use in other components
  export const utilities = {
    analyzeSequencePattern,
    calculatePatternSignificance,
    generateAnalysis: (analysis) => {
      if (!analysis) return "No pattern analysis available";
      return `A ${analysis.type} ${analysis.rarity} pattern with ${analysis.mathematicalProperties} properties`;
    }
  };
  
  // Export personality for consistent AI behavior
  export const personality = PITHIA_PERSONALITY;