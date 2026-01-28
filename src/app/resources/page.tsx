'use client';

import { useEffect, useState, useMemo } from 'react';
import { useResourceStore } from '@/lib/store';
import { loadResources, loadCategories, loadTags } from '@/lib/data';
import { createSearchIndex, searchResources } from '@/lib/search';
import { filterResources } from '@/lib/filters';
import { ResourceList } from '@/components/ResourceList';
import { SortOptions } from '@/components/filters/SortOptions';
import { ViewModeToggle } from '@/components/ViewModeToggle';
import { CategorySidebar } from '@/components/CategorySidebar';
import { OnThisPage } from '@/components/OnThisPage';
import { useRouter } from 'next/navigation';

export default function ResourcesPage() {
    const {
        resources,
        categories,
        tags,
        filters,
        searchQuery,
        setResources,
        setCategories,
        setTags
    } = useResourceStore();

    const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'alphabetical'>('newest');
    const [showFilters, setShowFilters] = useState(true);
    const [activeCategoryFilter, setActiveCategoryFilter] = useState<string | null>(null);
    const [visibleCategoryIds, setVisibleCategoryIds] = useState<string[]>([]);

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

        loadData();
    }, [setResources, setCategories, setTags]);

    // Create search index
    const searchIndex = useMemo(() => {
        if (resources.length === 0) return null;
        return createSearchIndex(resources);
    }, [resources]);

    // Filter and search resources
    const displayedResources = useMemo(() => {
        let result = resources;

        // Apply search
        if (searchQuery.trim() && searchIndex) {
            result = searchResources(searchIndex, searchQuery);
        }

        // Apply filters
        result = filterResources(result, filters);

        // Apply category filter from OnThisPage
        if (activeCategoryFilter) {
            result = result.filter(r => r.categories.includes(activeCategoryFilter));
        }

        // Apply sorting
        switch (sortBy) {
            case 'newest':
                result.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
                break;
            case 'popular':
                result.sort((a, b) => {
                    const aScore = (a.community?.upvotes || 0) - (a.community?.downvotes || 0);
                    const bScore = (b.community?.upvotes || 0) - (b.community?.downvotes || 0);
                    return bScore - aScore;
                });
                break;
            case 'alphabetical':
                result.sort((a, b) => a.title.localeCompare(b.title));
                break;
        }

        return result;
    }, [resources, searchQuery, searchIndex, filters, sortBy, activeCategoryFilter]);

    // Use pre-calculated counts from metadata sync
    const categoriesWithCounts = categories;

    // Derive the items for OnThisPage based on what's visible
    const navItems = useMemo(() => {
        const items: { id: string; name: string; isSubcategory?: boolean }[] = [];
        const addedIds = new Set<string>();

        // We want to show top-level categories that are visible,
        // and their subcategories if those are also visible.

        // Sort visible categories to keep order consistent with metadata
        const orderedVisibleCategories = categories
            .filter(c => visibleCategoryIds.includes(c.id));

        orderedVisibleCategories.forEach(cat => {
            if (!cat.parentCategory) {
                if (!addedIds.has(cat.id)) {
                    items.push({ id: cat.id, name: cat.name });
                    addedIds.has(cat.id);
                }
            } else {
                // It's a subcategory. We need to make sure the parent is in the list.
                const parent = categories.find(c => c.id === cat.parentCategory);
                if (parent && !addedIds.has(parent.id)) {
                    items.push({ id: parent.id, name: parent.name });
                    addedIds.add(parent.id);
                }

                if (!addedIds.has(cat.id)) {
                    items.push({ id: cat.id, name: cat.name, isSubcategory: true });
                    addedIds.add(cat.id);
                }
            }
        });

        // Final sort to ensure parents are always before children even if they weren't in visibleCategoryIds
        // Actually the logic above handles parent insertion.
        return items;
    }, [visibleCategoryIds, categories]);

    return (
        <div className="min-h-screen bg-background">
            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="flex gap-8">
                    {/* Left Sidebar - Categories & Filters */}
                    <CategorySidebar
                        categories={categoriesWithCounts}
                        onSelectCategory={(catId) => {
                            if (catId) router.push(`/categories/${catId}`);
                        }}
                        selectedCategory={null}
                        showFilters={showFilters}
                    />

                    {/* Resources */}
                    <main className="flex-1 min-w-0">
                        {/* Toolbar */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 p-4 bg-card border border-border">
                            <div className="text-sm font-medium">
                                <span className="text-primary font-bold">{displayedResources.length}</span>
                                <span className="text-muted-foreground ml-1">{displayedResources.length === 1 ? 'Resource' : 'Resources'} Found</span>
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                                <ViewModeToggle />
                                <div className="h-4 w-px bg-border hidden sm:block mx-1" />
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="text-xs px-3 py-1.5 border border-border hover:bg-muted transition-colors font-medium flex items-center gap-2"
                                >
                                    {showFilters ? 'Hide' : 'Show'} Filters
                                </button>
                                <SortOptions value={sortBy} onChange={setSortBy} />
                            </div>
                        </div>

                        {/* Resource List */}
                        <ResourceList
                            resources={displayedResources}
                            groupByCategory={true}
                            onVisibleCategoriesChange={setVisibleCategoryIds}
                        />
                    </main>

                    {/* Right Sidebar - "On this page" */}
                    <OnThisPage
                        items={navItems}
                        onFilter={setActiveCategoryFilter}
                        activeFilter={activeCategoryFilter}
                    />
                </div>
            </div>
        </div>
    );
}
