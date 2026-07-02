import { PersonalHome } from './components/personal-home';
import type { Locale } from './site';

export type Route = {
  path: string;
  locale: Locale;
  status?: 200 | 404;
};

export const routes: Route[] = [
  { path: '/', locale: 'cs' },
  { path: '/en', locale: 'en' },
  { path: '/404', locale: 'en', status: 404 },
];

export function routeForPath(pathname: string): Route {
  const normalized = pathname === '/en/' ? '/en' : pathname;
  return routes.find((route) => route.path === normalized) ?? routes[0];
}

export function App({ route }: { route: Route }) {
  if (route.status === 404) {
    return (
      <div className="page">
        <main className="home">
          <section className="intro" aria-labelledby="not-found-title">
            <h1 id="not-found-title" className="stanza">
              Page not found
            </h1>
            <p className="cta">
              <a href="/en">Go back home</a>
            </p>
          </section>
        </main>
      </div>
    );
  }

  return <PersonalHome locale={route.locale} />;
}
