'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

type Project = {
  title: string;
  description: string;
  github: string;
};

const projects: Project[] = [
  {
    title: 'Openboards',
    description:
      'A feedback collecting platform, open-source alternative to FeatureBase or Canny.',
    github: 'https://github.com/bustakar/openboards',
  },
  {
    title: 'NextJS biolerplate',
    description:
      'An opinionated NextJS boilerplate that I start every project with. Postgres, Drizzle, shadcn, better-auth, stripe.',
    github: 'https://github.com/bustakar/next-easy',
  },
  {
    title: 'Zen Hero',
    description:
      'A simple tracker that keeps me motivated, Apple-native, written in Swift & SwiftUI.',
    github: 'https://github.com/bustakar/zenhero',
  },
];

export function Projects() {
  const [stars, setStars] = useState<Record<string, number>>({});
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (hasFetchedRef.current) {
      return;
    }

    hasFetchedRef.current = true;

    const fetchStars = async () => {
      try {
        const results = await Promise.all(
          projects.map(async (project) => {
            const repo = project.github.replace('https://github.com/', '');
            const response = await fetch(`/api/github?repo=${repo}`);

            if (!response.ok) {
              throw new Error(`Failed to fetch stars for ${repo}`);
            }

            const data = await response.json();
            return { github: project.github, stars: data.stars ?? 0 };
          })
        );

        const starsByRepo = results.reduce<Record<string, number>>(
          (acc, { github, stars }) => {
            acc[github] = stars;
            return acc;
          },
          {}
        );

        setStars(starsByRepo);
      } catch (error) {
        console.error(error);
      }
    };

    void fetchStars();
  }, []);

  return (
    <div>
      {projects.map((project) => (
        <div key={project.title} className="flex flex-col space-y-1 mb-6">
          <div className="w-full flex flex-col md:flex-row md:items-start space-x-0 md:space-x-4">
            <div className="flex-1">
              <Link
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <h3 className="text-neutral-900 dark:text-neutral-100 tracking-tight font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
              </Link>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-1">
                {project.description}
              </p>
            </div>
            {stars[project.github] && (
              <div className="flex items-center space-x-1 mt-2 md:mt-0">
                <svg
                  className="w-4 h-4 text-yellow-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-neutral-900 dark:text-neutral-100 tracking-tight font-medium">
                  {stars[project.github]} ⭐️
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
