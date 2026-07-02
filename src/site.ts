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
    instagram: 'https://www.instagram.com/karelbusta',
    tiktok: 'https://www.tiktok.com/@karelbusta',
    github: 'https://github.com/bustakar',
    discord: 'https://discord.gg/jP659hG7',
    techStack: '/stack',
    sponsor: 'mailto:hello@karelbusta.dev?subject=Sponsorship%20inquiry',
  },
};

export const apps = [
  {
    name: 'Kinetic',
    icon: '/apps/kinetic.png',
    href: 'https://apps.apple.com/us/app/kinetic-workout-tracker/id6761449962',
  },
] as const;

// "my socials" — where I post regularly
export const socials = [
  { key: 'youtube', href: site.links.youtube, label: 'YouTube', icon: '/logos/youtube.svg' },
  { key: 'x', href: site.links.x, label: 'X', icon: '/logos/x.svg' },
  { key: 'instagram', href: site.links.instagram, label: 'Instagram', icon: '/logos/instagram.svg' },
  { key: 'tiktok', href: site.links.tiktok, label: 'TikTok', icon: '/logos/tiktok.svg' },
] as const;

export type Locale = 'cs' | 'en';
export type PageKind = 'home' | 'stack';

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

type StackContent = {
  path: string;
  url: string;
  switchHref: string;
  switchFlag: 'cz' | 'gb';
  langLabel: string;
  themeLabel: string;
  seo: { title: string; description: string };
  lines: string[];
  groups: {
    label: string;
    tools: { name: string; href?: string }[];
  }[];
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
      title: 'Karel Busta',
      description:
        'Osobní web Karla Busty, software engineera z Česka. Staví mobilní appky, sdílí praktickou práci online a vede Discord komunitu.',
    },
    intro: [
      { lines: ['Ahoj, jsem Karel,', 'software engineer z Česka'], trailing: 'avatar' },
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
      { label: 'Zajímá tě můj tech stack?', action: 'Klikni sem', href: '/stack' },
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
      title: 'Karel Busta',
      description:
        'Personal website of Karel Busta, a software engineer from Czechia building mobile apps, sharing practical work online, and running a Discord community.',
    },
    intro: [
      { lines: ['Hi, I’m Karel,', 'a software engineer from Czechia'], trailing: 'avatar' },
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
      { label: 'Curious about my tech stack?', action: 'Click here', href: '/en/stack' },
      { label: 'Want to sponsor my videos?', action: 'Click here', href: site.links.sponsor },
      { label: 'Want to chat?', action: 'Join my Discord', href: site.links.discord },
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
    lines: [
      'Můj stack je záměrně malý.',
      'Věci měním rychle, ale tyhle nástroje používám pořád.',
    ],
    groups: [
      {
        label: 'Web',
        tools: [
          { name: 'Bun', href: 'https://bun.sh' },
          { name: 'Vite', href: 'https://vite.dev' },
          { name: 'React', href: 'https://react.dev' },
          { name: 'TypeScript', href: 'https://www.typescriptlang.org' },
          { name: 'Tailwind CSS', href: 'https://tailwindcss.com' },
        ],
      },
      {
        label: 'Appky',
        tools: [
          { name: 'Swift', href: 'https://www.swift.org' },
          { name: 'SwiftUI', href: 'https://developer.apple.com/xcode/swiftui/' },
          { name: 'Xcode', href: 'https://developer.apple.com/xcode/' },
          { name: 'TestFlight', href: 'https://developer.apple.com/testflight/' },
        ],
      },
      {
        label: 'AI workflow',
        tools: [
          { name: 'Codex', href: 'https://openai.com/codex' },
          { name: 'Claude Code', href: 'https://www.anthropic.com/claude-code' },
          { name: 'Cursor', href: 'https://cursor.com' },
          { name: 'GitHub', href: site.links.github },
        ],
      },
      {
        label: 'Publikování',
        tools: [
          { name: 'YouTube', href: site.links.youtube },
          { name: 'X', href: site.links.x },
          { name: 'Instagram', href: site.links.instagram },
          { name: 'TikTok', href: site.links.tiktok },
        ],
      },
    ],
    ctas: [
      { label: 'Chceš vidět, co s tím stavím?', action: 'Zpátky domů', href: '/' },
      { label: 'Chceš pokecat o stacku?', action: 'Přidej se na Discord', href: site.links.discord },
    ],
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
    lines: [
      'My stack is intentionally small.',
      'I change things fast, but these are the tools I keep reaching for.',
    ],
    groups: [
      {
        label: 'Web',
        tools: [
          { name: 'Bun', href: 'https://bun.sh' },
          { name: 'Vite', href: 'https://vite.dev' },
          { name: 'React', href: 'https://react.dev' },
          { name: 'TypeScript', href: 'https://www.typescriptlang.org' },
          { name: 'Tailwind CSS', href: 'https://tailwindcss.com' },
        ],
      },
      {
        label: 'Apps',
        tools: [
          { name: 'Swift', href: 'https://www.swift.org' },
          { name: 'SwiftUI', href: 'https://developer.apple.com/xcode/swiftui/' },
          { name: 'Xcode', href: 'https://developer.apple.com/xcode/' },
          { name: 'TestFlight', href: 'https://developer.apple.com/testflight/' },
        ],
      },
      {
        label: 'AI workflow',
        tools: [
          { name: 'Codex', href: 'https://openai.com/codex' },
          { name: 'Claude Code', href: 'https://www.anthropic.com/claude-code' },
          { name: 'Cursor', href: 'https://cursor.com' },
          { name: 'GitHub', href: site.links.github },
        ],
      },
      {
        label: 'Publishing',
        tools: [
          { name: 'YouTube', href: site.links.youtube },
          { name: 'X', href: site.links.x },
          { name: 'Instagram', href: site.links.instagram },
          { name: 'TikTok', href: site.links.tiktok },
        ],
      },
    ],
    ctas: [
      { label: 'Want to see what I build with it?', action: 'Back home', href: '/en' },
      { label: 'Want to talk about the stack?', action: 'Join my Discord', href: site.links.discord },
    ],
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
          site.links.instagram,
          site.links.tiktok,
          site.links.github,
          site.links.discord,
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
