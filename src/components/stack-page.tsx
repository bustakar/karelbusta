import { stackContent, type Locale } from '../site';
import { Flag } from './personal-home';
import { ThemeToggle } from './theme-toggle';

export function StackPage({ locale }: { locale: Locale }) {
  const content = stackContent[locale];

  return (
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
        <section className="intro stack-intro" aria-labelledby="stack-title">
          <p className="stack-kicker" id="stack-title">
            Tech stack
          </p>
          {content.lines.map((line) => (
            <p className="stanza stack-line" key={line}>
              {line}
            </p>
          ))}
        </section>

        <section className="stack-list" aria-label="Tech stack">
          {content.groups.map((group) => (
            <div className="stack-row" key={group.label}>
              <h2>{group.label}</h2>
              <div className="stack-tools">
                {group.tools.map((tool) =>
                  tool.href ? (
                    <a
                      href={tool.href}
                      target={tool.href.startsWith('http') ? '_blank' : undefined}
                      rel={tool.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="stack-tool"
                      key={tool.name}
                    >
                      {tool.name}
                    </a>
                  ) : (
                    <span className="stack-tool" key={tool.name}>
                      {tool.name}
                    </span>
                  ),
                )}
              </div>
            </div>
          ))}
        </section>

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
  );
}
