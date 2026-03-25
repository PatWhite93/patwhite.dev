import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Nav } from "@/components/Nav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pat White — Full-Stack Engineer & AI Builder",
  description:
    "Senior full-stack engineer specializing in AI-augmented development. React/TypeScript, Node.js, AWS. Building faster with intelligent tooling.",
  openGraph: {
    title: "Pat White — Full-Stack Engineer & AI Builder",
    description:
      "Senior full-stack engineer specializing in AI-augmented development.",
    url: "https://patwhite.dev",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-[family-name:var(--font-sans)]">
        <Nav />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-[var(--color-card-border)] py-8 text-center text-sm text-[var(--color-muted)]">
          <div className="max-w-5xl mx-auto px-6">
            Pat White &copy; {new Date().getFullYear()}
          </div>
        </footer>
      </body>
    </html>
  );
}
