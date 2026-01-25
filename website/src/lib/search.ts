import Fuse from 'fuse.js';
import type { Resource } from '@/types';

const fuseOptions = {
    keys: [
        { name: 'title', weight: 2 },
        { name: 'shortDescription', weight: 1.5 },
        { name: 'longDescription', weight: 1 },
        { name: 'tags', weight: 1.2 },
        { name: 'categories', weight: 0.8 },
    ],
    threshold: 0.3,
    distance: 100,
    minMatchCharLength: 2,
    shouldSort: true,
};

export function createSearchIndex(resources: Resource[]) {
    return new Fuse(resources, fuseOptions);
}

export function searchResources(
    fuse: Fuse<Resource>,
    query: string
): Resource[] {
    if (!query.trim()) return [];
    const results = fuse.search(query);
    return results.map((result) => result.item);
}
