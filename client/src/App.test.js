import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom'; // Add this import
import App from './App';

// Using jest globals
/* global describe, test, expect */

describe('App Component', () => {
  test('renders app component', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const titleElement = screen.getByText(/π-finity/i);
    expect(titleElement).toBeInTheDocument();
  });
});
