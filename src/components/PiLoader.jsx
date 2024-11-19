import React from 'react';
import { motion } from 'framer-motion';

export default function PiLoader() {
  const piDigits = "3.14159265358979323846";
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-900 to-slate-900">
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
              className="absolute text-blue-300/80 text-sm font-mono"
              animate={{
                rotate: 360,
                transition: {
                  duration: 10 + i,
                  repeat: Infinity,
                  ease: "linear"
                }
              }}
              style={{
                transformOrigin: "center",
                left: "50%",
                top: "50%",
                translateX: "-50%",
                translateY: "-50%",
                rotate: `${(i * 360) / piDigits.length}deg`,
                radius: `${100 + i * 5}px`
              }}
            >
              <motion.span
                animate={{
                  opacity: [0.4, 1, 0.4],
                  scale: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
              >
                {digit}
              </motion.span>
            </motion.div>
          ))}
        </div>
        
        {/* Pulsing ring */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-blue-500/20 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </div>
  );
}