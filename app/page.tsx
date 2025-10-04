import { Projects } from 'app/components/projects';

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        karelbusta
      </h1>
      <p className="mb-4">
        {`I'm always looking for easier ways to complex problems. I also love to stack up new technologies to build my side projects - something I really miss in my boring-ish 9-5.`}
      </p>
      <div className="my-8">
        <Projects />
      </div>
    </section>
  );
}
