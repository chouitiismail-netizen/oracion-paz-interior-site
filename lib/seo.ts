/**
 * SEO Utilities for Oraciones para la paz interior
 * Provides JSON-LD schema generation and SEO helpers
 */

export const SITE_NAME = "Oraciones para la paz interior";
export const SITE_DESCRIPTION = "Oraciones y reflexiones originales para calmar la mente, encontrar serenidad interior y descansar el corazón en Dios.";
export const SITE_LOCALE = "es_ES";
export const SITE_LANGUAGE = "es";

export function getBaseUrl(): string {
    return process.env.NEXT_PUBLIC_SITE_URL || "https://REPLACE_AFTER_VERCEL.vercel.app";
}

// ============================================
// JSON-LD Schema Types
// ============================================

export interface WebSiteSchema {
    "@context": "https://schema.org";
    "@type": "WebSite";
    "@id": string;
    name: string;
    description: string;
    url: string;
    inLanguage: string;
    publisher: OrganizationSchema;
    potentialAction?: SearchActionSchema;
}

export interface OrganizationSchema {
    "@context"?: "https://schema.org";
    "@type": "Organization";
    "@id": string;
    name: string;
    url: string;
    description: string;
    logo?: string;
    sameAs?: string[];
}

export interface SearchActionSchema {
    "@type": "SearchAction";
    target: {
        "@type": "EntryPoint";
        urlTemplate: string;
    };
    "query-input": string;
}

export interface BreadcrumbSchema {
    "@context": "https://schema.org";
    "@type": "BreadcrumbList";
    itemListElement: BreadcrumbItem[];
}

export interface BreadcrumbItem {
    "@type": "ListItem";
    position: number;
    name: string;
    item?: string;
}

export interface ArticleSchema {
    "@context": "https://schema.org";
    "@type": "Article";
    "@id": string;
    headline: string;
    description: string;
    image?: string;
    author: OrganizationSchema;
    publisher: OrganizationSchema;
    mainEntityOfPage: {
        "@type": "WebPage";
        "@id": string;
    };
    datePublished: string;
    dateModified: string;
    inLanguage: string;
    keywords?: string[];
}

export interface FAQSchema {
    "@context": "https://schema.org";
    "@type": "FAQPage";
    mainEntity: FAQItem[];
}

export interface FAQItem {
    "@type": "Question";
    name: string;
    acceptedAnswer: {
        "@type": "Answer";
        text: string;
    };
}

// ============================================
// Schema Generators
// ============================================

export function generateOrganizationSchema(): OrganizationSchema {
    const baseUrl = getBaseUrl();
    return {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        name: SITE_NAME,
        url: baseUrl,
        description: SITE_DESCRIPTION,
        logo: `${baseUrl}/icon-512.png`,
        sameAs: ["https://www.jesuscontigo.org/"],
    };
}

export function generateWebSiteSchema(): WebSiteSchema {
    const baseUrl = getBaseUrl();
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        url: baseUrl,
        inLanguage: SITE_LANGUAGE,
        publisher: generateOrganizationSchema(),
        potentialAction: {
            "@type": "SearchAction",
            target: {
                "@type": "EntryPoint",
                urlTemplate: `${baseUrl}/?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
        },
    };
}

export function generateBreadcrumbSchema(items: { name: string; url?: string }[]): BreadcrumbSchema {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem" as const,
            position: index + 1,
            name: item.name,
            ...(item.url && { item: item.url }),
        })),
    };
}

export function generateArticleSchema(params: {
    slug: string;
    title: string;
    description: string;
    publishedAt: string;
    updatedAt: string;
    keywords?: string[];
    image?: string;
}): ArticleSchema {
    const baseUrl = getBaseUrl();
    const articleUrl = `${baseUrl}/${params.slug}`;
    const organization = generateOrganizationSchema();

    return {
        "@context": "https://schema.org",
        "@type": "Article",
        "@id": `${articleUrl}/#article`,
        headline: params.title,
        description: params.description,
        image: params.image || `${baseUrl}/og-default.png`,
        author: organization,
        publisher: organization,
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": articleUrl,
        },
        datePublished: params.publishedAt,
        dateModified: params.updatedAt,
        inLanguage: SITE_LANGUAGE,
        keywords: params.keywords,
    };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]): FAQSchema {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
            "@type": "Question" as const,
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer" as const,
                text: faq.answer,
            },
        })),
    };
}

// ============================================
// JSON-LD Script Component Helper
// ============================================

export function jsonLdScriptProps(schema: object): { type: string; dangerouslySetInnerHTML: { __html: string } } {
    return {
        type: "application/ld+json",
        dangerouslySetInnerHTML: {
            __html: JSON.stringify(schema, null, 0),
        },
    };
}

// ============================================
// Default FAQs for the theme
// ============================================

export const DEFAULT_FAQS = [
    {
        question: "¿Qué es una oración para la paz interior?",
        answer: "Una oración para la paz interior es una comunicación con Dios donde expresamos nuestro deseo de calmar la mente, encontrar serenidad y descansar el corazón en Su presencia. Estas oraciones nos ayudan a soltar preocupaciones y confiar en el cuidado divino.",
    },
    {
        question: "¿Cuándo debo rezar por paz interior?",
        answer: "Puedes rezar por paz interior en cualquier momento: al despertar para comenzar el día con serenidad, antes de dormir para descansar mejor, durante momentos de ansiedad o estrés, o simplemente cuando sientas que tu corazón necesita calma y consuelo espiritual.",
    },
    {
        question: "¿Cómo puede ayudarme la oración a calmar la ansiedad?",
        answer: "La oración nos conecta con Dios y nos permite entregar nuestras preocupaciones a Él. Al orar, practicamos la confianza en un poder superior, lo que reduce la sensación de tener que controlar todo. La Biblia dice: 'Echa sobre Jehová tu carga, y él te sustentará' (Salmo 55:22).",
    },
    {
        question: "¿Las oraciones de este sitio son católicas?",
        answer: "Las oraciones de este sitio están inspiradas en la tradición cristiana y pueden ser utilizadas por personas de diferentes denominaciones. Están basadas en principios bíblicos universales sobre la paz, la confianza en Dios y el descanso espiritual.",
    },
];
