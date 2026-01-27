'use client';

import { useState, useMemo } from 'react';
import Hero from './Hero';
import PrayerCard from './PrayerCard';
import type { PageData } from '../lib/content';
import { START_HERE_SLUGS, FEATURED_SLUGS, PRIMARY_PRAYER_SLUG } from '../lib/config';
import { DEFAULT_FAQS, generateFAQSchema, jsonLdScriptProps } from '../lib/seo';

interface HomeClientProps {
  allPages: PageData[];
}

export default function HomeClient({ allPages }: HomeClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Filter spiritual pages only
  const spiritualPages = useMemo(() => allPages, [allPages]);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    spiritualPages.forEach(p => cats.add(p.category));
    return Array.from(cats).sort();
  }, [spiritualPages]);

  // Build curated sections
  const startHerePages = useMemo(() => {
    return START_HERE_SLUGS.map(slug => spiritualPages.find(p => p.slug === slug)).filter(Boolean) as PageData[];
  }, [spiritualPages]);

  const featuredPages = useMemo(() => {
    const featured = FEATURED_SLUGS.map(slug => spiritualPages.find(p => p.slug === slug)).filter(Boolean) as PageData[];
    const startSlugs = new Set(startHerePages.map(p => p.slug));
    return featured.filter(p => !startSlugs.has(p.slug));
  }, [spiritualPages, startHerePages]);

  const primaryPrayer = useMemo(() => {
    return spiritualPages.find(p => p.slug === PRIMARY_PRAYER_SLUG);
  }, [spiritualPages]);

  // Filtered pages
  const filteredPages = useMemo(() => {
    let pages = spiritualPages;

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      pages = pages.filter(p =>
        p.title.toLowerCase().includes(lowerQuery) ||
        p.metaDescription.toLowerCase().includes(lowerQuery) ||
        p.keywords.some(k => k.toLowerCase().includes(lowerQuery))
      );
    }

    if (selectedCategory !== 'all') {
      pages = pages.filter(p => p.category === selectedCategory);
    }

    // Remove curated pages
    const curatedSlugs = new Set([...START_HERE_SLUGS, ...FEATURED_SLUGS, PRIMARY_PRAYER_SLUG]);
    return pages.filter(p => !curatedSlugs.has(p.slug));
  }, [searchQuery, selectedCategory, spiritualPages]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero
        title="Oraciones para la paz interior"
        subtitle="Oraciones y reflexiones originales para calmar la mente, encontrar serenidad interior y descansar el corazón en Dios"
        ctaText="Comenzar a orar"
        ctaHref={primaryPrayer ? `/${primaryPrayer.slug}` : '/oraciones-para-la-paz-interior'}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-16">
        {/* Encuentra paz interior Section */}
        {!searchQuery && startHerePages.length > 0 && (
          <section>
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-2">
                Encuentra paz interior
              </h2>
              <p className="text-[var(--muted)]">
                Oraciones esenciales para calmar la mente y descansar en Dios
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {startHerePages.map((page) => (
                <PrayerCard key={page.slug} page={page} />
              ))}
            </div>
          </section>
        )}

        {/* Oraciones destacadas Section */}
        {!searchQuery && featuredPages.length > 0 && (
          <section>
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-2">
                Oraciones destacadas
              </h2>
              <p className="text-[var(--muted)]">
                Profundiza en la serenidad, el silencio y el descanso espiritual
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPages.map((page) => (
                <PrayerCard key={page.slug} page={page} />
              ))}
            </div>
          </section>
        )}

        {/* Search and Filter Section */}
        <section>
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-6">
              {searchQuery || selectedCategory !== 'all' ? 'Resultados de búsqueda' : 'Todas las oraciones'}
            </h2>

            {/* Search Input */}
            <div className="mb-4">
              <label htmlFor="search-prayers" className="sr-only">
                Buscar oraciones
              </label>
              <input
                id="search-prayers"
                type="search"
                placeholder="Buscar oraciones por tema, palabra clave..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Buscar oraciones por tema o palabra clave"
                className="w-full max-w-2xl px-4 py-3 bg-[var(--card)] border border-[var(--border)] rounded-xl text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
              />
            </div>

            {/* Category Chips */}
            {categories.length > 1 && (
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === 'all'
                      ? 'bg-[var(--accent)] text-white'
                      : 'bg-[var(--card)] text-[var(--foreground)] border border-[var(--border)] hover:border-[var(--accent)]'
                  }`}
                >
                  Todas
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === cat
                        ? 'bg-[var(--accent)] text-white'
                        : 'bg-[var(--card)] text-[var(--foreground)] border border-[var(--border)] hover:border-[var(--accent)]'
                    }`}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Results Count */}
          {(searchQuery || selectedCategory !== 'all') && (
            <p className="text-sm text-[var(--muted)] mb-6">
              {filteredPages.length} {filteredPages.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
            </p>
          )}

          {/* Prayer Grid */}
          {filteredPages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPages.map((page) => (
                <PrayerCard key={page.slug} page={page} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-[var(--card)] border border-[var(--border)] rounded-xl">
              <p className="text-[var(--muted)] text-lg">
                No se encontraron oraciones que coincidan con tu búsqueda
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-4 text-[var(--accent)] hover:text-[var(--accent-dark)] font-medium"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </section>

        {/* FAQ Section */}
        {!searchQuery && (
          <section aria-labelledby="faq-heading">
            <script {...jsonLdScriptProps(generateFAQSchema(DEFAULT_FAQS))} />
            <div className="mb-8">
              <h2 id="faq-heading" className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-2">
                Preguntas frecuentes
              </h2>
              <p className="text-[var(--muted)]">
                Respuestas a las dudas más comunes sobre la oración y la paz interior
              </p>
            </div>
            <div className="space-y-4">
              {DEFAULT_FAQS.map((faq, index) => (
                <details
                  key={index}
                  className="group bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-5 cursor-pointer list-none hover:bg-[var(--accent)]/5 transition-colors">
                    <h3 className="font-semibold text-[var(--foreground)] pr-4">{faq.question}</h3>
                    <span className="flex-shrink-0 text-[var(--accent)] group-open:rotate-180 transition-transform">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-5 pb-5 text-[var(--muted)] leading-relaxed">
                    <p>{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
