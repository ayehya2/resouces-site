'use client';

import { useMemo } from 'react';
import { useResourceStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import type { Category, Tag } from '@/types';

export function FilterPanel() {
    const { filters, setFilters, clearFilters, categories, tags, resources } = useResourceStore();

    const categoriesWithCounts = useMemo(() => {
        return categories.map((cat: Category) => ({
            ...cat,
            resourceCount: resources.filter(r => r.categories.includes(cat.id)).length
        })).sort((a, b) => a.name.localeCompare(b.name));
    }, [categories, resources]);

    const tagsWithCounts = useMemo(() => {
        return tags.map((tag: Tag) => ({
            ...tag,
            usageCount: resources.filter(r => r.tags.includes(tag.id)).length
        })).sort((a, b) => (b.usageCount || 0) - (a.usageCount || 0));
    }, [tags, resources]);

    const toggleCategory = (categoryId: string) => {
        const newCategories = filters.categories.includes(categoryId)
            ? filters.categories.filter(c => c !== categoryId)
            : [...filters.categories, categoryId];
        setFilters({ categories: newCategories });
    };

    const toggleTag = (tagId: string) => {
        const newTags = filters.tags.includes(tagId)
            ? filters.tags.filter(t => t !== tagId)
            : [...filters.tags, tagId];
        setFilters({ tags: newTags });
    };

    const hasActiveFilters =
        filters.categories.length > 0 ||
        filters.tags.length > 0 ||
        filters.verified ||
        filters.featured ||
        filters.noSignup ||
        filters.openSource;

    return (
        <div className="space-y-6 border border-border bg-card p-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Filters</h2>
                {hasActiveFilters && (
                    <button
                        onClick={clearFilters}
                        className="text-xs text-primary hover:underline font-medium"
                    >
                        Clear all
                    </button>
                )}
            </div>

            {/* Quick Filters */}
            <div className="space-y-2.5">
                <h3 className="text-[11px] font-bold uppercase text-muted-foreground/60 tracking-tight">Status</h3>

                <label className="flex items-center gap-2.5 text-xs cursor-pointer group">
                    <input
                        type="checkbox"
                        checked={filters.verified}
                        onChange={(e) => setFilters({ verified: e.target.checked })}
                        className="w-3.5 h-3.5 rounded-none border-border"
                    />
                    <span className="group-hover:text-primary transition-colors">Verified Only</span>
                </label>

                <label className="flex items-center gap-2.5 text-xs cursor-pointer group">
                    <input
                        type="checkbox"
                        checked={filters.featured}
                        onChange={(e) => setFilters({ featured: e.target.checked })}
                        className="w-3.5 h-3.5 rounded-none border-border"
                    />
                    <span className="group-hover:text-primary transition-colors">Featured</span>
                </label>

                <label className="flex items-center gap-2.5 text-xs cursor-pointer group">
                    <input
                        type="checkbox"
                        checked={filters.openSource}
                        onChange={(e) => setFilters({ openSource: e.target.checked })}
                        className="w-3.5 h-3.5 rounded-none border-border"
                    />
                    <span className="group-hover:text-primary transition-colors">Open Source</span>
                </label>

                <label className="flex items-center gap-2.5 text-xs cursor-pointer group">
                    <input
                        type="checkbox"
                        checked={filters.noSignup}
                        onChange={(e) => setFilters({ noSignup: e.target.checked })}
                        className="w-3.5 h-3.5 rounded-none border-border"
                    />
                    <span className="group-hover:text-primary transition-colors">No Signup</span>
                </label>
            </div>

            {/* Categories */}
            {categoriesWithCounts.length > 0 && (
                <div className="space-y-3">
                    <h3 className="text-[11px] font-bold uppercase text-muted-foreground/60 tracking-tight">Categories</h3>
                    <div className="space-y-1 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                        {categoriesWithCounts.map((category) => (
                            <label
                                key={category.id}
                                className={cn(
                                    "flex items-center gap-2.5 text-xs cursor-pointer py-1 px-1.5 transition-colors -mx-1.5",
                                    filters.categories.includes(category.id) ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted"
                                )}
                            >
                                <input
                                    type="checkbox"
                                    checked={filters.categories.includes(category.id)}
                                    onChange={() => toggleCategory(category.id)}
                                    className="w-3.5 h-3.5 rounded-none border-border"
                                />
                                <span className="flex-1 truncate">{category.name}</span>
                                <span className="text-[10px] text-muted-foreground/60 font-mono">
                                    {category.resourceCount}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>
            )}

            {/* Tags */}
            {tagsWithCounts.length > 0 && (
                <div className="space-y-3">
                    <h3 className="text-[11px] font-bold uppercase text-muted-foreground/60 tracking-tight">Top Tags</h3>
                    <div className="flex flex-wrap gap-1.5">
                        {tagsWithCounts
                            .slice(0, 15)
                            .map((tag) => (
                                <button
                                    key={tag.id}
                                    onClick={() => toggleTag(tag.id)}
                                    className={cn(
                                        "px-2 py-1 text-[10px] border transition-colors font-medium",
                                        filters.tags.includes(tag.id)
                                            ? "bg-primary text-primary-foreground border-primary"
                                            : "bg-background text-muted-foreground border-border hover:border-primary hover:text-primary"
                                    )}
                                >
                                    #{tag.id}
                                </button>
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
}
