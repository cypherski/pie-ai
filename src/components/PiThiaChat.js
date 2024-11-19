// src/components/PiThiaChat.js
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, X, Send, Maximize2, Minimize2, Copy, Calculator, Share2 } from 'lucide-react';
import { useAIContext } from '../context/AIContext';
import { generateResponse, utilities } from '../utils/piThiaResponses';

export const PiThiaChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState([
    { 
      role: 'assistant',
      content: "Hello! I'm π-THIA, your guide through the infinite sequence. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [previousResponses, setPreviousResponses] = useState([]);
  const messagesEndRef = useRef(null);
  const { sendMessage, analyzeSequence, isProcessing } = useAIContext();

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle message sending
  const handleSendMessage = async () => {
    if (!input.trim() || isProcessing) return;

    const userMessage = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      // Get AI response
      const response = await sendMessage(input, {
        userHistory: messages,
        previousResponses: previousResponses
      });

      // Add typing delay for natural feel
      await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));

      const aiResponse = {
        role: 'assistant',
        content: response.text,
        timestamp: new Date(),
        metadata: response.metadata,
        analysis: response.analysis
      };

      setMessages(prev => [...prev, aiResponse]);
      setPreviousResponses(prev => [...prev, response.text].slice(-5));
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I encountered an error processing that request. Please try again.",
        timestamp: new Date(),
        error: true
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  // Handle special commands
  const handleSpecialCommands = async (text) => {
    if (text.startsWith('/analyze ')) {
      const sequence = text.replace('/analyze ', '');
      const analysis = await analyzeSequence(sequence);
      return {
        text: `Analysis Results:\n${utilities.generateAnalysis(analysis)}`,
        metadata: { type: 'analysis', data: analysis }
      };
    }
    return null;
  };

  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-20 p-4 bg-blue-600 rounded-full 
            hover:bg-blue-700 transition-colors shadow-lg"
        >
          <Brain className="h-6 w-6 text-white" />
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`fixed z-20 bg-gray-900 rounded-xl shadow-2xl border border-white/10
              transition-all duration-300 ${
                isExpanded 
                  ? 'inset-4 md:inset-20' 
                  : 'bottom-6 right-6 w-96 h-[500px]'
              }`}
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-800 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-600/20 rounded-lg">
                  <Brain className="h-5 w-5 text-blue-400" />
                </div>
                <span className="font-bold text-white">π-THIA</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  {isExpanded ? (
                    <Minimize2 className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Maximize2 className="h-4 w-4 text-gray-400" />
                  )}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="h-4 w-4 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[calc(100%-130px)]">
              {messages.map((message, index) => (
                <Message key={index} message={message} />
              ))}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="p-2 border-t border-gray-800 bg-gray-900/50">
              <div className="flex space-x-2 mb-2">
                <QuickAction
                  label="Calculate π"
                  icon={<Calculator className="w-4 h-4" />}
                  onClick={() => setInput('/analyze 3.14159')}
                />
                <QuickAction
                  label="Share Pattern"
                  icon={<Share2 className="w-4 h-4" />}
                  onClick={() => setInput('Can you analyze this pattern?')}
                />
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-800">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask π-THIA something..."
                  className="flex-1 bg-gray-800 rounded-full px-4 py-2 text-white
                    focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isProcessing || !input.trim()}
                  className={`p-2 rounded-full transition-colors ${
                    isProcessing || !input.trim()
                      ? 'bg-gray-700 text-gray-400'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Message Component
const Message = ({ message }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
  >
    <div
      className={`max-w-[80%] rounded-xl p-3 ${
        message.role === 'user'
          ? 'bg-blue-600 text-white'
          : 'bg-gray-800 text-gray-100'
      }`}
    >
      <div className="prose prose-sm text-inherit">
        {message.content}
      </div>
      {message.metadata && (
        <div className="mt-2 text-xs opacity-70">
          {message.metadata.type === 'analysis' && (
            <div className="flex items-center space-x-2">
              <Calculator className="w-3 h-3" />
              <span>Analysis Score: {message.metadata.data.significance_score}/10</span>
            </div>
          )}
        </div>
      )}
      <div className="mt-1 text-xs opacity-50">
        {new Date(message.timestamp).toLocaleTimeString()}
      </div>
    </div>
  </motion.div>
);

// Typing Indicator
const TypingIndicator = () => (
  <div className="flex justify-start">
    <div className="bg-gray-800 rounded-xl p-3 flex space-x-1">
      <motion.div
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="w-2 h-2 bg-blue-400 rounded-full"
      />
      <motion.div
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1, delay: 0.2, repeat: Infinity }}
        className="w-2 h-2 bg-blue-400 rounded-full"
      />
      <motion.div
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1, delay: 0.4, repeat: Infinity }}
        className="w-2 h-2 bg-blue-400 rounded-full"
      />
    </div>
  </div>
);

// Quick Action Button
const QuickAction = ({ label, icon, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center space-x-2 px-3 py-1.5 bg-gray-800 rounded-lg
      hover:bg-gray-700 transition-colors text-sm text-gray-300"
  >
    {icon}
    <span>{label}</span>
  </button>
);

export default PiThiaChat;