import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Icons from '../utils/icons';

const FeatureCard = ({ icon: Icon, title, description, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.2 }}
    whileHover={{ scale: 1.05, rotateZ: 1 }}
    className="glass-panel p-8 flex flex-col items-center transform hover:shadow-2xl transition-all duration-300"
  >
    <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }} className="relative">
      <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-75 blur" />
      <div className="relative bg-black rounded-full p-4">
        <Icon className="w-10 h-10 text-blue-400" />
      </div>
    </motion.div>
    <h3 className="text-2xl font-bold mt-6 mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
      {title}
    </h3>
    <p className="text-blue-200 text-center text-lg">{description}</p>
  </motion.div>
);

FeatureCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

const Home = () => {
  const features = [
    {
      icon: Icons.Brain,
      title: 'π-THIA AI',
      description: 'Experience intelligent conversations about π with our advanced AI assistant',
    },
    {
      icon: Icons.Infinity,
      title: 'Explore Digits',
      description: 'Dive deep into the endless sequence of π with our interactive explorer',
    },
    {
      icon: Icons.Users,
      title: 'Community',
      description: 'Connect with π enthusiasts worldwide and share your mathematical discoveries',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[calc(100vh-4rem)] py-12 px-4"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="glass-panel p-8 sm:p-12 relative overflow-hidden"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
            <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000" />
          </div>

          <div className="flex flex-col items-center text-center relative z-10">
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotateZ: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-50" />
              <Icons.Pi className="w-20 h-20 text-blue-500 relative" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl sm:text-7xl font-bold mt-8 mb-6"
            >
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Welcome to π-finity
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl sm:text-2xl text-blue-200 max-w-3xl mb-12 leading-relaxed"
            >
              Embark on a journey through the infinite digits of π. Discover patterns, unlock
              mysteries, and join a community of passionate mathematical explorers.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl mb-12">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} index={index} />
              ))}
            </div>

            <div className="flex flex-wrap gap-6 justify-center">
              <Link to="/explore">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="button-primary text-lg px-8 py-4 relative group"
                >
                  <span className="relative z-10">Start Exploring</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>
              </Link>
              <Link to="/community">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="button-secondary text-lg px-8 py-4"
                >
                  Join Community
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;
