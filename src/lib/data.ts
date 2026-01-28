import type { Resource } from '@/types';

async function fetchJson(url: string) {
    const response = await fetch(url);
    let text = await response.text();
    // Remove UTF-8 BOM if present
    text = text.replace(/^\uFEFF/, '');
    return JSON.parse(text);
}

export async function loadResources(): Promise<Resource[]> {
    try {
        const data = await fetchJson('/data/resources/all-resources.json');
        return data.resources || [];
    } catch (error) {
        console.error('Failed to load resources:', error);
        return [];
    }
}

export async function loadCategories() {
    try {
        const data = await fetchJson('/data/categories/categories.json');
        return data.categories || [];
    } catch (error) {
        console.error('Failed to load categories:', error);
        return [];
    }
}

export async function loadTags() {
    try {
        const data = await fetchJson('/data/tags/tags.json');
        return data.tags || [];
    } catch (error) {
        console.error('Failed to load tags:', error);
        return [];
    }
}

export async function loadMetadata() {
    try {
        const data = await fetchJson('/data/resources/metadata.json');
        return data || null;
    } catch (error) {
        console.error('Failed to load metadata:', error);
        return null;
    }
}
