export async function initializeAnalytics() {
  const projectToken = import.meta.env.VITE_POSTHOG_PROJECT_TOKEN;
  const apiHost = import.meta.env.VITE_POSTHOG_HOST;

  if (!import.meta.env.PROD || !projectToken || !apiHost) {
    return;
  }

  const { default: posthog } = await import('posthog-js');

  posthog.init(projectToken, {
    api_host: apiHost,
    defaults: '2026-05-30',
    autocapture: false,
    capture_pageview: true,
    capture_pageleave: true,
    disable_session_recording: true,
    person_profiles: 'identified_only',
  });
}
