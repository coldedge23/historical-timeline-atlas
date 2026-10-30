import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app.js';
import './index.css';
import './interface.css';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}

