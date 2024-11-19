import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Outlet } from 'react-router-dom';
import { loadingService } from '../services/loadingService';
import Navigation from './Navigation';
import EnhancedInitialLoader from './EnhancedInitialLoader';
import LoadingScreen from './LoadingScreen';
import FaviconManager from './FaviconManager';

export default function AppLayout() {
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
        ) : loadingState.loading ? (
          <LoadingScreen />
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
}
