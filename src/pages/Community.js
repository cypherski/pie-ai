// src/pages/Community.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, MessageSquare, Calendar, Award, 
  TrendingUp, Heart, Share2, ChevronRight 
} from 'lucide-react';

const Community = () => {
  const [activeTab, setActiveTab] = useState('discussions');

  return (
    <div className="pt-24 pb-12 px-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-5xl font-bold text-white">π Community</h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Connect with fellow π enthusiasts, share discoveries, and participate
            in community events.
          </p>
        </motion.div>

        {/* Stats Overview */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Active Members"
            value="27,182"
            icon={<Users />}
            change="+12%"
          />
          <StatCard
            title="Daily Discussions"
            value="314"
            icon={<MessageSquare />}
            change="+8%"
          />
          <StatCard
            title="Upcoming Events"
            value="15"
            icon={<Calendar />}
            change="+3"
          />
        </div>

        {/* Navigation Tabs */}
        <div className="mt-12 flex justify-center space-x-4">
          {['discussions', 'events', 'leaderboard'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full transition-all ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'bg-black/30 text-blue-200 hover:bg-black/50'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {activeTab === 'discussions' && (
              <>
                <DiscussionCard
                  title="Discovered a new pattern at position 3141592"
                  author="π_Explorer"
                  replies={42}
                  likes={156}
                />
                <DiscussionCard
                  title="Mathematical properties of π in DeFi applications"
                  author="CryptoMath"
                  replies={28}
                  likes={94}
                />
                <DiscussionCard
                  title="Weekly π digit prediction contest"
                  author="GameMaster"
                  replies={156}
                  likes={273}
                />
              </>
            )}
            
            {activeTab === 'events' && (
              <>
                <EventCard
                  title="π Day Celebration"
                  date="March 14, 2025"
                  participants={314}
                  description="Join us for the biggest π celebration in the crypto space!"
                />
                <EventCard
                  title="Pattern Recognition Tournament"
                  date="Next Friday"
                  participants={159}
                  description="Compete to find unique patterns in π sequence"
                />
                <EventCard
                  title="Community AMA Session"
                  date="Tomorrow"
                  participants={265}
                  description="Live Q&A with the π-FINITY team"
                />
              </>
            )}
            
            {activeTab === 'leaderboard' && (
              <LeaderboardSection />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="p-6 rounded-2xl bg-black/30 border border-white/10 backdrop-blur-sm">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-blue-600/20 flex items-center justify-center">
                  <Users className="w-8 h-8 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold">Your π-dentity</h3>
                  <p className="text-blue-200">Connect wallet to view</p>
                </div>
              </div>
            </div>

            {/* Trending Topics */}
            <div className="p-6 rounded-2xl bg-black/30 border border-white/10 backdrop-blur-sm">
              <h3 className="text-white font-bold mb-4">Trending Topics</h3>
              <div className="space-y-3">
                {['Pattern Analysis', 'Price Discussion', 'Technical Updates'].map((topic, index) => (
                  <div key={index} className="flex items-center justify-between text-blue-200 hover:text-white cursor-pointer">
                    <span>#{topic}</span>
                    <TrendingUp className="w-4 h-4" />
                  </div>
                ))}
              </div>
            </div>

            {/* Active Members */}
            <div className="p-6 rounded-2xl bg-black/30 border border-white/10 backdrop-blur-sm">
              <h3 className="text-white font-bold mb-4">Active Members</h3>
              <div className="space-y-3">
                {['π_Explorer', 'CryptoMath', 'PatternHunter'].map((member, index) => (
                  <div key={index} className="flex items-center space-x-2 text-blue-200">
                    <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center">
                      <span className="text-sm">{member[0]}</span>
                    </div>
                    <span>{member}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Component Definitions
const StatCard = ({ title, value, icon, change }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.02 }}
    className="p-6 rounded-2xl bg-black/30 border border-white/10 backdrop-blur-sm"
  >
    <div className="flex justify-between items-start">
      <div className="p-2 bg-blue-600/20 rounded-lg">
        {React.cloneElement(icon, { className: 'w-6 h-6 text-blue-400' })}
      </div>
      <span className="text-sm text-green-400">{change}</span>
    </div>
    <h4 className="text-lg text-blue-200 mt-4">{title}</h4>
    <p className="text-2xl font-bold text-white mt-2">{value}</p>
  </motion.div>
);

const DiscussionCard = ({ title, author, replies, likes }) => (
  <motion.div
    whileHover={{ scale: 1.01 }}
    className="p-6 rounded-2xl bg-black/30 border border-white/10 backdrop-blur-sm"
  >
    <div className="flex justify-between items-start">
      <div className="space-y-2">
        <h3 className="text-white font-bold hover:text-blue-400 cursor-pointer">
          {title}
        </h3>
        <p className="text-blue-200 text-sm">Posted by {author}</p>
      </div>
      <ChevronRight className="text-blue-400" />
    </div>
    <div className="flex items-center space-x-4 mt-4 text-blue-200">
      <div className="flex items-center space-x-1">
        <MessageSquare className="w-4 h-4" />
        <span>{replies}</span>
      </div>
      <div className="flex items-center space-x-1">
        <Heart className="w-4 h-4" />
        <span>{likes}</span>
      </div>
      <div className="flex items-center space-x-1">
        <Share2 className="w-4 h-4" />
      </div>
    </div>
  </motion.div>
);

const EventCard = ({ title, date, participants, description }) => (
  <motion.div
    whileHover={{ scale: 1.01 }}
    className="p-6 rounded-2xl bg-black/30 border border-white/10 backdrop-blur-sm"
  >
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-white font-bold">{title}</h3>
        <p className="text-blue-200 text-sm mt-1">{description}</p>
      </div>
      <button className="px-4 py-2 bg-blue-600 rounded-full text-white text-sm">
        Join
      </button>
    </div>
    <div className="flex items-center space-x-4 mt-4 text-blue-200 text-sm">
      <div className="flex items-center space-x-1">
        <Calendar className="w-4 h-4" />
        <span>{date}</span>
      </div>
      <div className="flex items-center space-x-1">
        <Users className="w-4 h-4" />
        <span>{participants} participants</span>
      </div>
    </div>
  </motion.div>
);

const LeaderboardSection = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {['Weekly Top Contributors', 'All-Time Leaders'].map((title, index) => (
        <div key={index} className="p-6 rounded-2xl bg-black/30 border border-white/10 backdrop-blur-sm">
          <h3 className="text-white font-bold mb-4">{title}</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((position) => (
              <div key={position} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-lg font-bold text-blue-400">#{position}</span>
                  <span className="text-white">User_{position}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-yellow-400" />
                  <span className="text-blue-200">{3141 - (position * 314)} pts</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Community;