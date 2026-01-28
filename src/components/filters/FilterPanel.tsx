'use client';

import { useMemo } from 'react';
import { useResourceStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import type { Category, Tag } from '@/types';

export function FilterPanel() {
    const { filters, setFilters, clearFilters, categories, tags, resources } = useResourceStore();

    const categoriesWithCounts = useMemo(() => {
        return categories
            .filter(cat => (cat.resourceCount || 0) > 0)
            .sort((a, b) => a.name.localeCompare(b.name));
    }, [categories]);

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

    const Checkbox = ({ checked, onChange, label, count }: { checked: boolean; onChange: (v: boolean) => void; label: string; count?: number }) => (
        <label className="flex items-center gap-2 text-[11px] font-medium cursor-pointer group py-1 px-2 -mx-2 hover:bg-muted/50 transition-all rounded-none border-l-2 border-transparent hover:border-primary/50">
            <div className="relative flex items-center justify-center">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                    className="appearance-none w-3.5 h-3.5 border border-border bg-background checked:bg-primary checked:border-primary transition-all rounded-none cursor-pointer"
                />
                {checked && (
                    <svg
                        className="absolute w-2 h-2 text-primary-foreground pointer-events-none"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="4"
                    >
                        <path d="M5 13l4 4L19 7" />
                    </svg>
                )}
            </div>
            <span className={cn("transition-colors", checked ? "text-foreground" : "text-muted-foreground group-hover:text-foreground")}>
                {label}
            </span>
            {count !== undefined && (
                <span className="text-[10px] font-mono text-muted-foreground opacity-20 ml-1.5 pt-0.5">
                    ({count})
                </span>
            )}
        </label>
    );

    return (
        <div className="space-y-6 border border-border bg-card p-5 shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between pb-1.5 border-b border-border/50">
                <h2 className="font-bold text-[10px] uppercase tracking-[0.2em] text-muted-foreground/80">Filters</h2>
                {hasActiveFilters && (
                    <button
                        onClick={clearFilters}
                        className="text-[10px] uppercase tracking-wider text-primary hover:text-primary/80 transition-colors font-bold"
                    >
                        Reset
                    </button>
                )}
            </div>

            {/* Quick Filters */}
            <div className="space-y-3">
                <h3 className="text-[10px] font-black uppercase text-muted-foreground/40 tracking-widest">Metadata</h3>
                <div className="space-y-0">
                    <Checkbox label="Verified Only" checked={filters.verified} onChange={(v) => setFilters({ verified: v })} />
                    <Checkbox label="Featured" checked={filters.featured} onChange={(v) => setFilters({ featured: v })} />
                    <Checkbox label="Open Source" checked={filters.openSource} onChange={(v) => setFilters({ openSource: v })} />
                    <Checkbox label="No Signup" checked={filters.noSignup} onChange={(v) => setFilters({ noSignup: v })} />
                </div>
            </div>

            {/* Categories */}
            {categoriesWithCounts.length > 0 && (
                <div className="space-y-3">
                    <h3 className="text-[10px] font-black uppercase text-muted-foreground/40 tracking-widest">Domains</h3>
                    <div className="space-y-0 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                        {categoriesWithCounts.map((category) => (
                            <Checkbox
                                key={category.id}
                                label={category.name}
                                count={category.resourceCount}
                                checked={filters.categories.includes(category.id)}
                                onChange={() => toggleCategory(category.id)}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Tags */}
            {tagsWithCounts.length > 0 && (
                <div className="space-y-3">
                    <h3 className="text-[10px] font-black uppercase text-muted-foreground/40 tracking-widest">Popular Tags</h3>
                    <div className="flex flex-wrap gap-1">
                        {tagsWithCounts
                            .slice(0, 12)
                            .map((tag) => (
                                <button
                                    key={tag.id}
                                    onClick={() => toggleTag(tag.id)}
                                    className={cn(
                                        "px-2 py-0.5 text-[9px] border transition-all font-bold uppercase tracking-tight",
                                        filters.tags.includes(tag.id)
                                            ? "bg-primary text-primary-foreground border-primary"
                                            : "bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-primary"
                                    )}
                                >
                                    {tag.id}
                                </button>
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
}
