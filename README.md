# karelbusta.dev

Karel Busta's bilingual personal site, built with React, Vite, and TypeScript.

The Kinetic card displays cached monthly users, paying users, and revenue from
RevenueCat. Traffic and Web Vitals are measured with Vercel Web Analytics and
Speed Insights.

## Development

```bash
bun install
cp .env.example .env.local
bun run dev
```

Add a read-only RevenueCat V2 API key and project ID to `.env.local` to load live
metrics.

## Checks

```bash
bunx tsc --noEmit
bun run build
```
