// src/pages/Games.js
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Timer, Users, Star, ChevronRight, Lock } from 'lucide-react';

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3 }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { duration: 0.2 }
  }
};

const Games = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="pt-24 pb-12 px-4"
    >
          <h1 className="text-5xl font-bold text-white">π Games</h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Challenge yourself with π-based games and earn rewards while exploring
            the infinite sequence.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="mt-8 flex justify-center flex-wrap gap-4">
          {['all', 'puzzle', 'memory', 'speed', 'multiplayer'].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full transition-all ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-black/30 text-blue-200 hover:bg-black/50'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Games Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <GameCard
            title="π Pattern Match"
            description="Match patterns in the infinite sequence against the clock"
            players="1-4"
            time="5 min"
            difficulty="Medium"
          />
          <GameCard
            title="Sequence Memory"
            description="Remember and reproduce π sequences of increasing length"
            players="1"
            time="10 min"
            difficulty="Hard"
          />
          <GameCard
            title="Speed Digits"
            description="Type the digits of π as fast as you can"
            players="1-8"
            time="3 min"
            difficulty="Easy"
          />
          {/* Add more game cards */}
        </div>

        {/* Leaderboard Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-6">Top Players</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <LeaderboardCard title="Daily Champions" />
            <LeaderboardCard title="All-Time Leaders" />
          </div>
        </div>
      </div>
    </div>
  );
};

const GameCard = ({ title, description, players, time, difficulty, locked = false }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="relative rounded-2xl overflow-hidden group"
  >
    {/* Background with gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-sm" />
    
    <div className="relative p-6 space-y-4">
      {locked && (
        <div className="absolute top-4 right-4">
          <Lock className="text-blue-400" />
        </div>
      )}
      
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <p className="text-blue-200">{description}</p>
      
      <div className="flex items-center space-x-4 text-sm text-blue-200">
        <div className="flex items-center">
          <Users className="w-4 h-4 mr-1" />
          {players}
        </div>
        <div className="flex items-center">
          <Timer className="w-4 h-4 mr-1" />
          {time}
        </div>
        <div className="flex items-center">
          <Star className="w-4 h-4 mr-1" />
          {difficulty}
        </div>
      </div>
      
      <button className="mt-4 w-full py-2 bg-blue-600 rounded-lg text-white font-medium
        hover:bg-blue-700 transition-colors">
        Play Now
      </button>
    </div>
  </motion.div>
);

const LeaderboardCard = ({ title }) => (
  <div className="p-6 rounded-2xl bg-black/30 border border-white/10 backdrop-blur-sm">
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center space-x-2">
        <Trophy className="w-5 h-5 text-yellow-400" />
        <h3 className="text-lg font-bold text-white">{title}</h3>
      </div>
      <button className="text-blue-400 hover:text-blue-300">
        View All
      </button>
    </div>
    
    <div className="space-y-4">
      {[1, 2, 3].map((position) => (
        <div key={position} className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-lg font-bold text-blue-200">#{position}</span>
            <div className="text-white">Player_{position}</div>
          </div>
          <div className="text-blue-200">31,415 pts</div>
        </div>
      ))}
    </div>
  </div>
);

export default Games;