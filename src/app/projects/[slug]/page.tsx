import { getAllProjects, getProjectContent } from "@/lib/markdown";
import Link from "next/link";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { meta } = await getProjectContent(slug);
  return {
    title: `${meta.title} — Pat White`,
    description: meta.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const { meta, html } = await getProjectContent(slug);

  return (
    <article className="max-w-3xl mx-auto px-6 py-16">
      <Link
        href="/projects"
        className="text-sm text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors mb-8 inline-block"
      >
        &larr; All projects
      </Link>

      <header className="mb-10">
        <h1 className="text-3xl font-bold mb-3">{meta.title}</h1>
        <p className="text-[var(--color-muted)] leading-relaxed">
          {meta.description}
        </p>
        {meta.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {meta.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs rounded-full border border-[var(--color-card-border)] text-[var(--color-muted)]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        {(meta.demo || meta.repo) && (
          <div className="flex gap-4 mt-4 text-sm">
            {meta.demo && (
              <a
                href={meta.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)]"
              >
                Live demo &rarr;
              </a>
            )}
            {meta.repo && (
              <a
                href={meta.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-muted)] hover:text-[var(--color-foreground)]"
              >
                Source code
              </a>
            )}
          </div>
        )}
      </header>

      <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}
