import type { Metadata } from 'next';

export const site = {
  name: 'Karel Busta',
  baseUrl: 'https://karelbusta.dev',
  czechUrl: 'https://karelbusta.cz',
  englishUrl: 'https://karelbusta.dev/en',
  avatarUrl: 'https://github.com/bustakar.png',
  email: 'hello@karelbusta.dev',
  links: {
    youtube: 'https://www.youtube.com/@karelbusta',
    x: 'https://x.com/karelbusta',
    github: 'https://github.com/bustakar',
    discord: 'https://discord.gg/jP659hG7',
    // TODO(karel): confirm these — tech stack + sponsor destinations
    techStack: 'https://github.com/bustakar',
    sponsor: 'mailto:hello@karelbusta.dev?subject=Sponsorship%20inquiry',
  },
};

// Apps aren't on the App Store yet — icons served locally, links point at
// landing pages. nyam is confirmed live; the other two are TODO subdomains.
export const apps = [
  { name: 'nyam nyam', icon: '/apps/nyam-nyam.png', href: 'https://nyam.karelbusta.dev' },
  { name: 'yumbucha', icon: '/apps/yumbucha.png', href: 'https://yumbucha.karelbusta.dev' }, // TODO confirm
  { name: 'pinky pact', icon: '/apps/pinky-pact.png', href: 'https://pinky.karelbusta.dev' }, // TODO confirm
] as const;

// "my socials" — where I post regularly (YouTube + X)
export const socials = [
  { key: 'youtube', href: site.links.youtube, label: 'YouTube' },
  { key: 'x', href: site.links.x, label: 'X' },
] as const;

export type Locale = 'cs' | 'en';

/** Trailing icon(s) that sit at the end of a stanza's last line. */
export type Trailing = 'avatar' | 'socials' | 'apps' | 'discord';

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
      title: 'Karel Busta — AI, appky a agentic workflows',
      description:
        'Karel Busta je software engineer z Česka. Staví mobilní appky, tráví až moc času s AI a pravidelně o tom postuje na sockách.',
    },
    intro: [
      { lines: ['Ahoj, jsem Karel, software engineer z Česka'], trailing: 'avatar' },
      {
        lines: ['Nejspíš trávím až moc času s AI', 'a pravidelně o tom postuju na sockách'],
        trailing: 'socials',
      },
      { lines: ['Taky dělám mobilní appky'], trailing: 'apps' },
      { lines: ['A mám Discord server, kde nonstop řešíme AI'], trailing: 'discord' },
    ],
    appsAlt: 'Moje appky',
    socialsAlt: 'Sociální sítě',
    ctas: [
      { label: 'Zajímá tě můj tech stack?', action: 'Klikni sem', href: site.links.techStack },
      { label: 'Chceš sponzorovat moje videa?', action: 'Klikni sem', href: site.links.sponsor },
      { label: 'Chceš pokecat?', action: 'Přidej se na Discord', href: site.links.discord },
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
      title: 'Karel Busta — AI, apps, and agentic workflows',
      description:
        'Karel Busta is a software engineer from Czechia. He builds mobile apps, spends too much time with AI, and posts about it regularly.',
    },
    intro: [
      { lines: ['Hi, I’m Karel, a software engineer from Czechia'], trailing: 'avatar' },
      {
        lines: ['I probably spend too much time with AI,', 'and I post about it regularly on my socials'],
        trailing: 'socials',
      },
      { lines: ['I also build mobile apps'], trailing: 'apps' },
      {
        lines: ['And I run a Discord server', 'where we talk about AI nonstop'],
        trailing: 'discord',
      },
    ],
    appsAlt: 'My apps',
    socialsAlt: 'My socials',
    ctas: [
      { label: 'Curious about my tech stack?', action: 'Click here', href: site.links.techStack },
      { label: 'Want to sponsor my videos?', action: 'Click here', href: site.links.sponsor },
      { label: 'Want to chat?', action: 'Join my Discord', href: site.links.discord },
    ],
  },
};

export function metadataForLocale(locale: Locale): Metadata {
  const content = localeContent[locale];
  const ogUrl = `${site.baseUrl}/og?locale=${locale}`;

  return {
    title: content.seo.title,
    description: content.seo.description,
    alternates: {
      canonical: content.url,
      languages: {
        cs: site.czechUrl,
        en: site.englishUrl,
        'x-default': site.englishUrl,
      },
    },
    openGraph: {
      title: content.seo.title,
      description: content.seo.description,
      url: content.url,
      siteName: site.name,
      locale: locale === 'cs' ? 'cs_CZ' : 'en_US',
      alternateLocale: locale === 'cs' ? 'en_US' : 'cs_CZ',
      type: 'profile',
      images: [{ url: ogUrl, width: 1200, height: 630, alt: content.seo.title }],
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@karelbusta',
      title: content.seo.title,
      description: content.seo.description,
      images: [ogUrl],
    },
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
        sameAs: [site.links.youtube, site.links.x, site.links.github, site.links.discord],
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
