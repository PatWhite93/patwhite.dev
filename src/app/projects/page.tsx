import Link from "next/link";
import { getAllProjects } from "@/lib/markdown";

export const metadata = {
  title: "Projects — Pat White",
  description: "Things I've built — AI tools, full-stack apps, and automation systems.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-2">Projects</h1>
      <p className="text-[var(--color-muted)] mb-12">
        Things I&apos;ve built. Live demos where possible.
      </p>

      {projects.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-[var(--color-card-border)] rounded-xl">
          <p className="text-[var(--color-muted)] text-lg mb-2">
            Projects incoming.
          </p>
          <p className="text-[var(--color-muted)] text-sm">
            Check back soon — currently building and documenting.
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Link
              href={`/projects/${project.slug}`}
              key={project.slug}
              className="group rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card)] overflow-hidden hover:border-[var(--color-accent)] transition-colors"
            >
              {project.image && (
                <div className="aspect-video bg-[var(--color-background)] border-b border-[var(--color-card-border)] relative overflow-hidden">
                  <img
                    src={project.image}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover blur-lg scale-110"
                  />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="relative w-full h-full object-contain"
                  />
                </div>
              )}
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                  {project.title}
                </h2>
                <p className="text-sm text-[var(--color-muted)] mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-xs rounded-full border border-[var(--color-card-border)] text-[var(--color-muted)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3 text-sm">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)]"
                    >
                      Live demo &rarr;
                    </a>
                  )}
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--color-muted)] hover:text-[var(--color-foreground)]"
                    >
                      Source
                    </a>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
