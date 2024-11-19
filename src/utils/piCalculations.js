// src/utils/piCalculations.js

// Spigot algorithm for generating π digits
export class PiGenerator {
  constructor() {
    this.digits = [];
    this.q = 1n;
    this.r = 180n;
    this.t = 60n;
    this.i = 2n;
  }

  // Generate next digit of π
  nextDigit() {
    while (this.digits.length < 1000) { // Buffer size
      this.u = 3n * (3n * this.i + 1n) * (3n * this.i + 2n);
      this.y = (this.q * (27n * this.i - 12n) + 5n * this.r) / (5n * this.t);
      
      this.digits.push(Number(this.y));
      
      this.r = 10n * (this.q * (3n * this.i + 1n) * (3n * this.i + 2n) - this.t * this.y);
      this.q = this.q * this.i * (2n * this.i - 1n);
      this.t = this.t * this.u;
      this.i = this.i + 1n;
    }
    return this.digits.shift();
  }

  // Get a sequence of π digits
  getSequence(start, length) {
    if (start === 0) {
      return "3." + Array.from({ length: length - 2 }, () => this.nextDigit()).join('');
    }
    return Array.from({ length }, () => this.nextDigit()).join('');
  }
}

// Create and cache a single instance
const piGenerator = new PiGenerator();

// Utility functions for π calculations
export const piUtils = {
  // Get π sequence starting from a position
  getSequence(position, length = 10) {
    return piGenerator.getSequence(position, length);
  },

  // Calculate rarity of a sequence
  calculateRarity(sequence) {
    const uniqueDigits = new Set(sequence.replace(".", "")).size;
    const repetitions = sequence.length - uniqueDigits;
    
    if (repetitions >= 4) return "Legendary";
    if (repetitions >= 3) return "Epic";
    if (repetitions >= 2) return "Rare";
    return "Common";
  },

  // Find patterns in a sequence
  findPatterns(sequence) {
    const patterns = [];
    const cleanSequence = sequence.replace(".", "");
    
    // Look for repeating digits
    for (let i = 0; i < cleanSequence.length - 1; i++) {
      if (cleanSequence[i] === cleanSequence[i + 1]) {
        patterns.push({
          type: "repeat",
          digits: cleanSequence[i],
          position: i
        });
      }
    }
    
    // Look for ascending/descending sequences
    for (let i = 0; i < cleanSequence.length - 2; i++) {
      const curr = parseInt(cleanSequence[i]);
      const next = parseInt(cleanSequence[i + 1]);
      const nextNext = parseInt(cleanSequence[i + 2]);
      
      if (next === curr + 1 && nextNext === next + 1) {
        patterns.push({
          type: "ascending",
          digits: cleanSequence.slice(i, i + 3),
          position: i
        });
      }
      
      if (next === curr - 1 && nextNext === next - 1) {
        patterns.push({
          type: "descending",
          digits: cleanSequence.slice(i, i + 3),
          position: i
        });
      }
    }
    
    return patterns;
  },

  // Generate a unique π-dentity for a user
  generatePiDentity() {
    const position = Math.floor(Math.random() * 1000000);
    const sequence = this.getSequence(position, 15);
    const rarity = this.calculateRarity(sequence);
    const patterns = this.findPatterns(sequence);
    
    return {
      sequence,
      position,
      rarity,
      patterns,
      score: patterns.length * 100 + (sequence.length - new Set(sequence).size) * 200
    };
  },

  // Analyze a given sequence
  analyzeSequence(sequence) {
    return {
      rarity: this.calculateRarity(sequence),
      patterns: this.findPatterns(sequence),
      uniqueDigits: new Set(sequence.replace(".", "")).size,
      length: sequence.replace(".", "").length
    };
  },

  // Check if a sequence exists in π
  validateSequence(sequence) {
    // Generate enough digits to verify the sequence
    const searchSpace = this.getSequence(0, 1000);
    return searchSpace.includes(sequence);
  }
};

// Convenience exports
export const {
  getSequence,
  calculateRarity,
  findPatterns,
  generatePiDentity,
  analyzeSequence,
  validateSequence
} = piUtils;