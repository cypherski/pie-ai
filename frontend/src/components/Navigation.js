import React from 'react';
import { Link } from 'react-router-dom';
import Icons from '../utils/icons';

const Navigation = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-lg">
    <div className="max-w-7xl mx-auto px-4 py-3">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/favicon.ico" alt="π" className="w-8 h-8" />
          <span className="text-xl font-bold gradient-text">π-finity</span>
        </Link>
        
        <div className="flex items-center gap-6">
          <Link to="/explore" className="nav-link">Explore</Link>
          <Link to="/games" className="nav-link">Games</Link>
          <Link to="/community" className="nav-link">Community</Link>
          <Link to="/ai" className="nav-link">AI Chat</Link>
          
          <div className="flex items-center gap-4 ml-6 border-l border-white/10 pl-6">
            <a href="https://twitter.com/pifinity" target="_blank" rel="noopener noreferrer">
              <Icons.Twitter className="w-5 h-5 text-blue-400 hover:text-blue-300" />
            </a>
            <a href="https://t.me/pifinity" target="_blank" rel="noopener noreferrer">
              <Icons.Send className="w-5 h-5 text-blue-400 hover:text-blue-300" />
            </a>
            <a href="https://pump.fun/token/pifinity" target="_blank" rel="noopener noreferrer">
              <Icons.TrendingUp className="w-5 h-5 text-blue-400 hover:text-blue-300" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
);

export default Navigation;