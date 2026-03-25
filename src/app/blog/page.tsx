import Link from "next/link";
import { getAllPosts } from "@/lib/markdown";

export const metadata = {
  title: "Blog — Pat White",
  description: "Writing about AI-augmented development, debugging, and building things.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-2">Blog</h1>
      <p className="text-[var(--color-muted)] mb-12">
        Thoughts on building with AI, debugging production systems, and shipping faster.
      </p>

      {posts.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-[var(--color-card-border)] rounded-xl">
          <p className="text-[var(--color-muted)] text-lg mb-2">
            First post coming soon.
          </p>
          <p className="text-[var(--color-muted)] text-sm">
            I&apos;m documenting my workflow and experiments. Stay tuned.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex items-baseline justify-between gap-4 py-4 border-b border-[var(--color-card-border)] hover:border-[var(--color-accent)] transition-colors"
            >
              <div className="min-w-0">
                <h2 className="font-medium group-hover:text-[var(--color-accent)] transition-colors truncate">
                  {post.title}
                </h2>
                <p className="text-sm text-[var(--color-muted)] mt-1 line-clamp-1">
                  {post.description}
                </p>
              </div>
              <div className="flex-shrink-0 text-xs text-[var(--color-muted)] whitespace-nowrap">
                <span>{post.date}</span>
                <span className="mx-2">&middot;</span>
                <span>{post.readingTime}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
