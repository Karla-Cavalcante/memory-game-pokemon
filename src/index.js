import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import MemoryGame from './MemoryGame';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MemoryGame />
  </React.StrictMode>
);
