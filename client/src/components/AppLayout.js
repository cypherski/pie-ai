import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Outlet } from 'react-router-dom';
import { loadingService } from '../services/loadingService';
import EnhancedInitialLoader from './EnhancedInitialLoader';
import FaviconManager from './FaviconManager';
import Icons from '../utils/icons';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="glass-panel sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Icons.Pi className="w-8 h-8 text-blue-500" />
          <span className="ml-2 text-xl font-bold gradient-text">π-finity</span>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <Icons.X className="h-6 w-6 text-white" />
          ) : (
            <Icons.Menu className="h-6 w-6 text-white" />
          )}
        </button>

        {/* Desktop navigation */}
        <div className="hidden md:flex space-x-8">
          <a href="/" className="nav-link">
            Home
          </a>
          <a href="/explore" className="nav-link">
            Explore
          </a>
          <a href="/games" className="nav-link">
            Games
          </a>
          <a href="/community" className="nav-link">
            Community
          </a>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-panel mt-2 mx-4 rounded-lg overflow-hidden"
          >
            <div className="px-4 py-2 space-y-2">
              <a href="/" className="nav-link block py-2">
                Home
              </a>
              <a href="/explore" className="nav-link block py-2">
                Explore
              </a>
              <a href="/games" className="nav-link block py-2">
                Games
              </a>
              <a href="/community" className="nav-link block py-2">
                Community
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const AppLayout = () => {
  const [loadingState, setLoadingState] = useState({
    initial: true,
    loading: true,
    progress: 0,
  });

  useEffect(() => {
    const loadingSub = loadingService.onLoadingStateChange(state => {
      if (state.type === 'INITIAL_LOAD_START') {
        setLoadingState(prev => ({ ...prev, initial: true, loading: true }));
      } else if (state.type === 'INITIAL_LOAD_COMPLETE') {
        setLoadingState(prev => ({ ...prev, initial: false, loading: false }));
      }
    });

    const progressSub = loadingService.onProgressChange(progress => {
      setLoadingState(prev => ({ ...prev, progress: progress * 100 }));
    });

    loadingService.startInitialLoad();

    return () => {
      loadingSub.unsubscribe();
      progressSub.unsubscribe();
    };
  }, []);

  return (
    <>
      <FaviconManager />

      <AnimatePresence mode="wait">
        {loadingState.initial ? (
          <EnhancedInitialLoader
            progress={loadingState.progress}
            onComplete={() => setLoadingState(prev => ({ ...prev, initial: false }))}
          />
        ) : (
          <motion.div
            className="min-h-screen bg-[#020817] text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Navigation />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <Outlet />
            </main>

            <footer className="glass-panel mt-auto py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-blue-200">
                <p>
                  &copy; {new Date().getFullYear()} π-FINITY. Exploring the infinite possibilities
                  of π.
                </p>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AppLayout;
