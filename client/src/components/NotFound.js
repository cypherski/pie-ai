import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Icons from '../utils/icons';

const FunFactDisplay = ({ fact }) => (
  <motion.div
    className="mt-8 text-blue-300 text-sm px-6 py-4 glass-panel"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
  >
    <div className="flex items-center gap-2">
      <Icons.Lightbulb className="w-5 h-5 text-yellow-400" />
      <span>Fun Fact:</span>
    </div>
    <p className="mt-2">{fact}</p>
  </motion.div>
);

FunFactDisplay.propTypes = {
  fact: PropTypes.string.isRequired,
};

const EasterEgg = ({ isGenerating }) => (
  <motion.div
    className="absolute -top-4 left-1/2 transform -translate-x-1/2 -translate-y-full"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
  >
    <div className="glass-panel px-4 py-2 text-sm text-blue-200">
      {isGenerating ? 'Generating new digits...' : '3.14159265359...'}
    </div>
  </motion.div>
);

EasterEgg.propTypes = {
  isGenerating: PropTypes.bool.isRequired,
};

const BackgroundAnimation = () => (
  <div className="absolute inset-0 -z-10">
    <motion.div
      className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
      animate={{
        scale: [1, 1.2, 1],
        rotate: [0, 90, 0],
      }}
      transition={{ duration: 8, repeat: Infinity }}
    />
    <motion.div
      className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
      animate={{
        scale: [1.2, 1, 1.2],
        rotate: [90, 0, 90],
      }}
      transition={{ duration: 8, repeat: Infinity }}
    />
  </div>
);

const NotFound = () => {
  const [funFact, setFunFact] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [piAnimation, setPiAnimation] = useState(0);

  const funFacts = useMemo(
    () => [
      'The digits 404 first appear at position 1,589 in π!',
      'If you write π as a fraction, you get 355/113 as a good approximation.',
      'π Day is celebrated on March 14th (3/14) each year.',
      'The first 31.4 trillion digits of π have been calculated!',
    ],
    [],
  );

  useEffect(() => {
    setFunFact(funFacts[Math.floor(Math.random() * funFacts.length)]);
  }, [funFacts]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPiAnimation(prev => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const handlePiClick = () => {
    setShowEasterEgg(prev => !prev);
    if (!showEasterEgg) {
      setIsGenerating(true);
      setTimeout(() => setIsGenerating(false), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
    >
      <BackgroundAnimation />

      <div className="glass-panel p-12 max-w-lg w-full text-center relative">
        <motion.div
          className="inline-block cursor-pointer"
          onClick={handlePiClick}
          animate={{
            rotate: piAnimation,
            scale: showEasterEgg ? [1, 1.1, 1] : 1,
          }}
          transition={{ duration: 0.5 }}
        >
          <Icons.Pi className="w-24 h-24 text-blue-500 mx-auto" />
        </motion.div>

        <motion.h1
          className="text-5xl font-bold mb-4 gradient-text"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
        >
          404: Page Not Found
        </motion.h1>

        <motion.p className="text-blue-200 mb-8 text-lg" initial={{ y: 20 }} animate={{ y: 0 }}>
          Oops! Looks like this digit sequence hasn&apos;t been discovered in π yet...
        </motion.p>

        <div className="flex flex-col gap-4 items-center">
          <Link to="/">
            <motion.button
              className="button-primary flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icons.Home className="w-5 h-5" />
              Return to Base
            </motion.button>
          </Link>

          <Link to="/explore">
            <motion.button
              className="button-secondary flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icons.Search className="w-5 h-5" />
              Explore π Instead
            </motion.button>
          </Link>
        </div>

        <AnimatePresence>{funFact && <FunFactDisplay fact={funFact} />}</AnimatePresence>

        <AnimatePresence>
          {showEasterEgg && <EasterEgg isGenerating={isGenerating} />}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default NotFound;
