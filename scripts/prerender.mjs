import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist', 'client');
const manifestPath = path.join(dist, '.vite', 'manifest.json');
const serverEntry = await firstExisting([
  path.join(root, 'dist', 'server', 'entry-server.js'),
  path.join(root, 'dist', 'server', 'entry-server.mjs'),
]);

const { render } = await import(serverEntry);
const { routes } = await import(serverEntry);

async function firstExisting(files) {
  for (const file of files) {
    try {
      await fs.access(file);
      return file;
    } catch {
      // Try the next extension.
    }
  }

  throw new Error(`Unable to find SSR entry. Checked: ${files.join(', ')}`);
}

const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
const entry = manifest['src/entry-client.tsx'];

if (!entry) {
  throw new Error('Unable to find src/entry-client.tsx in Vite manifest.');
}

const assetTags = [
  ...(entry.css ?? []).map((href) => `<link rel="stylesheet" href="/${href}" />`),
  `<script type="module" src="/${entry.file}"></script>`,
].join('\n    ');

for (const route of routes) {
  const html = render(route, assetTags);
  const file =
    route.path === '/'
      ? path.join(dist, 'index.html')
      : route.status === 404
        ? path.join(dist, '404.html')
        : path.join(dist, route.path.slice(1), 'index.html');

  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, html);
}

await fs.writeFile(
  path.join(dist, 'robots.txt'),
  ['User-agent: *', 'Allow: /', 'Sitemap: https://karelbusta.dev/sitemap.xml', ''].join('\n'),
);

await fs.writeFile(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://karelbusta.cz</loc>
    <xhtml:link rel="alternate" hreflang="cs" href="https://karelbusta.cz" />
    <xhtml:link rel="alternate" hreflang="en" href="https://karelbusta.dev/en" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://karelbusta.dev/en" />
  </url>
  <url>
    <loc>https://karelbusta.dev/en</loc>
    <xhtml:link rel="alternate" hreflang="cs" href="https://karelbusta.cz" />
    <xhtml:link rel="alternate" hreflang="en" href="https://karelbusta.dev/en" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://karelbusta.dev/en" />
  </url>
  <url>
    <loc>https://karelbusta.cz/stack</loc>
    <xhtml:link rel="alternate" hreflang="cs" href="https://karelbusta.cz/stack" />
    <xhtml:link rel="alternate" hreflang="en" href="https://karelbusta.dev/en/stack" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://karelbusta.dev/en/stack" />
  </url>
  <url>
    <loc>https://karelbusta.dev/en/stack</loc>
    <xhtml:link rel="alternate" hreflang="cs" href="https://karelbusta.cz/stack" />
    <xhtml:link rel="alternate" hreflang="en" href="https://karelbusta.dev/en/stack" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://karelbusta.dev/en/stack" />
  </url>
</urlset>
`,
);

await fs.writeFile(
  path.join(dist, 'rss.xml'),
  `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Karel Busta</title>
    <link>https://karelbusta.dev/en</link>
    <description>Personal website of Karel Busta.</description>
  </channel>
</rss>
`,
);
