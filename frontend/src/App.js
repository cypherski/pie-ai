import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from './components/AppLayout';

// Lazy load components
const Home = lazy(() => import('./components/Home'));
const Explore = lazy(() => import('./components/Explore'));
const Community = lazy(() => import('./components/Community'));
const Games = lazy(() => import('./components/Games'));
const AIChat = lazy(() => import('./components/AIChat'));
const NotFound = lazy(() => import('./components/NotFound'));

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl">π</span>
      </div>
    </div>
  </div>
);

const App = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="explore" element={<Explore />} />
          <Route path="community" element={<Community />} />
          <Route path="games" element={<Games />} />
          <Route path="ai" element={<AIChat />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;