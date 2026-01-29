'use client';

import { useEffect, useState } from 'react';
import { useResourceStore } from '@/lib/store';
import { loadResources, loadCategories, loadTags, loadMetadata } from '@/lib/data';
import { CategoryGrid } from '@/components/CategoryGrid';
import { ResourceList } from '@/components/ResourceList';
import { CategoryCardSkeleton, ResourceCardSkeleton } from '@/components/ui/Skeleton';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HomePage() {
    const { resources, categories, setResources, setCategories, setTags } = useResourceStore();
    const [stats, setStats] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

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
            setIsLoading(false);
        };

        loadData();
    }, [setResources, setCategories, setTags]);

    const categoriesWithCounts = categories;

    // Calculate categories that have resources (used categories)
    const usedCategories = categoriesWithCounts.filter(cat => (cat.resourceCount || 0) > 0);

    // Limit featured categories to 9 maximum, only show those with resources
    const featuredCategories = categoriesWithCounts
        .filter(cat => cat.featured && (cat.resourceCount || 0) > 0)
        .slice(0, 9);
    const recentResources = resources
        .filter(r => r.status === 'active')
        .sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
        .slice(0, 6);

    return (
        <div className="w-full">
            {/* Hero Section */}
            <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-background to-card">
                <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto text-center space-y-12"
                    >
                        <div className="space-y-4">
                            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground uppercase">
                                Resources <span className="text-primary italic">Hub</span>
                            </h1>
                            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
                                A high-density, community-curated directory of technical tools and learning materials.
                                <span className="hidden md:inline"> Manually vetted for excellence.</span>
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-8 pt-6 max-w-2xl mx-auto border-t border-border/50">
                            <div className="text-center group">
                                <div className="text-2xl md:text-3xl font-mono font-bold text-foreground group-hover:text-primary transition-colors">
                                    {stats?.totalResources || resources.length}
                                </div>
                                <div className="text-[9px] md:text-[10px] uppercase tracking-widest text-muted-foreground font-bold mt-1 opacity-70">
                                    Total Resources
                                </div>
                            </div>

                            <div className="text-center group border-x border-border/30 px-4">
                                <div className="text-2xl md:text-3xl font-mono font-bold text-foreground group-hover:text-primary transition-colors">
                                    {usedCategories.length}
                                </div>
                                <div className="text-[9px] md:text-[10px] uppercase tracking-widest text-muted-foreground font-bold mt-1 opacity-70">
                                    Used Domains
                                </div>
                                <div className="flex items-center justify-center gap-2 mt-2 text-[8px] font-mono text-muted-foreground/40">
                                    <span className="bg-muted/50 px-1.5 py-0.5 border border-border/50">Total: {categories.length}</span>
                                    <span className="bg-muted/50 px-1.5 py-0.5 border border-border/50 text-orange-500/60">Unused: {categories.length - usedCategories.length}</span>
                                </div>
                            </div>

                            <div className="text-center group">
                                <div className="text-2xl md:text-3xl font-mono font-bold text-foreground group-hover:text-primary transition-colors">
                                    {stats?.verifiedResources || resources.filter(r => r.verified).length}
                                </div>
                                <div className="text-[9px] md:text-[10px] uppercase tracking-widest text-muted-foreground font-bold mt-1 opacity-70">
                                    Verified Entries
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Featured Categories */}
            <section className="border-b border-border bg-background">
                <div className="container mx-auto px-4 py-16">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-bold tracking-tight uppercase border-l-4 border-primary pl-4">
                            Featured Sections
                        </h2>
                        <Link href="/categories" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                            View Categories →
                        </Link>
                    </div>
                    {isLoading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {[...Array(6)].map((_, i) => <CategoryCardSkeleton key={i} />)}
                        </div>
                    ) : (
                        <CategoryGrid categories={featuredCategories} />
                    )}
                </div>
            </section>

            {/* Recent Resources */}
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
                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[...Array(4)].map((_, i) => <ResourceCardSkeleton key={i} />)}
                        </div>
                    ) : (
                        <ResourceList resources={recentResources} groupByCategory={false} showPagination={false} />
                    )}
                </div>
            </section>

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
