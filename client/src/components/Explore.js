import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import Icons from '../utils/icons';

const DigitStreamVisualization = ({ digitStream, autoScroll, setAutoScroll }) => (
  <motion.div
    className="glass-panel p-4 overflow-hidden"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-xl font-semibold">Live Digit Stream</h3>
      <motion.button
        className={`px-4 py-2 rounded-full ${autoScroll ? 'bg-blue-500' : 'bg-gray-600'}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setAutoScroll(prev => !prev)}
      >
        {autoScroll ? 'Pause Stream' : 'Start Stream'}
      </motion.button>
    </div>
    <div className="font-mono text-lg h-40 overflow-auto">
      {digitStream.split('').map((digit, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.01 }}
          className="inline-block mx-0.5"
          style={{
            color: `hsl(${(parseInt(digit) * 36) % 360}, 70%, 60%)`,
          }}
        >
          {digit}
        </motion.span>
      ))}
    </div>
  </motion.div>
);

DigitStreamVisualization.propTypes = {
  digitStream: PropTypes.string.isRequired,
  autoScroll: PropTypes.bool.isRequired,
  setAutoScroll: PropTypes.func.isRequired,
};

const PatternModal = ({ selectedPattern, showPatternModal, setShowPatternModal }) => (
  <AnimatePresence>
    {showPatternModal && selectedPattern && (
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setShowPatternModal(false)}
      >
        <motion.div
          className="glass-panel p-6 max-w-lg w-full m-4"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={e => e.stopPropagation()}
        >
          <h3 className="text-2xl font-bold mb-4 gradient-text">{selectedPattern.sequence}</h3>
          <div className="space-y-4">
            <p className="text-blue-200">{selectedPattern.description}</p>
            <p className="text-blue-300">Found at position: {selectedPattern.position}</p>
            <p className="text-blue-300">Frequency: {selectedPattern.frequency}</p>
            <p className="text-blue-200">{selectedPattern.significance}</p>
          </div>
          <motion.button
            className="button-primary mt-6"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowPatternModal(false)}
          >
            Close
          </motion.button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

PatternModal.propTypes = {
  selectedPattern: PropTypes.shape({
    sequence: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    position: PropTypes.number.isRequired,
    frequency: PropTypes.string.isRequired,
    significance: PropTypes.string.isRequired,
  }),
  showPatternModal: PropTypes.bool.isRequired,
  setShowPatternModal: PropTypes.func.isRequired,
};

PatternModal.defaultProps = {
  selectedPattern: null,
};

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVisualization, setSelectedVisualization] = useState('stream');
  const [digitStream, setDigitStream] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showPatternModal, setShowPatternModal] = useState(false);
  const [selectedPattern, setSelectedPattern] = useState(null);
  const [autoScroll, setAutoScroll] = useState(false);

  const visualizations = [
    { id: 'stream', name: 'Digit Stream', icon: Icons.Activity },
    { id: 'spiral', name: 'Pi Spiral', icon: Icons.Circle },
    { id: 'patterns', name: 'Pattern Finder', icon: Icons.Search },
    { id: 'heatmap', name: 'Digit Heatmap', icon: Icons.Grid },
    { id: '3d', name: '3D Visualization', icon: Icons.Box },
  ];

  const featuredPatterns = [
    {
      sequence: '314159',
      description: 'The first 6 digits',
      frequency: '1 occurrence',
      position: 1,
      significance: 'Opening sequence of π',
    },
    {
      sequence: '999999',
      description: 'Six nines',
      frequency: '6 occurrences',
      position: 762,
      significance: 'Longest repeating sequence of same digit',
    },
    {
      sequence: '123456',
      description: 'Sequential digits',
      frequency: '12 occurrences',
      position: 12345,
      significance: 'Natural counting sequence',
    },
  ];

  const fetchPiDigits = useCallback(async (start = 0, length = 1000) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/pi?start=${start}&length=${length}`);
      const data = await response.json();
      setDigitStream(prev => prev + data.digits);
    } catch (error) {
      console.error('Error fetching Pi digits:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPiDigits();
  }, [fetchPiDigits]);

  const handleSearch = useCallback(async () => {
    if (!searchQuery) return;
    setIsLoading(true);
    try {
      const response = await fetch(`/api/search?pattern=${searchQuery}`);
      const data = await response.json();
      setSearchResults(data.results);
    } catch (error) {
      console.error('Error searching pattern:', error);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery]);

  const handlePatternClick = pattern => {
    setSelectedPattern(pattern);
    setShowPatternModal(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto p-4 space-y-8"
    >
      <div className="glass-panel p-8">
        <motion.h1
          className="text-4xl sm:text-5xl font-bold mb-6 gradient-text text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Explore π
        </motion.h1>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search for a digit sequence..."
              className="input-field w-full pl-12"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleSearch()}
            />
            <Icons.Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
          </div>
          <motion.button
            className="button-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSearch}
            disabled={isLoading}
          >
            {isLoading ? 'Searching...' : 'Find Sequence'}
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {visualizations.map(({ id, name, icon: Icon }) => (
            <motion.button
              key={id}
              className={`p-4 rounded-xl flex items-center gap-3 transition-all ${
                selectedVisualization === id ? 'bg-blue-500/20 border-blue-500/50' : 'glass-panel'
              }`}
              onClick={() => setSelectedVisualization(id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon className="w-6 h-6 text-blue-400" />
              <span>{name}</span>
            </motion.button>
          ))}
        </div>

        <DigitStreamVisualization
          digitStream={digitStream}
          autoScroll={autoScroll}
          setAutoScroll={setAutoScroll}
        />

        <AnimatePresence>
          {searchResults.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="glass-panel p-6 mt-8"
            >
              <h2 className="text-xl font-semibold mb-4">Search Results</h2>
              <div className="space-y-2">
                {searchResults.map((result, index) => (
                  <motion.div
                    key={index}
                    className="glass-panel p-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <p className="font-mono text-xl text-blue-400">{result.sequence}</p>
                    <p className="text-sm text-blue-200">Position: {result.position}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="glass-panel p-6 mt-8">
          <h2 className="text-xl font-semibold mb-4">Featured Patterns</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredPatterns.map((pattern, index) => (
              <motion.div
                key={index}
                className="glass-panel p-4 cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => handlePatternClick(pattern)}
              >
                <div className="font-mono text-2xl text-blue-400 mb-2">{pattern.sequence}</div>
                <div className="text-sm text-blue-200">{pattern.description}</div>
                <div className="text-xs text-blue-300 mt-2">{pattern.frequency}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <PatternModal
        selectedPattern={selectedPattern}
        showPatternModal={showPatternModal}
        setShowPatternModal={setShowPatternModal}
      />
    </motion.div>
  );
};

export default Explore;
