import Link from 'next/link';
import type { PageData } from '../lib/content';

interface PrayerCardProps {
  page: PageData;
}

export default function PrayerCard({ page }: PrayerCardProps) {
  return (
    <article className="h-full">
      <Link
        href={`/${page.slug}`}
        className="block h-full bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 hover:shadow-md hover:border-[var(--accent)]/30 transition-all group focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
        aria-label={`Leer: ${page.title}`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="text-lg font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors line-clamp-2">
              {page.title}
            </h3>
            <svg
              className="w-5 h-5 flex-shrink-0 text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
            </svg>
          </div>
          <p className="text-sm text-[var(--muted)] line-clamp-3 leading-relaxed flex-grow">
            {page.metaDescription}
          </p>
          {page.category && (
            <div className="mt-3 pt-3 border-t border-[var(--border)]">
              <span className="inline-flex items-center px-2.5 py-1 bg-[var(--accent)]/10 text-[var(--accent)] text-xs font-medium rounded-full">
                {page.category.charAt(0).toUpperCase() + page.category.slice(1)}
              </span>
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
