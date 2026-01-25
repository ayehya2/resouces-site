'use client';

import { useEffect } from 'react';
import { useResourceStore } from '@/lib/store';
import { loadResources, loadCategories, loadTags } from '@/lib/data';
import { SearchBar } from '@/components/search/SearchBar';
import { CategoryGrid } from '@/components/CategoryGrid';
import { ResourceList } from '@/components/ResourceList';

export default function HomePage() {
    const { resources, categories, tags, setResources, setCategories, setTags } = useResourceStore();

    useEffect(() => {
        // Load all data on mount
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

    const categoriesWithCounts = categories.map(cat => ({
        ...cat,
        resourceCount: resources.filter(r => r.categories.includes(cat.id)).length
    }));

    const featuredCategories = categoriesWithCounts.filter(cat => cat.featured);
    const recentResources = resources
        .filter(r => r.status === 'active')
        .sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
        .slice(0, 6);

    return (
        <div className="w-full">
            {/* Hero Section */}
            <section className="border-b border-border bg-card">
                <div className="container mx-auto px-4 py-16 md:py-24">
                    <div className="max-w-3xl mx-auto text-center space-y-6">
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                            Resources Wiki
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            A curated directory of high-quality technical resources, tools, and learning materials.
                            Community-driven, manually vetted, always free.
                        </p>

                        {/* Search Bar */}
                        <div className="pt-4">
                            <SearchBar />
                        </div>

                        {/* Stats */}
                        <div className="flex justify-center gap-8 pt-8 text-sm">
                            <div>
                                <div className="text-2xl font-bold">{resources.length}</div>
                                <div className="text-muted-foreground">Resources</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold">{categories.length}</div>
                                <div className="text-muted-foreground">Categories</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold">{resources.filter(r => r.verified).length}</div>
                                <div className="text-muted-foreground">Verified</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Categories */}
            {featuredCategories.length > 0 && (
                <section className="border-b border-border">
                    <div className="container mx-auto px-4 py-12">
                        <h2 className="text-2xl font-bold mb-6">Featured Categories</h2>
                        <CategoryGrid categories={featuredCategories} />
                    </div>
                </section>
            )}

            {/* Recent Resources */}
            {recentResources.length > 0 && (
                <section className="border-b border-border">
                    <div className="container mx-auto px-4 py-12">
                        <h2 className="text-2xl font-bold mb-6">Recently Added</h2>
                        <ResourceList resources={recentResources} />
                    </div>
                </section>
            )}

            {/* All Resources Link */}
            <section className="bg-muted/30">
                <div className="container mx-auto px-4 py-12 text-center">
                    <a
                        href="/resources"
                        className="inline-block px-8 py-3 bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors border border-border"
                    >
                        Browse All Resources
                    </a>
                </div>
            </section>
        </div>
    );
}
