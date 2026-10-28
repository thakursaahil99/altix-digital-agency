import type { MetadataRoute } from "next";
import { navLinks, projects, services, site } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...navLinks.map((l) => ({ url: `${site.url}${l.href === "/" ? "" : l.href}`, lastModified: now })),
    ...services.map((s) => ({ url: `${site.url}/services/${s.slug}`, lastModified: now })),
    ...projects.map((p) => ({ url: `${site.url}/work/${p.slug}`, lastModified: now })),
  ];
}
