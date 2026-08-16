import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { hydrateRoot } from 'react-dom/client';
import { App, routeForPath } from './App';
import './global.css';

const route = routeForPath(window.location.pathname, window.location.hostname);
document.documentElement.lang = route.locale === 'cs' ? 'cs' : 'en';

hydrateRoot(
  document.getElementById('root')!,
  <>
    <App route={route} />
    <Analytics />
    <SpeedInsights />
  </>,
);
