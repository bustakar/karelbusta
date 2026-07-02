import {
  siAnthropic,
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
  | { kind: 'codex'; label: string; href?: string }
  | { kind: 'swiftui'; label: string; href?: string };

type StackStanza = {
  text: string;
  icons: StackIcon[];
};

const stackRows: StackStanza[] = [
  {
    text: 'Claude Code & Codex (AI agents)',
    icons: [
      {
        kind: 'simple',
        label: 'Claude Code',
        icon: siAnthropic,
        href: 'https://www.anthropic.com/claude-code',
      },
      { kind: 'codex', label: 'Codex', href: 'https://openai.com/codex' },
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
      { kind: 'swiftui', label: 'SwiftUI', href: 'https://developer.apple.com/xcode/swiftui/' },
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
    ) : icon.kind === 'codex' ? (
      <CodexIcon />
    ) : (
      <SwiftUIIcon />
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

function CodexIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M8 8.8h8v6.4H8z" />
      <path d="M9.8 10.6h4.4M9.8 13.4h2.6" />
    </svg>
  );
}

function SwiftUIIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <path d="M7.5 14.2c3.8 2.6 7.2 2.2 9.5-1.1-2.3.7-4.5.4-6.4-.7 2.2-.1 4.1-1.1 5.7-3.1-3 .9-5.5.5-7.6-1.2 1.2 2 2.7 3.4 4.5 4.1-2.1.6-4 .3-5.7-.9" />
    </svg>
  );
}

function slug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
