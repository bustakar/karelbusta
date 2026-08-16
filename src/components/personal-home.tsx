import { useCallback, useState } from 'react';
import { siGithub, siX, siYoutube } from 'simple-icons';
import { KineticCard } from './kinetic-card';
import { localeContent, personJsonLd, site, socials, type Locale } from '../site';
import type { PublicMetrics } from '../metrics';
import { ThemeToggle } from './theme-toggle';

export function PersonalHome({ locale }: { locale: Locale }) {
  const content = localeContent[locale];
  const [metrics, setMetrics] = useState<PublicMetrics | null>(null);
  const receiveMetrics = useCallback((metrics: PublicMetrics) => {
    setMetrics(metrics);
  }, []);
  const revenue = metrics?.summary.revenue ?? null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(locale)) }}
      />
      <header className="controls home-controls" aria-label={locale === 'cs' ? 'Nastavení' : 'Preferences'}>
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
      <main className="indie-page">
        <aside className="profile">
          <img
            className="profile-photo"
            src={site.avatarUrl}
            alt={site.name}
            width="240"
            height="240"
            fetchPriority="high"
          />
          <h1>{site.name}</h1>
          <div className="profile-meta">
            <span>
              <LocationIcon /> {locale === 'cs' ? 'Česko' : 'Czechia'}
            </span>
            <span aria-label="Total revenue">
              <RevenueIcon /> {revenue === null ? '—' : formatRevenue(revenue)}
            </span>
          </div>
          <nav className="social-icons" aria-label="Social links">
            {socials.map((social) => (
              <a
                key={social.key}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                title={social.label}
              >
                <SocialIcon name={social.key} />
              </a>
            ))}
          </nav>
        </aside>
        <section className="projects" aria-label="Projects">
          <KineticCard locale={locale} metrics={metrics} onMetrics={receiveMetrics} />
        </section>
      </main>
    </>
  );
}

function formatRevenue(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: value >= 10_000 ? 'compact' : 'standard',
    maximumFractionDigits: value >= 10_000 ? 1 : 0,
  }).format(value);
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function RevenueIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="M8 12h8M12 8v8" />
    </svg>
  );
}

const socialIcons = {
  youtube: { icon: siYoutube, viewBox: '0 3 24 18' },
  x: { icon: siX, viewBox: '2 2 20 20' },
  github: { icon: siGithub, viewBox: '0 0 24 24' },
};

function SocialIcon({ name }: { name: keyof typeof socialIcons }) {
  const { icon, viewBox } = socialIcons[name];
  return (
    <svg className={`social-icon social-icon-${name}`} viewBox={viewBox} aria-hidden="true">
      <path d={icon.path} />
    </svg>
  );
}

export function Flag({ name }: { name: 'cz' | 'gb' }) {
  if (name === 'cz') {
    return (
      <svg viewBox="0 0 24 16" className="flag" aria-hidden="true">
        <rect width="24" height="8" rx="3" fill="#fff" />
        <path d="M0 8h24v5a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3Z" fill="#D7141A" />
        <path d="M0 0 12 8 0 16Z" fill="#11457E" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 16" className="flag" aria-hidden="true">
      <rect width="24" height="16" rx="3" fill="#012169" />
      <path d="M0 0 24 16M24 0 0 16" stroke="#fff" strokeWidth="3.2" />
      <path d="M0 0 24 16M24 0 0 16" stroke="#C8102E" strokeWidth="1.6" />
      <path d="M12 0V16M0 8H24" stroke="#fff" strokeWidth="5.2" />
      <path d="M12 0V16M0 8H24" stroke="#C8102E" strokeWidth="3" />
    </svg>
  );
}
