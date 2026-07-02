import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import './global.css';
import { localeContent, site } from './site';

export const metadata: Metadata = {
  metadataBase: new URL(site.baseUrl),
  title: {
    default: 'Karel Busta - AI, app development, and agentic workflows',
    template: '%s | Karel Busta',
  },
  description:
    'Karel Busta is a software engineer from Czechia creating videos and posts about AI, agentic workflows, app development, and mobile products.',
  applicationName: 'Karel Busta',
  authors: [{ name: 'Karel Busta', url: site.englishUrl }],
  creator: 'Karel Busta',
  publisher: 'Karel Busta',
  category: 'technology',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: [{ url: '/avatar.png', type: 'image/png' }],
  },
  openGraph: {
    title: 'Karel Busta - AI, app development, and agentic workflows',
    description:
      'Software engineer from Czechia creating videos and posts about AI, agentic workflows, app development, and mobile products.',
    url: site.englishUrl,
    siteName: 'Karel Busta',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: site.englishUrl,
    languages: {
      cs: site.czechUrl,
      en: site.englishUrl,
      'x-default': site.englishUrl,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const cx = (...classes) => classes.filter(Boolean).join(' ');

const themeScript = `
(() => {
  try {
    const stored = localStorage.getItem('theme-mode') || 'system';
    const resolved = stored === 'system'
      ? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : stored;
    document.documentElement.dataset.theme = resolved;
    document.documentElement.dataset.themeMode = stored;
    document.documentElement.style.colorScheme = resolved;
  } catch {
    document.documentElement.dataset.theme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const localeHeader = headers().get('x-site-locale');
  const locale = localeHeader === 'en' ? 'en' : 'cs';
  const htmlLang = localeContent[locale].htmlLang;

  return (
    <html
      lang={htmlLang}
      suppressHydrationWarning
      className={cx(GeistSans.variable, GeistMono.variable)}
    >
      <head>
        <meta name="color-scheme" content="light dark" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
