import type { Resource, Filters } from '@/types';

export function filterResources(
    resources: Resource[],
    filters: Filters
): Resource[] {
    return resources.filter((resource) => {
        // Category filter
        if (filters.categories.length > 0) {
            const hasCategory = filters.categories.some((cat) =>
                resource.categories.includes(cat)
            );
            if (!hasCategory) return false;
        }

        // Tag filter
        if (filters.tags.length > 0) {
            const hasTag = filters.tags.some((tag) =>
                resource.tags.includes(tag)
            );
            if (!hasTag) return false;
        }

        // Platform filter
        if (filters.platforms.length > 0 && resource.metadata?.platform) {
            const hasPlatform = filters.platforms.some((platform) =>
                resource.metadata!.platform!.includes(platform as any)
            );
            if (!hasPlatform) return false;
        }

        // Pricing filter
        if (filters.pricing.length > 0 && resource.metadata?.pricing) {
            if (!filters.pricing.includes(resource.metadata.pricing)) {
                return false;
            }
        }

        // Status filter
        if (filters.status.length > 0) {
            if (!filters.status.includes(resource.status)) {
                return false;
            }
        }

        // Verified filter
        if (filters.verified && !resource.verified) {
            return false;
        }

        // Featured filter
        if (filters.featured && !resource.featured) {
            return false;
        }

        // No signup filter
        if (filters.noSignup && resource.metadata?.requiresSignup !== false) {
            return false;
        }

        // Open source filter
        if (filters.openSource && !resource.metadata?.openSource) {
            return false;
        }

        return true;
    });
}
