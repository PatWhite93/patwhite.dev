import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import readingTime from "reading-time";

const contentDir = path.join(process.cwd(), "content");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  readingTime: string;
  published: boolean;
};

export type ProjectMeta = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  demo?: string;
  repo?: string;
  image?: string;
  featured: boolean;
  order: number;
};

function getAllFiles(dir: string): string[] {
  const fullDir = path.join(contentDir, dir);
  if (!fs.existsSync(fullDir)) return [];
  return fs
    .readdirSync(fullDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getAllPosts(): PostMeta[] {
  const slugs = getAllFiles("blog");
  return slugs
    .map((slug) => getPostMeta(slug))
    .filter((p) => p.published)
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPostMeta(slug: string): PostMeta {
  const filePath = path.join(contentDir, "blog", `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);
  return {
    slug,
    title: data.title || slug,
    date: data.date || "",
    description: data.description || "",
    tags: data.tags || [],
    readingTime: stats.text,
    published: data.published !== false,
  };
}

export async function getPostContent(slug: string) {
  const filePath = path.join(contentDir, "blog", `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const result = await remark().use(html).process(content);
  const stats = readingTime(content);
  return {
    meta: {
      slug,
      title: data.title || slug,
      date: data.date || "",
      description: data.description || "",
      tags: data.tags || [],
      readingTime: stats.text,
      published: data.published !== false,
    } as PostMeta,
    html: result.toString(),
  };
}

export function getAllProjects(): ProjectMeta[] {
  const slugs = getAllFiles("projects");
  return slugs
    .map((slug) => getProjectMeta(slug))
    .sort((a, b) => a.order - b.order);
}

export function getProjectMeta(slug: string): ProjectMeta {
  const filePath = path.join(contentDir, "projects", `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(raw);
  return {
    slug,
    title: data.title || slug,
    description: data.description || "",
    tags: data.tags || [],
    demo: data.demo,
    repo: data.repo,
    image: data.image,
    featured: data.featured || false,
    order: data.order || 99,
  };
}

export async function getProjectContent(slug: string) {
  const filePath = path.join(contentDir, "projects", `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const result = await remark().use(html).process(content);
  return {
    meta: getProjectMeta(slug),
    html: result.toString(),
  };
}
