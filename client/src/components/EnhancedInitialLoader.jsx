import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const EnhancedInitialLoader = ({ progress = 0, onComplete }) => {
  // Remove initial static loader when component mounts
  useEffect(() => {
    const initialLoader = document.querySelector('.initial-loader');
    if (initialLoader) {
      initialLoader.style.opacity = '0';
      initialLoader.style.transition = 'opacity 0.5s ease';
      setTimeout(() => {
        initialLoader.remove();
      }, 500);
    }
  }, []);

  const piDigits = '3.14159265358979323846';

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-[#020817] z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onAnimationComplete={() => {
        if (progress >= 100) {
          setTimeout(onComplete, 500);
        }
      }}
    >
      <div className="relative">
        {/* Main π symbol */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-8xl font-bold text-blue-500 relative z-10"
        >
          π
        </motion.div>

        {/* Orbiting digits */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32">
          {piDigits.split('').map((digit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0.4, 1, 0.4],
                rotate: 360,
              }}
              transition={{
                opacity: {
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1,
                },
                rotate: {
                  duration: 10 + i,
                  repeat: Infinity,
                  ease: 'linear',
                },
              }}
              className="absolute text-blue-300/80 text-sm font-mono"
              style={{
                transformOrigin: 'center',
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) rotate(${(i * 360) / piDigits.length}deg) translateY(-40px)`,
              }}
            >
              {digit}
            </motion.div>
          ))}
        </div>

        {/* Progress ring */}
        <svg
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(59, 130, 246, 0.2)"
            strokeWidth="2"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(59, 130, 246, 1)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={283}
            initial={{ strokeDashoffset: 283 }}
            animate={{ strokeDashoffset: 283 - (progress * 283) / 100 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        </svg>

        {/* Status text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute top-full mt-8 left-1/2 -translate-x-1/2 text-blue-200 text-sm whitespace-nowrap"
        >
          {progress < 100
            ? `Loading π-FINITY... ${Math.round(progress)}%`
            : 'Launching into the infinite...'}
        </motion.div>
      </div>
    </motion.div>
  );
};

EnhancedInitialLoader.propTypes = {
  progress: PropTypes.number,
  onComplete: PropTypes.func.isRequired,
};

EnhancedInitialLoader.defaultProps = {
  progress: 0,
};

export default EnhancedInitialLoader;
