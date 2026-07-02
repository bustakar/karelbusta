'use client';

import { useEffect, useState } from 'react';

type Resolved = 'light' | 'dark';

function systemTheme(): Resolved {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function apply(resolved: Resolved) {
  const root = document.documentElement;
  root.dataset.theme = resolved;
  root.style.colorScheme = resolved;
}

export function ThemeToggle({ label }: { label: string }) {
  // null until mounted, so SSR markup stays stable (icon renders after hydration)
  const [resolved, setResolved] = useState<Resolved | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem('theme-mode');
    const initial: Resolved =
      stored === 'light' || stored === 'dark' ? stored : systemTheme();
    setResolved(initial);
    apply(initial);

    // While the user hasn't chosen explicitly, follow the system.
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      if (!window.localStorage.getItem('theme-mode')) {
        const next = systemTheme();
        setResolved(next);
        apply(next);
      }
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  function toggle() {
    const next: Resolved = resolved === 'dark' ? 'light' : 'dark';
    setResolved(next);
    window.localStorage.setItem('theme-mode', next);
    apply(next);
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={label}
      title={label}
    >
      {/* Show the icon for the mode you'll switch TO. */}
      {resolved === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
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
