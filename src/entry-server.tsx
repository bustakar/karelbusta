import { renderToString } from 'react-dom/server';
import { App, routes, type Route } from './App';
import { localeContent, metadataForPage, site, stackContent } from './site';

export { routes };

const themeScript = `
(() => {
  try {
    const stored = localStorage.getItem('theme-mode') || 'system';
    const resolved = stored === 'system'
      ? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : stored;
    document.documentElement.dataset.theme = resolved;
    document.documentElement.dataset.themeMode = stored;
    document.documentElement.style.colorScheme = resolved;
  } catch {
    document.documentElement.dataset.theme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
})();
`;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderHead(route: Route, assetTags: string) {
  const content = localeContent[route.locale];
  const metadata = metadataForPage(route.locale, route.page);
  const alternateCs = route.page === 'stack' ? stackContent.cs.url : site.czechUrl;
  const alternateEn = route.page === 'stack' ? stackContent.en.url : site.englishUrl;
  const title = route.status === 404 ? `Page not found | ${site.name}` : metadata.title;
  const description =
    route.status === 404 ? 'The requested page could not be found.' : metadata.description;
  const canonical = route.status === 404 ? `${site.baseUrl}/404` : metadata.canonical;

  return `
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="color-scheme" content="light dark" />
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="application-name" content="${escapeHtml(site.name)}" />
    <meta name="author" content="${escapeHtml(site.name)}" />
    <meta name="creator" content="${escapeHtml(site.name)}" />
    <meta name="publisher" content="${escapeHtml(site.name)}" />
    <meta name="robots" content="${route.status === 404 ? 'noindex,follow' : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'}" />
    <link rel="canonical" href="${escapeHtml(canonical)}" />
    <link rel="alternate" hreflang="cs" href="${escapeHtml(alternateCs)}" />
    <link rel="alternate" hreflang="en" href="${escapeHtml(alternateEn)}" />
    <link rel="alternate" hreflang="x-default" href="${escapeHtml(alternateEn)}" />
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <link rel="icon" href="/favicon.png" type="image/png" />
    <link rel="apple-touch-icon" href="/avatar.png" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${escapeHtml(canonical)}" />
    <meta property="og:site_name" content="${escapeHtml(site.name)}" />
    <meta property="og:locale" content="${metadata.locale}" />
    <meta property="og:locale:alternate" content="${metadata.alternateLocale}" />
    <meta property="og:type" content="profile" />
    <meta property="og:image" content="${escapeHtml(metadata.ogImage)}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${escapeHtml(title)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:creator" content="@karelbusta" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${escapeHtml(metadata.ogImage)}" />
    <script>${themeScript}</script>
    ${route.status === 404 ? '' : `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebPage', name: title, description, url: canonical, inLanguage: content.htmlLang })}</script>`}
    ${assetTags}
  `;
}

export function render(route: Route, assetTags = '') {
  const content = localeContent[route.locale];
  const appHtml = renderToString(<App route={route} />);

  return `<!doctype html>
<html lang="${content.htmlLang}">
  <head>${renderHead(route, assetTags)}</head>
  <body class="antialiased">
    <div id="root">${appHtml}</div>
    ${assetTags ? '' : '<script type="module" src="/src/entry-client.tsx"></script>'}
  </body>
</html>`;
}
