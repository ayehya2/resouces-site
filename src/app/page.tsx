'use client';

import { useEffect, useState } from 'react';
import { useResourceStore } from '@/lib/store';
import { loadResources, loadCategories, loadTags, loadMetadata } from '@/lib/data';
import { SearchBar } from '@/components/search/SearchBar';
import { CategoryGrid } from '@/components/CategoryGrid';
import { ResourceList } from '@/components/ResourceList';
import Link from 'next/link';

export default function HomePage() {
    const { resources, categories, setResources, setCategories, setTags } = useResourceStore();
    const [stats, setStats] = useState<any>(null);

    useEffect(() => {
        const loadData = async () => {
            const [resourcesData, categoriesData, tagsData, metaData] = await Promise.all([
                loadResources(),
                loadCategories(),
                loadTags(),
                loadMetadata()
            ]);

            setResources(resourcesData);
            setCategories(categoriesData);
            setTags(tagsData);
            if (metaData) setStats(metaData.statistics);
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
            {/* Hero Section - Sleeker & Minimalist */}
            <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-background to-card">
                <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-foreground">
                                Resources <span className="text-primary italic">Wiki</span>
                            </h1>
                            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                                A premium, community-driven directory of high-quality technical resources, tools, and learning materials.
                                Manually vetted for excellence.
                            </p>
                        </div>

                        {/* Search Bar - Center Piece */}
                        <div className="max-w-xl mx-auto pt-4">
                            <SearchBar />
                        </div>

                        {/* Stats - Symmetrical & Sleek */}
                        <div className="grid grid-cols-3 gap-4 pt-12 max-w-lg mx-auto border-t border-border/50">
                            <div className="text-center group">
                                <div className="text-3xl font-mono font-bold text-foreground group-hover:text-primary transition-colors">
                                    {stats?.totalResources || resources.length}
                                </div>
                                <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Resources</div>
                            </div>
                            <div className="text-center group">
                                <div className="text-3xl font-mono font-bold text-foreground group-hover:text-primary transition-colors">
                                    {stats?.categoriesUsed || new Set(resources.flatMap(r => r.categories)).size}
                                </div>
                                <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Categories</div>
                            </div>
                            <div className="text-center group">
                                <div className="text-3xl font-mono font-bold text-foreground group-hover:text-primary transition-colors">
                                    {stats?.verifiedResources || resources.filter(r => r.verified).length}
                                </div>
                                <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Verified</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Categories */}
            {featuredCategories.length > 0 && (
                <section className="border-b border-border bg-background">
                    <div className="container mx-auto px-4 py-16">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-bold tracking-tight uppercase border-l-4 border-primary pl-4">
                                Featured Domains
                            </h2>
                            <Link href="/categories" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                                View Categories →
                            </Link>
                        </div>
                        <CategoryGrid categories={featuredCategories} />
                    </div>
                </section>
            )}

            {/* Recent Resources */}
            {recentResources.length > 0 && (
                <section className="border-b border-border bg-card/30">
                    <div className="container mx-auto px-4 py-16">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-bold tracking-tight uppercase border-l-4 border-primary pl-4">
                                Latest Additions
                            </h2>
                            <Link href="/resources" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                                Explore All →
                            </Link>
                        </div>
                        <ResourceList resources={recentResources} groupByCategory={false} />
                    </div>
                </section>
            )}

            {/* Footer CTA */}
            <section className="bg-background relative">
                <div className="container mx-auto px-4 py-24 text-center">
                    <div className="max-w-2xl mx-auto space-y-6">
                        <h2 className="text-3xl font-bold">Scaling for the Community</h2>
                        <p className="text-muted-foreground">
                            Help us maintain the highest quality directory by submitting new tools or reporting broken links.
                        </p>
                        <div className="flex justify-center gap-4 pt-4">
                            <Link
                                href="/resources"
                                className="px-8 py-3 bg-primary text-primary-foreground font-bold hover:shadow-lg hover:shadow-primary/20 transition-all border border-primary ring-offset-background active:scale-95"
                            >
                                Browse All
                            </Link>
                            <Link
                                href="/submit"
                                className="px-8 py-3 bg-background text-foreground font-bold border border-border hover:bg-muted transition-all active:scale-95"
                            >
                                Contribute
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
