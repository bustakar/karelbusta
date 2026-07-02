import Link from 'next/link';
import {
  apps,
  localeContent,
  personJsonLd,
  socials,
  site,
  type Locale,
  type Trailing,
} from 'app/site';
import { ThemeToggle } from './theme-toggle';

export function PersonalHome({ locale }: { locale: Locale }) {
  const content = localeContent[locale];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(locale)) }}
      />
      <div className="page">
        <header className="controls" aria-label="Preferences">
          <Link
            href={content.switchHref}
            className="lang-switch"
            aria-label={content.langLabel}
            title={content.langLabel}
          >
            <Flag name={content.switchFlag} />
          </Link>
          <ThemeToggle label={content.themeLabel} />
        </header>

        <main className="home">
          <div className="intro">
            {content.intro.map((stanza, i) => (
              <p className="stanza" key={i}>
                {stanza.lines.map((line, j) => {
                  const isLast = j === stanza.lines.length - 1;
                  return (
                    <span className="text-line" key={j}>
                      {line}
                      {isLast && (
                        <>
                          {' '}
                          <TrailingIcons kind={stanza.trailing} content={content} />
                        </>
                      )}
                    </span>
                  );
                })}
              </p>
            ))}
          </div>

          <hr className="divider" />

          <div className="ctas">
            {content.ctas.map((cta) => (
              <p className="cta" key={cta.label}>
                {cta.label}{' '}
                <a
                  href={cta.href}
                  target={cta.href.startsWith('http') ? '_blank' : undefined}
                  rel={cta.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {cta.action}
                </a>
              </p>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}

function TrailingIcons({
  kind,
  content,
}: {
  kind: Trailing;
  content: (typeof localeContent)[Locale];
}) {
  if (kind === 'avatar') {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img className="avatar" src={site.avatarUrl} alt={site.name} width={40} height={40} />
    );
  }

  if (kind === 'apps') {
    return (
      <span className="cluster" role="list" aria-label={content.appsAlt}>
        {apps.map((app) => (
          <a
            key={app.name}
            href={app.href}
            className="chip app-chip"
            role="listitem"
            target="_blank"
            rel="noopener noreferrer"
            title={app.name}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={app.icon} alt={app.name} width={30} height={30} />
          </a>
        ))}
      </span>
    );
  }

  if (kind === 'socials') {
    return (
      <span className="cluster" role="list" aria-label={content.socialsAlt}>
        {socials.map((s) => (
          <a
            key={s.key}
            href={s.href}
            className="chip logo-chip"
            role="listitem"
            target="_blank"
            rel="noopener noreferrer"
            title={s.label}
            aria-label={s.label}
          >
            <BrandLogo name={s.key} />
          </a>
        ))}
      </span>
    );
  }

  // discord
  return (
    <span className="cluster">
      <a
        href={site.links.discord}
        className="chip logo-chip"
        target="_blank"
        rel="noopener noreferrer"
        title="Discord"
        aria-label="Discord"
      >
        <BrandLogo name="discord" />
      </a>
    </span>
  );
}

function BrandLogo({ name }: { name: 'youtube' | 'x' | 'discord' }) {
  if (name === 'youtube') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect width="24" height="24" rx="5" fill="#FF0000" />
        <path
          fill="#fff"
          d="M9.5 7.5v9l7.4-4.5-7.4-4.5Z"
        />
      </svg>
    );
  }
  if (name === 'x') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect width="24" height="24" rx="5" fill="#000" />
        <path
          fill="#fff"
          d="M17.53 5h2.02l-4.4 5.03L20.35 19h-4.06l-3.18-4.16L9.47 19H7.45l4.7-5.38L6.65 5h4.16l2.88 3.8L17.53 5Zm-.71 12.78h1.12L9.9 6.14H8.7l8.11 11.64Z"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#5865F2" />
      <path
        fill="#fff"
        d="M17.7 7.2a12 12 0 0 0-3-.93l-.15.3a11 11 0 0 1 2.66 1.06 10.4 10.4 0 0 0-8.42 0 11 11 0 0 1 2.66-1.06l-.15-.3c-1.05.18-2.06.5-3 .93-1.9 2.8-2.42 5.55-2.16 8.26A12.1 12.1 0 0 0 6.6 17.3l.45-.63a7.8 7.8 0 0 1-1.18-.57l.28-.21a7.4 7.4 0 0 0 6.3.05l.29.21c-.37.22-.77.41-1.19.57l.46.63a12 12 0 0 0 3.67-1.84c.31-3.14-.52-5.87-2.18-8.26ZM9.68 13.9c-.72 0-1.3-.66-1.3-1.47 0-.8.57-1.46 1.3-1.46s1.31.66 1.3 1.46c0 .81-.58 1.47-1.3 1.47Zm4.64 0c-.72 0-1.3-.66-1.3-1.47 0-.8.57-1.46 1.3-1.46s1.31.66 1.3 1.46c0 .81-.57 1.47-1.3 1.47Z"
      />
    </svg>
  );
}

function Flag({ name }: { name: 'cz' | 'gb' }) {
  if (name === 'cz') {
    return (
      <svg viewBox="0 0 24 16" className="flag" aria-hidden="true">
        <defs>
          <clipPath id="flag-cz">
            <rect width="24" height="16" rx="3" />
          </clipPath>
        </defs>
        <g clipPath="url(#flag-cz)">
          <rect width="24" height="8" fill="#fff" />
          <rect y="8" width="24" height="8" fill="#D7141A" />
          <path d="M0 0 12 8 0 16Z" fill="#11457E" />
        </g>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 16" className="flag" aria-hidden="true">
      <defs>
        <clipPath id="flag-gb">
          <rect width="24" height="16" rx="3" />
        </clipPath>
      </defs>
      <g clipPath="url(#flag-gb)">
        <rect width="24" height="16" fill="#012169" />
        <path d="M0 0 24 16M24 0 0 16" stroke="#fff" strokeWidth="3.2" />
        <path d="M0 0 24 16M24 0 0 16" stroke="#C8102E" strokeWidth="1.6" />
        <path d="M12 0V16M0 8H24" stroke="#fff" strokeWidth="5.2" />
        <path d="M12 0V16M0 8H24" stroke="#C8102E" strokeWidth="3" />
      </g>
    </svg>
  );
}
