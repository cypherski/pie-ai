// src/components/PiDentityCard.js
import React from 'react';
import { motion } from 'framer-motion';
import { Pi, Copy, Share2 } from 'lucide-react';

export const PiDentityCard = ({ 
  piSequence = "3.14159", 
  position = "Unknown",
  rarity = "Common",
  discoveries = 0,
  onCopy,
  onShare 
}) => {
  const getRarityColor = (rarity) => {
    const colors = {
      Common: 'text-blue-400',
      Rare: 'text-purple-400',
      Epic: 'text-yellow-400',
      Legendary: 'text-red-400'
    };
    return colors[rarity] || colors.Common;
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative p-6 rounded-2xl overflow-hidden"
    >
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-sm" />
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Content */}
      <div className="relative space-y-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-2">
            <Pi className="w-6 h-6 text-blue-400" />
            <span className="text-lg font-bold text-white">π-dentity</span>
          </div>
          <span className={`text-sm font-medium ${getRarityColor(rarity)}`}>
            {rarity}
          </span>
        </div>

        {/* Sequence Display */}
        <div className="p-4 bg-black/30 rounded-xl border border-white/10">
          <div className="font-mono text-xl text-blue-200 tracking-wider overflow-x-auto">
            {piSequence}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-black/20 rounded-lg">
            <div className="text-sm text-blue-200">Position</div>
            <div className="text-white font-medium">{position}</div>
          </div>
          <div className="p-3 bg-black/20 rounded-lg">
            <div className="text-sm text-blue-200">Discoveries</div>
            <div className="text-white font-medium">{discoveries}</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <button
            onClick={onCopy}
            className="flex-1 flex items-center justify-center space-x-2 p-2 
              bg-blue-600/20 rounded-lg hover:bg-blue-600/30 transition-colors text-blue-200"
          >
            <Copy className="w-4 h-4" />
            <span>Copy</span>
          </button>
          <button
            onClick={onShare}
            className="flex-1 flex items-center justify-center space-x-2 p-2 
              bg-blue-600/20 rounded-lg hover:bg-blue-600/30 transition-colors text-blue-200"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PiDentityCard;