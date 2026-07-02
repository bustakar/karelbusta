import { PersonalHome } from './components/personal-home';
import { StackPage } from './components/stack-page';
import type { Locale, PageKind } from './site';

export type Route = {
  path: string;
  locale: Locale;
  page: PageKind;
  status?: 200 | 404;
};

export const routes: Route[] = [
  { path: '/', locale: 'cs', page: 'home' },
  { path: '/en', locale: 'en', page: 'home' },
  { path: '/stack', locale: 'cs', page: 'stack' },
  { path: '/en/stack', locale: 'en', page: 'stack' },
  { path: '/404', locale: 'en', page: 'home', status: 404 },
];

export function routeForPath(pathname: string): Route {
  const normalized = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname;
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

  if (route.page === 'stack') {
    return <StackPage locale={route.locale} />;
  }

  return <PersonalHome locale={route.locale} />;
}
