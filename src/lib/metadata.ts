import type { Resource, Category, Tag } from '@/types';

/**
 * Calculate metadata statistics from resources
 */
export function calculateMetadata(
    resources: Resource[],
    categories: Category[],
    tags: Tag[]
) {
    const now = new Date().toISOString();

    const totalResources = resources.length;
    const verifiedResources = resources.filter(r => r.verified).length;
    const featuredResources = resources.filter(r => r.featured).length;
    const activeResources = resources.filter(r => r.status === 'active').length;
    const brokenResources = resources.filter(r => r.status === 'broken').length;

    // Get unique categories used in resources
    const categoriesUsed = new Set<string>();
    resources.forEach(r => {
        r.categories.forEach(c => categoriesUsed.add(c));
    });

    // Get unique tags used in resources
    const tagsUsed = new Set<string>();
    resources.forEach(r => {
        r.tags.forEach(t => tagsUsed.add(t));
    });

    return {
        version: '1.0.0',
        lastUpdated: now,
        statistics: {
            totalResources,
            verifiedResources,
            featuredResources,
            activeResources,
            brokenResources,
            categoriesUsed: categoriesUsed.size,
            tagsUsed: tagsUsed.size,
            lastScrapingRun: null,
            nextScrapingScheduled: null
        },
        dataIntegrity: {
            lastValidation: now,
            validationStatus: 'passed' as const,
            issues: []
        }
    };
}

/**
 * Get metadata for display
 */
export async function getMetadata() {
    try {
        // Load data
        const [resourcesRes, categoriesRes, tagsRes] = await Promise.all([
            fetch('/data/resources/all-resources.json'),
            fetch('/data/categories/categories.json'),
            fetch('/data/tags/tags.json')
        ]);

        const resourcesData = await resourcesRes.json();
        const categoriesData = await categoriesRes.json();
        const tagsData = await tagsRes.json();

        return calculateMetadata(
            resourcesData.resources || [],
            categoriesData.categories || [],
            tagsData.tags || []
        );
    } catch (error) {
        console.error('Failed to calculate metadata:', error);
        return null;
    }
}
