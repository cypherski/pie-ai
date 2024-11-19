// tailwind.config.js
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'primary': '#3B82F6',
          'secondary': '#6B21A8',
        },
        animation: {
          'float': 'float 3s ease-in-out infinite',
        },
      },
    },
    plugins: [
      require('@tailwindcss/forms'),
    ],
  };
  
  // package.json
  {
    "name": "pi-finity",
    "version": "0.1.0",
    "private": true,
    "dependencies": {
      "@tailwindcss/forms": "^0.5.7",
      "framer-motion": "^10.16.4",
      "lucide-react": "^0.263.1",
      "react": "^18.2.0",
      "react-dom": "^18.2.0",
      "react-router-dom": "^6.18.0",
      "react-scripts": "5.0.1"
    },
    "scripts": {
      "start": "react-scripts start",
      "build": "react-scripts build",
      "test": "react-scripts test",
      "eject": "react-scripts eject"
    },
    "eslintConfig": {
      "extends": [
        "react-app",
        "react-app/jest"
      ]
    },
    "browserslist": {
      "production": [
        ">0.2%",
        "not dead",
        "not op_mini all"
      ],
      "development": [
        "last 1 chrome version",
        "last 1 firefox version",
        "last 1 safari version"
      ]
    },
    "devDependencies": {
      "autoprefixer": "^10.4.16",
      "postcss": "^8.4.31",
      "tailwindcss": "^3.3.5"
    }
  }