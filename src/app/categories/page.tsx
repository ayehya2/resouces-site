'use client';

import { useEffect } from 'react';
import { useResourceStore } from '@/lib/store';
import { loadResources, loadCategories, loadTags } from '@/lib/data';
import { CategoryGrid } from '@/components/CategoryGrid';

export default function CategoriesPage() {
    const { resources, categories, setResources, setCategories, setTags } = useResourceStore();

    useEffect(() => {
        const loadData = async () => {
            const [resourcesData, categoriesData, tagsData] = await Promise.all([
                loadResources(),
                loadCategories(),
                loadTags(),
            ]);

            setResources(resourcesData);
            setCategories(categoriesData);
            setTags(tagsData);
        };

        if (categories.length === 0) {
            loadData();
        }
    }, [setResources, setCategories, setTags, categories.length]);

    const categoriesWithCounts = categories.map(cat => ({
        ...cat,
        resourceCount: resources.filter(r => r.categories.includes(cat.id)).length
    }));

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-12">
                <h1 className="text-4xl font-bold mb-4 text-foreground">All Categories</h1>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    Browse our curated collection of resources organized by technical domain and topic.
                </p>
            </div>

            <CategoryGrid categories={categoriesWithCounts} />
        </div>
    );
}
