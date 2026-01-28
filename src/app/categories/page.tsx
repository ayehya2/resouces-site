'use client';

import { useEffect, useState } from 'react';
import { useResourceStore } from '@/lib/store';
import { loadResources, loadCategories, loadTags } from '@/lib/data';
import { CategoryGrid } from '@/components/CategoryGrid';
import { CategorySidebar } from '@/components/CategorySidebar';
import { useRouter } from 'next/navigation';

export default function CategoriesPage() {
    const { resources, categories, setResources, setCategories, setTags } = useResourceStore();
    const router = useRouter();

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

    const handleSelectCategory = (categoryId: string | null) => {
        if (categoryId) {
            router.push(`/categories/${categoryId}`);
        }
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="border-b border-border bg-card">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-2xl font-bold mb-2 text-foreground">Categories</h1>
                    <p className="text-sm text-muted-foreground">
                        Browse resources organized by technical domain and topic
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="flex gap-8">
                    {/* Left Sidebar */}
                    <CategorySidebar
                        categories={categoriesWithCounts}
                        onSelectCategory={handleSelectCategory}
                        selectedCategory={null}
                        showFilters={false}
                    />

                    {/* Category Grid */}
                    <main className="flex-1">
                        <CategoryGrid categories={categoriesWithCounts} />
                    </main>
                </div>
            </div>
        </div>
    );
}
