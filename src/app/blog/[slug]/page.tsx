import { getAllPosts, getPostContent } from "@/lib/markdown";
import Link from "next/link";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { meta } = await getPostContent(slug);
  return {
    title: `${meta.title} — Pat White`,
    description: meta.description,
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const { meta, html } = await getPostContent(slug);

  return (
    <article className="max-w-3xl mx-auto px-6 py-16">
      <Link
        href="/blog"
        className="text-sm text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors mb-8 inline-block"
      >
        &larr; All posts
      </Link>

      <header className="mb-10">
        <h1 className="text-3xl font-bold mb-3">{meta.title}</h1>
        <div className="flex items-center gap-3 text-sm text-[var(--color-muted)]">
          <time>{meta.date}</time>
          <span>&middot;</span>
          <span>{meta.readingTime}</span>
        </div>
        {meta.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
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
      </header>

      <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}
