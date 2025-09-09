import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from '@tanstack/react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import router from './router';
import { queryClient } from './services/api';
import {
  NotificationContainer,
  GlobalLoadingIndicator,
  ConnectionStatus,
} from './components/ui';

// Import styles and fonts
import './styles/index';
import '@fontsource/tiny5';
import '@fontsource/ponomar';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

createRoot(rootElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <NotificationContainer />
      <GlobalLoadingIndicator />
      <ConnectionStatus />
    </QueryClientProvider>
  </StrictMode>,
);
