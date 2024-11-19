import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icons from '../utils/icons';

const Profile = ({ user, isExpanded, onToggle }) => {
  const achievementIcons = {
    explorer: Icons.Compass,
    contributor: Icons.Users,
    mathematician: Icons.Brain,
    developer: Icons.Code,
  };

  return (
    <motion.div
      className="glass-panel p-6 relative overflow-hidden"
      whileHover={{ scale: 1.02 }}
      onClick={onToggle}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="flex items-start gap-4 relative">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-2xl">
          {user.avatar}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-1">{user.name}</h3>
          <p className="text-blue-300 text-sm mb-2">
            Level {user.level} · {user.rank}
          </p>
          <div className="flex gap-2 mb-2">
            {user.achievements.map((achievement, index) => {
              const Icon = achievementIcons[achievement.type] || Icons.Star;
              return (
                <motion.div
                  key={index}
                  className="w-6 h-6 text-yellow-400"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  title={achievement.name}
                >
                  <Icon />
                </motion.div>
              );
            })}
          </div>
        </div>
        <motion.button className="text-blue-400" animate={{ rotate: isExpanded ? 180 : 0 }}>
          <Icons.ChevronDown />
        </motion.button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-4 pt-4 border-t border-white/10"
          >
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{user.discoveries}</div>
                <div className="text-sm text-blue-200">Discoveries</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{user.contributions}</div>
                <div className="text-sm text-blue-200">Contributions</div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold mb-2">Recent Activity</h4>
              {user.recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-sm text-blue-200 flex items-center gap-2"
                >
                  <activity.icon className="w-4 h-4 text-blue-400" />
                  <span>{activity.description}</span>
                  <span className="text-blue-300 ml-auto">{activity.time}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const DiscoveryCard = ({ discovery, onVote, onComment }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [newComment, setNewComment] = useState('');

  return (
    <motion.div
      className="glass-panel p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-start gap-3 mb-4">
        <div className="text-2xl">{discovery.avatar}</div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold">{discovery.user}</span>
            <span className="text-blue-300 text-sm">{discovery.timestamp}</span>
          </div>
          <p className="text-blue-200 mt-2">{discovery.discovery}</p>
          {discovery.sequence && (
            <div className="mt-2 p-2 bg-blue-500/10 rounded-lg font-mono">{discovery.sequence}</div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm text-blue-300">
        <motion.button
          className="flex items-center gap-1 hover:text-blue-400 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onVote(discovery.id)}
        >
          <Icons.Heart className={`w-4 h-4 ${discovery.hasVoted ? 'text-red-400' : ''}`} />
          {discovery.likes}
        </motion.button>
        <motion.button
          className="flex items-center gap-1 hover:text-blue-400 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Icons.MessageCircle className="w-4 h-4" />
          {discovery.comments.length} Comments
        </motion.button>
        <motion.button
          className="flex items-center gap-1 hover:text-blue-400 transition-colors ml-auto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Icons.Share2 className="w-4 h-4" />
          Share
        </motion.button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-4 pt-4 border-t border-white/10"
          >
            <div className="space-y-4">
              {discovery.comments.map((comment, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-3"
                >
                  <div className="text-xl">{comment.avatar}</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{comment.user}</span>
                      <span className="text-blue-300 text-sm">{comment.timestamp}</span>
                    </div>
                    <p className="text-blue-200 text-sm mt-1">{comment.text}</p>
                  </div>
                </motion.div>
              ))}

              <div className="flex gap-3 mt-4">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="input-field flex-1"
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && onComment(discovery.id, newComment)}
                />
                <motion.button
                  className="button-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onComment(discovery.id, newComment)}
                >
                  Post
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Community = () => {
  // ... State and handlers remain the same ...

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
          π Community
        </motion.h1>

        <div className="flex flex-wrap gap-4 justify-center mb-8">
          {tabs.map(tab => (
            <motion.button
              key={tab.id}
              className={`px-6 py-3 rounded-full flex items-center gap-2 ${
                activeTab === tab.id ? 'bg-blue-500' : 'glass-panel'
              }`}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <tab.icon className="w-5 h-5" />
              {tab.name}
            </motion.button>
          ))}
        </div>

        {activeTab === 'feed' && (
          <div className="space-y-6">
            <motion.button
              className="button-primary w-full"
              onClick={() => setShowNewPostModal(true)}
              whileHover={{ scale: 1.02 }}
            >
              Share a Discovery
            </motion.button>
            {discoveries.map(discovery => (
              <DiscoveryCard
                key={discovery.id}
                discovery={discovery}
                onVote={handleVote}
                onComment={handleComment}
              />
            ))}
          </div>
        )}

        {activeTab === 'members' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {users.map((user, index) => (
              <Profile
                key={index}
                user={user}
                isExpanded={expandedProfile === index}
                onToggle={() => setExpandedProfile(expandedProfile === index ? null : index)}
              />
            ))}
          </div>
        )}

        {activeTab === 'challenges' && (
          <div className="space-y-6">{/* Add challenges content */}</div>
        )}
      </div>

      <AnimatePresence>
        {showNewPostModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowNewPostModal(false)}
          >
            <motion.div
              className="glass-panel p-6 max-w-lg w-full"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4">Share a Discovery</h2>
              <textarea
                className="input-field w-full h-32 mb-4"
                placeholder="Describe your discovery..."
                value={newPost}
                onChange={e => setNewPost(e.target.value)}
              />
              <div className="flex justify-end gap-4">
                <motion.button
                  className="button-secondary"
                  onClick={() => setShowNewPostModal(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  className="button-primary"
                  onClick={handleNewPost}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Post Discovery
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Community;
