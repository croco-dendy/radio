import React from 'react';
import ReactDOM from 'react-dom/client';
import { Showcase } from './showcase';
import './globals.css';

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Showcase />
    </React.StrictMode>,
  );
} else {
  throw new Error("Root element with id 'root' not found");
}
