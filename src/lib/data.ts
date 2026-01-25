import type { Resource } from '@/types';

export async function loadResources(): Promise<Resource[]> {
    try {
        const response = await fetch('/data/resources/all-resources.json');
        const data = await response.json();
        return data.resources || [];
    } catch (error) {
        console.error('Failed to load resources:', error);
        return [];
    }
}

export async function loadCategories() {
    try {
        const response = await fetch('/data/categories/categories.json');
        const data = await response.json();
        return data.categories || [];
    } catch (error) {
        console.error('Failed to load categories:', error);
        return [];
    }
}

export async function loadTags() {
    try {
        const response = await fetch('/data/tags/tags.json');
        const data = await response.json();
        return data.tags || [];
    } catch (error) {
        console.error('Failed to load tags:', error);
        return [];
    }
}
