import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { hydrateRoot } from 'react-dom/client';
import { App, routeForPath } from './App';
import { initializeAnalytics } from './analytics';
import './global.css';

void initializeAnalytics();

hydrateRoot(
  document.getElementById('root')!,
  <>
    <App route={routeForPath(window.location.pathname)} />
    <Analytics />
    <SpeedInsights />
  </>,
);
