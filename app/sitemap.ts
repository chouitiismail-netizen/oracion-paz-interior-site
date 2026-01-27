import type { MetadataRoute } from 'next';
import { getAllPages, getSpiritualPages, getLegalPages } from "../lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://REPLACE_AFTER_VERCEL.vercel.app";
    const spiritualPages = getSpiritualPages();
    const legalPages = getLegalPages();

    return [
        // Homepage - highest priority
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1.0,
        },
        // Spiritual content pages - high priority
        ...spiritualPages.map((p) => ({
            url: `${baseUrl}/${p.slug}`,
            lastModified: new Date(p.updatedAt),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        })),
        // Legal pages - lower priority
        ...legalPages.map((p) => ({
            url: `${baseUrl}/${p.slug}`,
            lastModified: new Date(p.updatedAt),
            changeFrequency: 'yearly' as const,
            priority: 0.3,
        })),
    ];
}
