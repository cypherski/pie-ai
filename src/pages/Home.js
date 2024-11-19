// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pi, Brain, Infinity, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EnhancedInitialLoader } from '../components/EnhancedInitialLoader';

const pageTransition = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: 0.5 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.3 }
  }
};

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [piSequence, setPiSequence] = useState("3.14159265359");
  const [currentDigit, setCurrentDigit] = useState(0);

  // Loading and sequence animation logic

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <EnhancedInitialLoader onComplete={() => setIsLoading(false)} />
      ) : (
        <motion.div
          variants={pageTransition}
          initial="initial"
          animate="animate"
          exit="exit"
          className="relative min-h-screen bg-[#020817] overflow-hidden"
        >
      π
    </motion.div>
  </motion.div>
);

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [piSequence, setPiSequence] = useState("3.14159265359");
  const [currentDigit, setCurrentDigit] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDigit(prev => (prev + 1) % piSequence.length);
    }, 300);
    return () => clearInterval(interval);
  }, [piSequence]);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <InitialLoader onComplete={() => setIsLoading(false)} />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative min-h-screen bg-[#020817] overflow-hidden"
        >
          {/* Background gradients */}
          <motion.div 
            className="fixed inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 via-blue-900/20 to-black opacity-70" />
            <motion.div 
              className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-blue-500/10 blur-3xl"
              animate={{ 
                opacity: [0.5, 0.8, 0.5],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-purple-500/10 blur-3xl"
              animate={{ 
                opacity: [0.5, 0.8, 0.5],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 4
              }}
            />
          </motion.div>

          {/* Content */}
          <div className="relative z-10">
            {/* Hero Section */}
            <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-center space-y-8 max-w-4xl mx-auto"
              >
                <div className="relative">
                  <h1 className="text-7xl md:text-8xl font-bold text-white mb-6">
                    π-FINITY
                  </h1>
                  <div className="absolute -top-12 right-0 text-blue-500 opacity-25 text-9xl font-bold">
                    π
                  </div>
                </div>

                <p className="text-2xl md:text-3xl text-blue-200">
                  Where Mathematics Meets Memes
                </p>

                {/* Animated Pi Sequence */}
                <div className="font-mono text-xl md:text-2xl text-blue-400/80 tracking-wider overflow-hidden">
                  {piSequence.split('').map((digit, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: index === currentDigit ? 1 : 0.3 }}
                      className="inline-block"
                    >
                      {digit}
                    </motion.span>
                  ))}
                </div>

                {/* CTA Buttons */}
                <motion.div 
                  className="flex flex-col md:flex-row gap-4 justify-center mt-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Link to="/explore">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-blue-600 rounded-full hover:bg-blue-700 transition-all text-white text-lg font-medium flex items-center justify-center space-x-2 group"
                    >
                      <span>Launch App</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </Link>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-purple-600/20 rounded-full hover:bg-purple-600/30 transition-all text-white text-lg font-medium"
                  >
                    Learn More
                  </motion.button>
                </motion.div>
              </motion.div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-4">
              <div className="max-w-6xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-8"
                  viewport={{ once: true }}
                >
                  <FeatureCard
                    icon={<Brain className="w-12 h-12" />}
                    title="π-THIA AI"
                    description="Interact with our AI assistant powered by infinite intelligence"
                    delay={0.2}
                  />
                  <FeatureCard
                    icon={<Infinity className="w-12 h-12" />}
                    title="Unique π-dentity"
                    description="Every wallet receives a unique position in π's infinite sequence"
                    delay={0.4}
                  />
                  <FeatureCard
                    icon={<Users className="w-12 h-12" />}
                    title="Community"
                    description="Join the irrational revolution with fellow π enthusiasts"
                    delay={0.6}
                  />
                </motion.div>
              </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 px-4 relative">
              <div className="absolute inset-0 bg-blue-900/10" />
              <div className="max-w-6xl mx-auto relative">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-1 md:grid-cols-4 gap-8"
                >
                  <StatCard value="3.14159" label="Current Price" />
                  <StatCard value="27,182" label="Holders" />
                  <StatCard value="31.4M" label="Market Cap" />
                  <StatCard value="∞" label="Potential" />
                </motion.div>
              </div>
            </section>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const FeatureCard = ({ icon, title, description, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.05 }}
    className="p-6 rounded-2xl bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-sm border border-white/5"
  >
    <div className="flex flex-col items-center text-center space-y-4">
      <motion.div 
        className="text-blue-400"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
      >
        {icon}
      </motion.div>
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <p className="text-blue-200">{description}</p>
    </div>
  </motion.div>
);

const StatCard = ({ value, label }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.05 }}
    className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm"
  >
    <div className="text-3xl font-bold text-white mb-2">{value}</div>
    <div className="text-blue-200">{label}</div>
  </motion.div>
);

export default Home;