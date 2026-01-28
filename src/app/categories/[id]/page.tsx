'use client';

import { useEffect, useState, useMemo } from 'react';
import { useResourceStore } from '@/lib/store';
import { loadResources, loadCategories, loadTags } from '@/lib/data';
import { createSearchIndex, searchResources } from '@/lib/search';
import { filterResources } from '@/lib/filters';
import { ResourceList } from '@/components/ResourceList';
import { CategorySidebar } from '@/components/CategorySidebar';
import { OnThisPage } from '@/components/OnThisPage';
import { useRouter } from 'next/navigation';
import type { Category } from '@/types';

interface CategoryPageProps {
    params: {
        id: string;
    };
}

export default function CategoryPage({ params }: CategoryPageProps) {
    const {
        resources,
        categories,
        tags,
        setResources,
        setCategories,
        setTags
    } = useResourceStore();

    const [selectedCategory, setSelectedCategory] = useState<string | null>(params.id);
    const [subcategoryFilter, setSubcategoryFilter] = useState<string | null>(null);
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

            // Sync global votes
            useResourceStore.getState().syncVotes();
        };

        loadData();
    }, [setResources, setCategories, setTags]);

    // Get current category
    const currentCategory = categories.find(c => c.id === (selectedCategory || params.id));

    // Get subcategories
    const subcategories = categories.filter(c => c.parentCategory === currentCategory?.id);

    // Filter resources
    const displayedResources = useMemo(() => {
        if (!currentCategory) return [];

        let filtered = resources.filter(r => {
            const filterCat = subcategoryFilter || currentCategory.id;
            return r.categories.includes(filterCat);
        });

        return filtered.filter(r => r.status === 'active');
    }, [resources, currentCategory, subcategoryFilter]);

    // Calculate resource counts for categories
    const categoriesWithCounts = categories.map(cat => ({
        ...cat,
        resourceCount: resources.filter(r => r.categories.includes(cat.id)).length
    }));

    if (!currentCategory) {
        return <div className="container mx-auto px-4 py-12">Category not found</div>;
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="border-b border-border bg-card">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-2xl font-bold mb-1">{currentCategory.name}</h1>
                    <p className="text-sm text-muted-foreground">
                        {currentCategory.description}
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="flex gap-8">
                    {/* Left Sidebar */}
                    <CategorySidebar
                        categories={categoriesWithCounts}
                        onSelectCategory={(catId) => {
                            if (catId) router.push(`/categories/${catId}`);
                        }}
                        selectedCategory={selectedCategory}
                        showFilters={true}
                    />

                    {/* Resources */}
                    <main className="flex-1 min-w-0">
                        <div className="mb-6">
                            <div className="text-sm font-medium">
                                <span className="text-primary font-bold">{displayedResources.length}</span>
                                <span className="text-muted-foreground ml-1">
                                    {displayedResources.length === 1 ? 'Resource' : 'Resources'} Found
                                </span>
                            </div>
                        </div>

                        <ResourceList resources={displayedResources} groupByCategory={false} />
                    </main>

                    {/* Right Sidebar - "On this page" */}
                    <OnThisPage
                        subcategories={subcategories}
                        onFilter={setSubcategoryFilter}
                        activeFilter={subcategoryFilter}
                    />
                </div>
            </div>
        </div>
    );
}
