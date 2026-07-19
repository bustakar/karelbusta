import {
  apps,
  localeContent,
  personJsonLd,
  socials,
  site,
  type Locale,
  type Trailing,
} from '../site';
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
            {content.intro.map((stanza, i) => (
              <p className="stanza" key={i}>
                {stanza.lines.map((line, j) => {
                  const isLast = j === stanza.lines.length - 1;
                  const hasAvatar = isLast && stanza.trailing === 'avatar';
                  return (
                    <span className={hasAvatar ? 'text-line avatar-line' : 'text-line'} key={j}>
                      <span className="line-copy">{line}</span>
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
            <img src={s.icon} alt="" width={24} height={24} />
          </a>
        ))}
      </span>
    );
  }

  return null;
}

export function Flag({ name }: { name: 'cz' | 'gb' }) {
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
