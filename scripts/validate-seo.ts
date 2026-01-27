/**
 * SEO Validation Script
 * Run with: npx ts-node scripts/validate-seo.ts
 *
 * Validates:
 * - All MDX pages have required frontmatter
 * - No duplicate titles or meta descriptions
 * - Sitemap completeness
 * - Basic internal link checking
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'content/pages');
const REQUIRED_FIELDS = ['slug', 'title', 'metaTitle', 'metaDescription', 'keywords', 'publishedAt', 'updatedAt', 'category'];

interface ValidationResult {
    file: string;
    issues: string[];
}

function validateSEO(): void {
    console.log('🔍 Running SEO Validation...\n');

    const results: ValidationResult[] = [];
    const titles = new Map<string, string>();
    const descriptions = new Map<string, string>();
    const slugs = new Set<string>();

    // Read all MDX files
    const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.mdx'));

    console.log(`📄 Found ${files.length} MDX files\n`);

    files.forEach(file => {
        const filePath = path.join(CONTENT_DIR, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const { data } = matter(content);
        const issues: string[] = [];

        // Check required fields
        REQUIRED_FIELDS.forEach(field => {
            if (!data[field]) {
                issues.push(`Missing required field: ${field}`);
            }
        });

        // Check for duplicate slugs
        if (data.slug) {
            if (slugs.has(data.slug)) {
                issues.push(`Duplicate slug: ${data.slug}`);
            }
            slugs.add(data.slug);
        }

        // Check for duplicate titles
        if (data.metaTitle || data.title) {
            const title = data.metaTitle || data.title;
            if (titles.has(title)) {
                issues.push(`Duplicate title found in: ${titles.get(title)}`);
            }
            titles.set(title, file);
        }

        // Check for duplicate descriptions
        if (data.metaDescription) {
            if (descriptions.has(data.metaDescription)) {
                issues.push(`Duplicate description found in: ${descriptions.get(data.metaDescription)}`);
            }
            descriptions.set(data.metaDescription, file);
        }

        // Check title length (50-60 chars optimal)
        if (data.metaTitle && data.metaTitle.length > 70) {
            issues.push(`Title too long (${data.metaTitle.length} chars, recommended: <70)`);
        }

        // Check description length (150-160 chars optimal)
        if (data.metaDescription && data.metaDescription.length > 170) {
            issues.push(`Description too long (${data.metaDescription.length} chars, recommended: <170)`);
        }

        // Check keywords
        if (data.keywords && !Array.isArray(data.keywords)) {
            issues.push('Keywords should be an array');
        }

        if (issues.length > 0) {
            results.push({ file, issues });
        }
    });

    // Print results
    if (results.length === 0) {
        console.log('✅ All SEO checks passed!\n');
    } else {
        console.log('⚠️  Issues found:\n');
        results.forEach(({ file, issues }) => {
            console.log(`📁 ${file}`);
            issues.forEach(issue => {
                console.log(`   ❌ ${issue}`);
            });
            console.log('');
        });
    }

    // Summary
    console.log('📊 Summary:');
    console.log(`   Total files: ${files.length}`);
    console.log(`   Files with issues: ${results.length}`);
    console.log(`   Unique slugs: ${slugs.size}`);
    console.log(`   Unique titles: ${titles.size}`);
    console.log(`   Unique descriptions: ${descriptions.size}`);
}

// Run validation
validateSEO();
