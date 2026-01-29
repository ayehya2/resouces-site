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
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
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

    const [visibleCategoryIds, setVisibleCategoryIds] = useState<string[]>([]);
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
        };

        loadData();
    }, [setResources, setCategories, setTags, params.id]);

    // Get current category
    const currentCategory = categories.find(c => c.id === (selectedCategory || params.id));

    // Filter resources
    const displayedResources = useMemo(() => {
        if (!currentCategory) return [];

        let filtered = resources.filter(r => {
            const filterCat = subcategoryFilter || currentCategory.id;
            return r.categories.includes(filterCat);
        });

        return filtered.filter(r => r.status === 'active');
    }, [resources, currentCategory, subcategoryFilter]);

    // Use pre-calculated counts from metadata sync
    const categoriesWithCounts = categories;

    // Derive nav items
    const navItems = useMemo(() => {
        return categories
            .filter(c => visibleCategoryIds.includes(c.id))
            .map(c => ({
                id: c.id,
                name: c.name,
                isSubcategory: c.parentCategory === currentCategory?.id
            }));
    }, [visibleCategoryIds, categories, currentCategory]);

    if (!currentCategory) {
        return (
            <div className="container mx-auto px-4 py-24 text-center space-y-4">
                <h1 className="text-2xl font-bold">Category not found</h1>
                <p className="text-muted-foreground">The requested domain doesn&apos;t exist or has been moved.</p>
                <Link href="/categories" className="inline-flex items-center gap-2 text-primary hover:underline font-bold uppercase text-xs tracking-widest">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Categories
                </Link>
            </div>
        );
    }

    const breadcrumbItems: { label: string; href?: string }[] = [
        { label: 'Categories', href: '/categories' }
    ];

    if (currentCategory.parentCategory) {
        const parent = categories.find(c => c.id === currentCategory.parentCategory);
        if (parent) {
            breadcrumbItems.push({ label: parent.name, href: `/categories/${parent.id}` });
        }
    }

    breadcrumbItems.push({ label: currentCategory.name });

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="border-b border-border bg-card">
                <div className="container mx-auto px-4 py-8">
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-4"
                    >
                        <Breadcrumbs items={breadcrumbItems} />
                        <div>
                            <h1 className="text-3xl font-black uppercase tracking-tighter mb-1">{currentCategory.name}</h1>
                            <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed font-medium">
                                {currentCategory.description}
                            </p>
                        </div>
                    </motion.div>
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

                        <ResourceList
                            resources={displayedResources}
                            groupByCategory={true}
                            onVisibleCategoriesChange={setVisibleCategoryIds}
                        />
                    </main>

                    {/* Right Sidebar - "On this page" */}
                    <OnThisPage
                        items={navItems}
                        onFilter={setSubcategoryFilter}
                        activeFilter={subcategoryFilter}
                    />
                </div>
            </div>
        </div>
    );
}
