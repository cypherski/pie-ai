import { useEffect } from 'react';

const FaviconManager = () => {
  useEffect(() => {
    // Create link elements for different favicon sizes
    const favicons = [
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: '/assets/icons/favicon.svg',
        sizes: 'any'
      },
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: '/assets/icons/favicon-small.svg',
        sizes: '32x32'
      },
      {
        rel: 'alternate icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
    ];

    // Remove existing favicons
    const existingFavicons = document.querySelectorAll('link[rel*="icon"]');
    existingFavicons.forEach(favicon => favicon.remove());

    // Add new favicons
    favicons.forEach(favicon => {
      const link = document.createElement('link');
      Object.entries(favicon).forEach(([key, value]) => {
        link[key] = value;
      });
      document.head.appendChild(link);
    });

    // Update title with pi symbol
    document.title = 'π π-FINITY | Mathematical Discoveries';
  }, []);

  return null;
};

export default FaviconManager;