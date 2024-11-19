import { PiGenerator, piUtils } from '../utils/piCalculations';
import config from '../config/environment';
import { aiService } from './aiService';

class PiService {
  constructor() {
    this.generator = new PiGenerator();
    this.cache = new Map();
    this.analysisQueue = [];
    this.isProcessing = false;
  }

  async getSequence(start, length) {
    const cacheKey = `${start}-${length}`;
    
    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (Date.now() - cached.timestamp < config.services.pi.maxCacheSize) {
        return cached.data;
      }
      this.cache.delete(cacheKey);
    }

    const sequence = this.generator.getSequence(start, length);
    this.cache.set(cacheKey, {
      data: sequence,
      timestamp: Date.now()
    });

    return sequence;
  }

  async analyzeSequenceWithAI(sequence) {
    try {
      const patterns = piUtils.findPatterns(sequence);
      const rarity = piUtils.calculateRarity(sequence);
      const analysisPromise = aiService.analyzePiSequence(sequence);
      this.analysisQueue.push(analysisPromise);

      if (!this.isProcessing) {
        await this.processAnalysisQueue();
      }

      const aiAnalysis = await analysisPromise;

      return {
        sequence,
        patterns,
        rarity,
        aiAnalysis,
        score: this.calculateScore(patterns, rarity, aiAnalysis)
      };
    } catch (error) {
      console.error('Analysis error:', error);
      return {
        sequence,
        patterns: piUtils.findPatterns(sequence),
        rarity: piUtils.calculateRarity(sequence),
        error: 'AI analysis unavailable'
      };
    }
  }

  async processAnalysisQueue() {
    if (this.isProcessing || this.analysisQueue.length === 0) return;
    
    this.isProcessing = true;
    while (this.analysisQueue.length > 0) {
      const batch = this.analysisQueue.splice(0, 5);
      await Promise.all(batch);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    this.isProcessing = false;
  }

  calculateScore(patterns, rarity, aiAnalysis) {
    let score = 0;
    
    // Pattern score
    score += patterns.length * 100;
    
    // Rarity score
    const rarityScores = {
      'Legendary': 1000,
      'Epic': 500,
      'Rare': 250,
      'Common': 100
    };
    score += rarityScores[rarity] || 0;
    
    // AI analysis score
    if (aiAnalysis?.significance_score) {
      score += aiAnalysis.significance_score * 100;
    }
    
    return score;
  }

  // Generate π-dentity with integrated analysis
  async generatePiDentity() {
    const position = Math.floor(Math.random() * config.MAX_PI_DIGITS);
    const sequence = await this.getSequence(position, 15);
    const analysis = await this.analyzeSequenceWithAI(sequence);
    
    return {
      ...analysis,
      position,
      timestamp: Date.now()
    };
  }

  // Clear old cache entries
  cleanCache() {
    const now = Date.now();
    for (const [key, value] of this.cache.entries()) {
      if (now - value.timestamp > config.services.pi.maxCacheSize) {
        this.cache.delete(key);
      }
    }
  }

  // Get cache stats
  getCacheStats() {
    return {
      size: this.cache.size,
      entries: Array.from(this.cache.keys())
    };
  }
}

export const piService = new PiService();
export default piService;