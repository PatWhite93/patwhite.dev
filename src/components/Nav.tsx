"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/videos", label: "Videos" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--color-card-border)] bg-[var(--color-background)]/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-16">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight hover:text-[var(--color-accent)] transition-colors"
        >
          {/* TODO: Figure out colors */}
          pat<span className="text-[var(--color-accent)]">white</span>.dev
        </Link>
        <div className="flex gap-6 text-sm">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`transition-colors hover:text-[var(--color-foreground)] ${
                pathname === href || (href !== "/" && pathname.startsWith(href))
                  ? "text-[var(--color-foreground)]"
                  : "text-[var(--color-muted)]"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
