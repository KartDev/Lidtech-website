import type { MetadataRoute } from "next";

import { checklistConfig } from "@/content/checklist";
import { siteConfig } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: new URL(checklistConfig.slug, `${siteConfig.url}/`).toString(),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
