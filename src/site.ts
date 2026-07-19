export const site = {
  name: 'Karel Busta',
  baseUrl: 'https://karelbusta.dev',
  czechUrl: 'https://karelbusta.cz',
  englishUrl: 'https://karelbusta.dev/en',
  avatarUrl: '/avatar.png',
  email: 'hello@karelbusta.dev',
  links: {
    youtube: 'https://www.youtube.com/@karelbusta',
    x: 'https://x.com/karelbusta',
    github: 'https://github.com/bustakar',
    techStack: '/stack',
    sponsor: 'mailto:hello@karelbusta.dev?subject=Sponsorship%20inquiry',
  },
};

export const apps = [
  {
    name: 'Kinetic',
    icon: '/apps/kinetic.png',
    href: 'https://apps.apple.com/app/id6761044285',
  },
] as const;

// "my socials" — where I post regularly
export const socials = [
  { key: 'youtube', href: site.links.youtube, label: 'YouTube', icon: '/logos/youtube.svg' },
  { key: 'x', href: site.links.x, label: 'X', icon: '/logos/x.svg' },
] as const;

export type Locale = 'cs' | 'en';
export type PageKind = 'home' | 'stack';

/** Trailing icon(s) that sit at the end of a stanza's last line. */
export type Trailing = 'avatar' | 'socials' | 'apps';

/** A stanza: one or more soft-broken text lines, then a trailing icon slot. */
export type Stanza = { lines: string[]; trailing: Trailing };

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
  intro: Stanza[];
  appsAlt: string;
  socialsAlt: string;
  ctas: { label: string; action: string; href: string }[];
};

type StackContent = {
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
    path: '/',
    url: site.czechUrl,
    switchHref: '/en',
    switchFlag: 'gb',
    langLabel: 'Přepnout do angličtiny',
    themeLabel: 'Přepnout barevný režim',
    seo: {
      title: 'Karel Busta',
      description:
        'Osobní web Karla Busty, software engineera z Česka. Staví mobilní appky a sdílí praktickou práci online.',
    },
    intro: [
      { lines: ['Ahoj, jsem Karel, software engineer z Česka'], trailing: 'avatar' },
      {
        lines: ['Nejspíš trávím až moc času s AI', 'a pravidelně o tom postuju na sockách'],
        trailing: 'socials',
      },
      { lines: ['Taky dělám mobilní appky'], trailing: 'apps' },
    ],
    appsAlt: 'Moje appky',
    socialsAlt: 'Sociální sítě',
    ctas: [
      { label: 'Zajímá tě můj tech stack?', action: 'Klikni sem', href: '/stack' },
      { label: 'Chceš sponzorovat moje videa?', action: 'Klikni sem', href: site.links.sponsor },
    ],
  },
  en: {
    code: 'en',
    htmlLang: 'en',
    path: '/en',
    url: site.englishUrl,
    switchHref: '/',
    switchFlag: 'cz',
    langLabel: 'Switch to Czech',
    themeLabel: 'Change color theme',
    seo: {
      title: 'Karel Busta',
      description:
        'Personal website of Karel Busta, a software engineer from Czechia building mobile apps and sharing practical work online.',
    },
    intro: [
      { lines: ['Hi, I’m Karel, a software engineer from Czechia'], trailing: 'avatar' },
      {
        lines: ['I probably spend too much time with AI,', 'and I post about it regularly on my socials'],
        trailing: 'socials',
      },
      { lines: ['I also build mobile apps'], trailing: 'apps' },
    ],
    appsAlt: 'My apps',
    socialsAlt: 'My socials',
    ctas: [
      { label: 'Curious about my tech stack?', action: 'Click here', href: '/en/stack' },
      { label: 'Want to sponsor my videos?', action: 'Click here', href: site.links.sponsor },
    ],
  },
};

export const stackContent: Record<Locale, StackContent> = {
  cs: {
    path: '/stack',
    url: `${site.czechUrl}/stack`,
    switchHref: '/en/stack',
    switchFlag: 'gb',
    langLabel: 'Přepnout do angličtiny',
    themeLabel: 'Přepnout barevný režim',
    seo: {
      title: site.name,
      description:
        'Tech stack Karla Busty: nástroje pro web, iOS, AI workflow, design a publikování.',
    },
  },
  en: {
    path: '/en/stack',
    url: `${site.baseUrl}/en/stack`,
    switchHref: '/stack',
    switchFlag: 'cz',
    langLabel: 'Switch to Czech',
    themeLabel: 'Change color theme',
    seo: {
      title: site.name,
      description:
        'Karel Busta tech stack: tools for web, iOS, AI workflow, design, and publishing.',
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

export function metadataForPage(locale: Locale, page: PageKind): SeoMetadata {
  const content = page === 'stack' ? stackContent[locale] : localeContent[locale];
  const ogUrl = `${site.baseUrl}/og-${locale}.svg`;

  return {
    title: content.seo.title,
    description: content.seo.description,
    canonical: content.url,
    locale: locale === 'cs' ? 'cs_CZ' : 'en_US',
    alternateLocale: locale === 'cs' ? 'en_US' : 'cs_CZ',
    ogImage: ogUrl,
  };
}

export function metadataForLocale(locale: Locale): SeoMetadata {
  return metadataForPage(locale, 'home');
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
        image: site.avatarUrl,
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
