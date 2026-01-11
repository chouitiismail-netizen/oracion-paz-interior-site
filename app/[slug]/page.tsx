import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllPages, getPageBySlug, getRelatedSpiritualPages } from '../../lib/content';
import Container from '../../components/ui/Container';
import Card from '../../components/ui/Card';

export async function generateStaticParams() {
    return getAllPages().map((p) => ({ slug: p.slug }));
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://REPLACE_AFTER_VERCEL.vercel.app";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const page = getPageBySlug(slug);

    if (!page) {
        return {
            title: "Página no encontrada",
            description: "La página que buscas no existe.",
        };
    }

    return {
        title: page.metaTitle || page.title,
        description: page.metaDescription,
        keywords: page.keywords,
        alternates: {
            canonical: `${baseUrl}/${slug}`,
        },
        openGraph: {
            title: page.metaTitle || page.title,
            description: page.metaDescription,
            url: `${baseUrl}/${slug}`,
            siteName: "Oraciones para la paz interior",
            locale: "es_ES",
            type: "article",
        },
    };
}

export default async function ArticlePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const page = getPageBySlug(slug);

    if (!page) {
        notFound();
    }

    const isLegal = page.category === 'legal';
    const relatedPages = isLegal ? [] : getRelatedSpiritualPages(slug, page.category);

    // Parse content sections
    const sections = parseContent(page.content);

    return (
        <div className="min-h-screen pb-8">
            <Container maxWidth="md" className="pt-6 space-y-6">
                {/* Breadcrumb - only for spiritual pages */}
                {!isLegal && (
                    <nav className="flex items-center gap-2 text-sm text-[var(--muted)]">
                        <Link href="/" className="hover:text-[var(--foreground)]">Inicio</Link>
                        <span>›</span>
                        <span className="text-[var(--foreground)] capitalize">{page.category}</span>
                    </nav>
                )}

                {/* Article Header */}
                <Card>
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="inline-flex items-center px-3 py-1 bg-[var(--accent)]/10 text-[var(--accent)] text-xs font-medium rounded-full">
                                {page.category.charAt(0).toUpperCase() + page.category.slice(1)}
                            </span>
                            {page.updatedAt && (
                                <span className="text-xs text-[var(--muted)]">
                                    Actualizado: {formatDate(page.updatedAt)}
                                </span>
                            )}
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold">{page.title}</h1>
                        {page.metaDescription && (
                            <p className="text-[var(--muted)] leading-relaxed">{page.metaDescription}</p>
                        )}
                    </div>
                </Card>

                {/* Disclaimer for spiritual pages */}
                {!isLegal && (
                    <div className="bg-[var(--accent)]/5 border border-[var(--accent)]/20 rounded-xl p-4">
                        <p className="text-xs text-[var(--muted)] leading-relaxed">
                            <strong className="text-[var(--foreground)]">Nota:</strong> Contenido espiritual. No sustituye ayuda profesional.
                        </p>
                    </div>
                )}

                {/* Content Sections */}
                <div className="prose-custom space-y-6">
                    {sections.map((section, idx) => (
                        <Card key={idx}>
                            {section.heading && (
                                <h2 className="text-xl font-semibold mb-4">{section.heading}</h2>
                            )}
                            <div className="space-y-4 text-[var(--foreground)] leading-relaxed">
                                {section.paragraphs.map((para, pIdx) => (
                                    <p key={pIdx} dangerouslySetInnerHTML={{ __html: parseInlineFormatting(para) }} />
                                ))}
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Related Articles - only for spiritual pages */}
                {!isLegal && relatedPages.length > 0 && (
                    <div className="pt-4">
                        <h2 className="text-xl font-semibold mb-3">Continúa explorando</h2>
                        <div className="space-y-3">
                            {relatedPages.map((related) => (
                                <Card key={related.slug} hover>
                                    <Link href={`/${related.slug}`} className="block">
                                        <div className="flex items-start gap-3">
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold mb-1 line-clamp-2 leading-snug">{related.title}</h3>
                                                <p className="text-sm text-[var(--muted)] line-clamp-2">{related.metaDescription}</p>
                                            </div>
                                            <div className="flex-shrink-0">
                                                <svg className="w-5 h-5 text-[var(--muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                                                </svg>
                                            </div>
                                        </div>
                                    </Link>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}

                {/* Back to Home */}
                <div className="pt-4">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
                        </svg>
                        Volver al inicio
                    </Link>
                </div>
            </Container>
        </div>
    );
}

function formatDate(dateString: string): string {
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch {
        return '';
    }
}

interface ContentSection {
    heading: string;
    paragraphs: string[];
}

function parseContent(content: string): ContentSection[] {
    const lines = content.trim().split('\n');
    const sections: ContentSection[] = [];
    let currentSection: ContentSection = { heading: '', paragraphs: [] };

    for (const line of lines) {
        const trimmed = line.trim();

        if (trimmed.startsWith('## ')) {
            // Save previous section if it has content
            if (currentSection.paragraphs.length > 0) {
                sections.push(currentSection);
            }
            // Start new section
            currentSection = {
                heading: trimmed.replace('## ', ''),
                paragraphs: [],
            };
        } else if (trimmed.length > 0 && !trimmed.startsWith('#')) {
            // Add paragraph to current section
            currentSection.paragraphs.push(trimmed);
        }
    }

    // Add final section
    if (currentSection.paragraphs.length > 0) {
        sections.push(currentSection);
    }

    return sections;
}

function parseInlineFormatting(text: string): string {
    // Convert **text** to <strong>
    let formatted = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

    // Convert *text* to <em>
    formatted = formatted.replace(/\*(.+?)\*/g, '<em>$1</em>');

    return formatted;
}
