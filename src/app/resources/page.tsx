'use client';

import { useEffect, useState, useMemo } from 'react';
import { useResourceStore } from '@/lib/store';
import { loadResources, loadCategories, loadTags } from '@/lib/data';
import { createSearchIndex, searchResources } from '@/lib/search';
import { filterResources } from '@/lib/filters';
import { ResourceList } from '@/components/ResourceList';
import { FilterPanel } from '@/components/filters/FilterPanel';
import { SortOptions } from '@/components/filters/SortOptions';
import { ViewModeToggle } from '@/components/ViewModeToggle';
import { Search } from 'lucide-react';

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
    }, [resources, searchQuery, searchIndex, filters, sortBy]);

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="border-b border-border bg-card">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-4">Browse Resources</h1>

                    {/* Search */}
                    <div className="flex items-center gap-3 px-4 py-3 bg-background border-2 border-border max-w-2xl">
                        <Search className="h-5 w-5 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search resources..."
                            className="flex-1 bg-transparent outline-none"
                            value={searchQuery}
                            onChange={(e) => useResourceStore.getState().setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="flex gap-8">
                    {/* Filters Sidebar */}
                    {showFilters && (
                        <aside className="w-64 flex-shrink-0">
                            <FilterPanel />
                        </aside>
                    )}

                    {/* Resources */}
                    <main className="flex-1 min-w-0">
                        {/* Toolbar */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 p-4 bg-card border border-border">
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
                        <ResourceList resources={displayedResources} />
                    </main>
                </div>
            </div>
        </div>
    );
}
