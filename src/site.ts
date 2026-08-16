export const site = {
  name: 'Karel Busta',
  baseUrl: 'https://karelbusta.dev',
  czechUrl: 'https://karelbusta.cz',
  englishUrl: 'https://karelbusta.dev',
  avatarUrl: '/avatar.webp',
  email: 'hello@karelbusta.dev',
  links: {
    youtube: 'https://www.youtube.com/@karelbusta',
    x: 'https://x.com/karelbusta',
    github: 'https://github.com/bustakar',
  },
};

export const apps = [
  {
    name: 'Kinetic',
    icon: '/apps/kinetic.webp',
    href: 'https://kinetic.karelbusta.dev',
  },
] as const;

// "my socials" — where I post regularly
export const socials = [
  { key: 'youtube', href: site.links.youtube, label: 'YouTube' },
  { key: 'x', href: site.links.x, label: 'X' },
  { key: 'github', href: site.links.github, label: 'GitHub' },
] as const;

export type Locale = 'cs' | 'en';

type LocaleContent = {
  code: Locale;
  htmlLang: string;
  path: string;
  url: string;
  switchHref: string;
  switchFlag: 'cz' | 'gb';
  langLabel: string;
  themeLabel: string;
  seo: { title: string; description: string };
};

export const localeContent: Record<Locale, LocaleContent> = {
  cs: {
    code: 'cs',
    htmlLang: 'cs',
    path: '/cs',
    url: site.czechUrl,
    switchHref: site.englishUrl,
    switchFlag: 'gb',
    langLabel: 'Přepnout do angličtiny',
    themeLabel: 'Přepnout barevný režim',
    seo: {
      title: 'Karel Busta',
      description:
        'Osobní web Karla Busty, software engineera z Česka. Staví mobilní appky a sdílí praktickou práci online.',
    },
  },
  en: {
    code: 'en',
    htmlLang: 'en',
    path: '/',
    url: site.englishUrl,
    switchHref: site.czechUrl,
    switchFlag: 'cz',
    langLabel: 'Switch to Czech',
    themeLabel: 'Change color theme',
    seo: {
      title: 'Karel Busta',
      description:
        'Personal website of Karel Busta, a software engineer from Czechia building mobile apps and sharing practical work online.',
    },
  },
};

export type SeoMetadata = {
  title: string;
  description: string;
  canonical: string;
  locale: string;
  alternateLocale: string;
  ogImage: string;
};

export function metadataForLocale(locale: Locale): SeoMetadata {
  const content = localeContent[locale];
  const ogUrl = `${site.baseUrl}/og-${locale}.png`;

  return {
    title: content.seo.title,
    description: content.seo.description,
    canonical: content.url,
    locale: locale === 'cs' ? 'cs_CZ' : 'en_US',
    alternateLocale: locale === 'cs' ? 'en_US' : 'cs_CZ',
    ogImage: ogUrl,
  };
}

export function personJsonLd(locale: Locale) {
  const content = localeContent[locale];

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${site.baseUrl}/#person`,
        name: site.name,
        url: content.url,
        image: `${site.baseUrl}${site.avatarUrl}`,
        email: `mailto:${site.email}`,
        jobTitle: locale === 'cs' ? 'Software engineer' : 'Software Engineer',
        nationality: 'Czech',
        inLanguage: content.htmlLang,
        knowsAbout: [
          'AI',
          'Agentic workflows',
          'App development',
          'iOS development',
          'Swift',
          'SwiftUI',
          'Mobile apps',
        ],
        sameAs: [
          site.links.youtube,
          site.links.x,
          site.links.github,
        ],
      },
      ...apps.map((app) => ({
        '@type': 'SoftwareApplication',
        name: app.name,
        applicationCategory: 'MobileApplication',
        operatingSystem: 'iOS',
        url: app.href,
        author: { '@id': `${site.baseUrl}/#person` },
      })),
    ],
  };
}
