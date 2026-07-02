import {
  siGhostty,
  siGithub,
  siHelium,
  siPosthog,
  siSentry,
  siSwift,
  siVercel,
  type SimpleIcon,
} from 'simple-icons';
import { stackContent, type Locale } from '../site';
import { Flag } from './personal-home';
import { ThemeToggle } from './theme-toggle';

type StackIcon =
  | { kind: 'simple'; label: string; icon: SimpleIcon; href?: string }
  | { kind: 'path'; label: string; path: string; href?: string }
  | { kind: 'image'; label: string; src: string; href?: string };

const claudeCodePath =
  'M20.998 10.949H24v3.102h-3v3.028h-1.487V20H18v-2.921h-1.487V20H15v-2.921H9V20H7.488v-2.921H6V20H4.487v-2.921H3V14.05H0V10.95h3V5h17.998v5.949zM6 10.949h1.488V8.102H6v2.847zm10.51 0H18V8.102h-1.49v2.847z';

const codexPath =
  'M8.086.457a6.105 6.105 0 013.046-.415c1.333.153 2.521.72 3.564 1.7a.117.117 0 00.107.029c1.408-.346 2.762-.224 4.061.366l.063.03.154.076c1.357.703 2.33 1.77 2.918 3.198.278.679.418 1.388.421 2.126a5.655 5.655 0 01-.18 1.631.167.167 0 00.04.155 5.982 5.982 0 011.578 2.891c.385 1.901-.01 3.615-1.183 5.14l-.182.22a6.063 6.063 0 01-2.934 1.851.162.162 0 00-.108.102c-.255.736-.511 1.364-.987 1.992-1.199 1.582-2.962 2.462-4.948 2.451-1.583-.008-2.986-.587-4.21-1.736a.145.145 0 00-.14-.032c-.518.167-1.04.191-1.604.185a5.924 5.924 0 01-2.595-.622 6.058 6.058 0 01-2.146-1.781c-.203-.269-.404-.522-.551-.821a7.74 7.74 0 01-.495-1.283 6.11 6.11 0 01-.017-3.064.166.166 0 00.008-.074.115.115 0 00-.037-.064 5.958 5.958 0 01-1.38-2.202 5.196 5.196 0 01-.333-1.589 6.915 6.915 0 01.188-2.132c.45-1.484 1.309-2.648 2.577-3.493.282-.188.55-.334.802-.438.286-.12.573-.22.861-.304a.129.129 0 00.087-.087A6.016 6.016 0 015.635 2.31C6.315 1.464 7.132.846 8.086.457zm-.804 7.85a.848.848 0 00-1.473.842l1.694 2.965-1.688 2.848a.849.849 0 001.46.864l1.94-3.272a.849.849 0 00.007-.854l-1.94-3.393zm5.446 6.24a.849.849 0 000 1.695h4.848a.849.849 0 000-1.696h-4.848z';

type StackStanza = {
  text: string;
  icons: StackIcon[];
};

const stackRows: StackStanza[] = [
  {
    text: 'Claude Code & Codex (AI agents)',
    icons: [
      {
        kind: 'path',
        label: 'Claude Code',
        path: claudeCodePath,
        href: 'https://www.anthropic.com/claude-code',
      },
      { kind: 'path', label: 'Codex', path: codexPath, href: 'https://openai.com/codex' },
    ],
  },
  {
    text: 'Vercel (hosting platform)',
    icons: [{ kind: 'simple', label: 'Vercel', icon: siVercel, href: 'https://vercel.com' }],
  },
  {
    text: 'Ghostty (terminal)',
    icons: [{ kind: 'simple', label: 'Ghostty', icon: siGhostty, href: 'https://ghostty.org' }],
  },
  {
    text: 'Helium (browser)',
    icons: [{ kind: 'simple', label: 'Helium', icon: siHelium, href: 'https://helium.computer' }],
  },
  {
    text: 'PostHog (analytics)',
    icons: [{ kind: 'simple', label: 'PostHog', icon: siPosthog, href: 'https://posthog.com' }],
  },
  {
    text: 'Sentry (monitoring)',
    icons: [{ kind: 'simple', label: 'Sentry', icon: siSentry, href: 'https://sentry.io' }],
  },
  {
    text: 'Apple frameworks (Swift, SwiftUI)',
    icons: [
      { kind: 'simple', label: 'Swift', icon: siSwift, href: 'https://www.swift.org' },
      {
        kind: 'image',
        label: 'SwiftUI',
        src: 'https://img.icons8.com/color/96/swiftui.png',
        href: 'https://developer.apple.com/xcode/swiftui/',
      },
    ],
  },
  {
    text: 'Point-free co libraries (sqlite-data, swift-navigation)',
    icons: [
      {
        kind: 'simple',
        label: 'Point-Free co GitHub',
        icon: siGithub,
        href: 'https://github.com/pointfreeco',
      },
    ],
  },
];

export function StackPage({ locale }: { locale: Locale }) {
  const content = stackContent[locale];

  return (
    <div className="page">
      <header className="controls" aria-label="Preferences">
        <a
          href={content.switchHref}
          className="lang-switch"
          aria-label={content.langLabel}
          title={content.langLabel}
        >
          <Flag name={content.switchFlag} />
        </a>
        <ThemeToggle label={content.themeLabel} />
      </header>

      <main className="home">
        <div className="intro">
          {stackRows.map((row) => (
            <p className="stanza" key={row.text}>
              <span className="text-line">
                <span className="line-copy">{row.text}</span>{' '}
                <span className="cluster" role="list" aria-label={row.text}>
                  {row.icons.map((icon) => (
                    <StackIconChip icon={icon} key={icon.label} />
                  ))}
                </span>
              </span>
            </p>
          ))}
        </div>
      </main>
    </div>
  );
}

function StackIconChip({ icon }: { icon: StackIcon }) {
  const content =
    icon.kind === 'simple' ? (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d={icon.icon.path} />
      </svg>
    ) : icon.kind === 'path' ? (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d={icon.path} />
      </svg>
    ) : (
      <img src={icon.src} alt="" width={24} height={24} loading="lazy" />
    );

  const className = `chip stack-icon stack-icon-${slug(icon.label)}`;

  if (!icon.href) {
    return (
      <span className={className} role="listitem" title={icon.label} aria-label={icon.label}>
        {content}
      </span>
    );
  }

  return (
    <a
      href={icon.href}
      className={className}
      role="listitem"
      target="_blank"
      rel="noopener noreferrer"
      title={icon.label}
      aria-label={icon.label}
    >
      {content}
    </a>
  );
}

function slug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
