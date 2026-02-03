export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        karelbusta
      </h1>
      <p className="mb-4">
        {`I'm always looking for easier ways to solve complex problems. I also love to stack up new technologies to build my side projects - something I really miss in my boring-ish 9-5.`}
      </p>
      <ul className="my-8 flex flex-col space-y-3 text-neutral-600 dark:text-neutral-300">
        <li>
          <a
            href="https://github.com/bustakar"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
          >
            github
          </a>
        </li>
        <li>
          <a
            href="https://x.com/karelbusta"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
          >
            twitter
          </a>
        </li>
      </ul>
    </section>
  );
}
