import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { siteConfig, waLink } from "./site-config";

/* Business facts (phone, name, socials) live in ./site-config.ts — the single
   source of truth. Re-exported here so existing imports keep working. */
export { siteConfig, waLink };

export type ServiceCategory = "inflable" | "flete";

export interface Service {
  slug: string;
  order: number;
  title: string;
  category: ServiceCategory;
  priceFrom?: number;
  duration?: string;
  specs: Record<string, string>;
  excerpt: string;
  thumbnail?: string;
  gallery: string[];
  featured: boolean;
  waMessage: string;
  draft: boolean;
  body: string;
}

const CONTENT_DIR = path.join(process.cwd(), "content", "servicios");

function requireField(data: Record<string, unknown>, field: string, file: string): void {
  if (data[field] === undefined || data[field] === null || data[field] === "") {
    throw new Error(`[content] ${file}: missing required frontmatter field "${field}"`);
  }
}

export function getServices(): Service[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));
  const services = files.map((file) => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
    const { data, content } = matter(raw);
    requireField(data, "title", file);
    requireField(data, "category", file);
    requireField(data, "excerpt", file);
    requireField(data, "wa_message", file);
    if (!["inflable", "flete"].includes(data.category as string)) {
      throw new Error(`[content] ${file}: category must be "inflable" or "flete"`);
    }
    if (data.price_from !== undefined && typeof data.price_from !== "number") {
      throw new Error(`[content] ${file}: price_from must be a number`);
    }
    if (data.order !== undefined && typeof data.order !== "number") {
      throw new Error(`[content] ${file}: order must be a number`);
    }
    return {
      slug: file.replace(/\.md$/, ""),
      order: (data.order as number | undefined) ?? 99,
      title: data.title as string,
      category: data.category as ServiceCategory,
      priceFrom: data.price_from as number | undefined,
      duration: data.duration as string | undefined,
      specs: (data.specs as Record<string, string>) ?? {},
      excerpt: data.excerpt as string,
      thumbnail: data.thumbnail as string | undefined,
      gallery: (data.gallery as string[]) ?? [],
      featured: data.featured === true,
      waMessage: data.wa_message as string,
      draft: data.draft === true,
      body: content.trim(),
    } satisfies Service;
  });
  return services
    .filter((s) => !s.draft)
    .sort((a, b) => a.order - b.order);
}

export function getService(slug: string): Service | undefined {
  return getServices().find((s) => s.slug === slug);
}
