'use client';

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

type Resolved = 'light' | 'dark';
type ThemeMode = 'system' | Resolved;

function systemTheme(): Resolved {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function resolve(mode: ThemeMode): Resolved {
  return mode === 'system' ? systemTheme() : mode;
}

function apply(mode: ThemeMode) {
  const resolved = resolve(mode);
  const root = document.documentElement;
  root.dataset.theme = resolved;
  root.dataset.themeMode = mode;
  root.style.colorScheme = resolved;
}

export function ThemeToggle({ label }: { label: string }) {
  const [mode, setMode] = useState<ThemeMode>('system');

  useEffect(() => {
    const stored = window.localStorage.getItem('theme-mode');
    const initial: ThemeMode =
      stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'system';
    setMode(initial);
    apply(initial);

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      const current = window.localStorage.getItem('theme-mode') || 'system';
      if (current === 'system') {
        apply('system');
      }
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  function choose(next: ThemeMode) {
    setMode(next);
    window.localStorage.setItem('theme-mode', next);
    apply(next);
  }

  return (
    <div className="theme-toggle" aria-label={label} title={label} role="group">
      <ThemeButton
        active={mode === 'system'}
        label="System theme"
        onClick={() => choose('system')}
      >
        <SystemIcon />
      </ThemeButton>
      <ThemeButton active={mode === 'light'} label="Light theme" onClick={() => choose('light')}>
        <SunIcon />
      </ThemeButton>
      <ThemeButton active={mode === 'dark'} label="Dark theme" onClick={() => choose('dark')}>
        <MoonIcon />
      </ThemeButton>
    </div>
  );
}

function ThemeButton({
  active,
  children,
  label,
  onClick,
}: {
  active: boolean;
  children: ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button type="button" aria-label={label} aria-pressed={active} onClick={onClick}>
      {children}
    </button>
  );
}

function SystemIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4" y="5" width="16" height="11" rx="2" />
      <path d="M9 20h6M12 16v4" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.2 14.84A8.5 8.5 0 0 1 9.16 3.8a7 7 0 1 0 11.04 11.04Z" />
    </svg>
  );
}
