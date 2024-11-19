import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AIProvider } from './context/AIContext';
import FaviconManager from './components/FaviconManager';
import AppLayout from './layouts/AppLayout';
import EnhancedInitialLoader from './components/EnhancedInitialLoader';

// Import pages
import Home from './pages/Home';
import Explore from './pages/Explore';
import Games from './pages/Games';
import Community from './pages/Community';
import NotFound from './pages/NotFound';

function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Handle resource preloading
    const preloadResources = async () => {
      try {
        // Add any resource preloading here
        await Promise.all([
          // Preload important images
          new Promise(resolve => {
            const img = new Image();
            img.onload = resolve;
            img.src = '/logo192.png';
          }),
          // Add other resources as needed
          new Promise(resolve => setTimeout(resolve, 2000)) // Minimum loading time
        ]);
      } catch (error) {
        console.error('Error preloading resources:', error);
      }
    };

    // Progress simulation
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    preloadResources();

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return <EnhancedInitialLoader progress={progress} onComplete={() => setIsLoading(false)} />;
  }

  return (
    <AIProvider>
      <FaviconManager />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route
            path="/explore"
            element={
              <AppLayout>
                <Explore />
              </AppLayout>
            }
          />
          <Route
            path="/games"
            element={
              <AppLayout>
                <Games />
              </AppLayout>
            }
          />
          <Route
            path="/community/*"
            element={
              <AppLayout>
                <Routes>
                  <Route index element={<Community />} />
                  <Route path="leaderboard" element={<Community />} />
                  <Route path="events" element={<Community />} />
                </Routes>
              </AppLayout>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </AIProvider>
  );
}

export default App;