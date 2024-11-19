// src/pages/Explore.js
import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Search, ChevronRight, TrendingUp, Activity, BarChart3, ArrowRight } from 'lucide-react';
import { 
  pageVariants, 
  fadeInUp, 
  staggerContainer, 
  cardVariants,
  fadeIn 
} from '../utils/animations';

// Enhanced animation variants
const chartVariants = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: { 
    scaleY: 1, 
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const tabVariants = {
  inactive: { 
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    scale: 1 
  },
  active: { 
    backgroundColor: "#2563eb",
    scale: 1.05,
    transition: { type: "spring", stiffness: 300, damping: 20 }
  }
};

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('analytics');
  const [hoveredCard, setHoveredCard] = useState(null);

  // Mouse position for gradient effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (event) => {
    const { currentTarget, clientX, clientY } = event;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  // Interactive gradient background
  const gradientX = useTransform(mouseX, [0, 400], [0, 100]);
  const gradientY = useTransform(mouseY, [0, 400], [0, 100]);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="pt-24 pb-12 px-4"
      onMouseMove={handleMouseMove}
    >
      {/* Enhanced Header Section */}
      <motion.div 
        variants={staggerContainer}
        className="max-w-7xl mx-auto mb-12 relative"
      >
        <motion.div
          variants={fadeInUp}
          className="text-center space-y-4"
        >
          <motion.h1 
            className="text-5xl font-bold text-white"
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
          >
            Explore π-FINITY
          </motion.h1>
          <motion.p 
            className="text-xl text-blue-200 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Dive into the infinite possibilities of π. Analyze trends, track positions,
            and discover patterns in the endless sequence.
          </motion.p>
        </motion.div>

        {/* Enhanced Search Bar */}
        <motion.div 
          variants={fadeIn}
          className="mt-8 max-w-2xl mx-auto"
          whileHover={{ scale: 1.02 }}
        >
          <div className="relative group">
            <input
              type="text"
              placeholder="Search by position, sequence, or π-dentity..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 bg-black/30 border border-white/10 rounded-full
                text-white placeholder-blue-200/50 focus:outline-none focus:border-blue-500
                backdrop-blur-sm transition-all duration-300 group-hover:bg-black/40"
            />
            <motion.div
              className="absolute right-6 top-1/2 transform -translate-y-1/2"
              whileHover={{ scale: 1.2, rotate: 90 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Search className="text-blue-200" />
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced Navigation Tabs */}
        <motion.div 
          variants={fadeInUp}
          className="mt-12 flex justify-center space-x-4"
        >
          {['analytics', 'positions', 'patterns'].map((tab) => (
            <motion.button
              key={tab}
              variants={tabVariants}
              initial="inactive"
              animate={activeTab === tab ? "active" : "inactive"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full text-white transition-colors`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </motion.button>
          ))}
        </motion.div>
      </motion.div>

      {/* Enhanced Main Content */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={activeTab}
          variants={staggerContainer}
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          {/* Analytics Section */}
          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <StatCard
              title="Current Position"
              value="3,141,592"
              change="+5.9%"
              icon={<Activity />}
              isHovered={hoveredCard === 'position'}
              onHover={() => setHoveredCard('position')}
              onLeave={() => setHoveredCard(null)}
            />
            <StatCard
              title="Active π-dentities"
              value="27,182"
              change="+2.7%"
              icon={<TrendingUp />}
              isHovered={hoveredCard === 'identities'}
              onHover={() => setHoveredCard('identities')}
              onLeave={() => setHoveredCard(null)}
            />
            <StatCard
              title="Unique Patterns"
              value="31,415"
              change="+3.1%"
              icon={<BarChart3 />}
              isHovered={hoveredCard === 'patterns'}
              onHover={() => setHoveredCard('patterns')}
              onLeave={() => setHoveredCard(null)}
            />
          </motion.div>

          {/* Enhanced Chart Section */}
          <motion.div
            variants={chartVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-12 p-6 rounded-2xl bg-black/30 border border-white/10 backdrop-blur-sm"
            style={{
              background: `radial-gradient(circle at ${gradientX}% ${gradientY}%, rgba(59, 130, 246, 0.1) 0%, rgba(0, 0, 0, 0.3) 100%)`
            }}
          >
            <motion.h3 
              className="text-xl font-bold text-white mb-6"
              whileHover={{ x: 10 }}
            >
              Position Distribution
            </motion.h3>
            <motion.div 
              className="h-[400px] bg-black/20 rounded-xl overflow-hidden"
              whileHover={{ scale: 1.01 }}
            >
              {/* Placeholder for chart - add your chart component here */}
              <div className="w-full h-full bg-gradient-to-r from-blue-500/10 to-purple-500/10" />
            </motion.div>
          </motion.div>

          {/* Enhanced Recent Discoveries */}
          <motion.div
            variants={fadeInUp}
            className="mt-12"
          >
            <motion.h3 
              className="text-xl font-bold text-white mb-6"
              whileHover={{ x: 10 }}
            >
              Recent Discoveries
            </motion.h3>
            <motion.div
              variants={staggerContainer}
              className="space-y-4"
            >
              {[1, 2, 3].map((_, index) => (
                <DiscoveryCard 
                  key={index} 
                  delay={index * 0.1}
                  isLast={index === 2}
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

// Enhanced StatCard Component
const StatCard = ({ title, value, change, icon, isHovered, onHover, onLeave }) => (
  <motion.div
    variants={cardVariants}
    whileHover={{ 
      scale: 1.03,
      translateY: -5,
    }}
    onHoverStart={onHover}
    onHoverEnd={onLeave}
    className="p-6 rounded-2xl bg-black/30 border border-white/10 backdrop-blur-sm relative overflow-hidden"
  >
    <motion.div 
      className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"
      initial={{ opacity: 0 }}
      animate={{ opacity: isHovered ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    />
    <div className="relative z-10">
      <div className="flex justify-between items-start mb-4">
        <motion.div 
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
          className="p-2 bg-blue-600/20 rounded-lg"
        >
          {React.cloneElement(icon, { className: 'w-6 h-6 text-blue-400' })}
        </motion.div>
        <motion.span 
          className={`text-sm ${change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}
          animate={{ scale: isHovered ? 1.1 : 1 }}
        >
          {change}
        </motion.span>
      </div>
      <h4 className="text-lg text-blue-200">{title}</h4>
      <motion.p 
        className="text-2xl font-bold text-white mt-2"
        animate={{ scale: isHovered ? 1.1 : 1 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        {value}
      </motion.p>
    </div>
  </motion.div>
);

// Enhanced DiscoveryCard Component
const DiscoveryCard = ({ delay = 0, isLast }) => (
  <motion.div
    variants={cardVariants}
    whileHover={{ 
      scale: 1.02,
      x: 10,
    }}
    initial={{ opacity: 0, x: -20 }}
    animate={{ 
      opacity: 1, 
      x: 0,
      transition: { delay, duration: 0.3 }
    }}
    className="p-4 rounded-xl bg-black/20 border border-white/10 backdrop-blur-sm group"
  >
    <div className="flex justify-between items-center">
      <div>
        <h4 className="text-white font-medium">Recurring Sequence Found</h4>
        <p className="text-blue-200 text-sm mt-1">
          New pattern discovered at position 3,141,592
        </p>
      </div>
      <motion.div
        whileHover={{ x: 5 }}
        transition={{ duration: 0.2 }}
        className="flex items-center space-x-2"
      >
        <motion.span 
          initial={{ opacity: 0, width: 0 }}
          whileHover={{ opacity: 1, width: 'auto' }}
          className="text-blue-400 text-sm whitespace-nowrap"
        >
          View Details
        </motion.span>
        <ChevronRight className="text-blue-400" />
      </motion.div>
    </div>
  </motion.div>
);

export default Explore;