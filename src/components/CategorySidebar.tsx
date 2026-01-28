'use client';

import type { Category } from '@/types';
import { FilterPanel } from '@/components/filters/FilterPanel';

interface CategorySidebarProps {
    categories: Category[];
    onSelectCategory: (categoryId: string | null) => void;
    selectedCategory: string | null;
    showFilters?: boolean;
}

export function CategorySidebar({ categories, onSelectCategory, selectedCategory, showFilters = false }: CategorySidebarProps) {
    // Group categories by parent and filter out empty ones
    const parentCategories = categories.filter(c => !c.parentCategory && (c.resourceCount || 0) > 0);

    return (
        <aside className="w-64 flex-shrink-0">
            <div className="sticky top-20 space-y-4">
                {/* Wiki Navigation */}
                <div className="border border-border bg-card">
                    <div className="p-4 border-b border-border">
                        <h2 className="font-bold text-sm uppercase tracking-wide text-muted-foreground">
                            Wiki
                        </h2>
                    </div>

                    <nav className="p-2 space-y-0.5 max-h-[400px] overflow-y-auto">
                        {parentCategories.map((category) => {
                            const subcats = categories.filter(c =>
                                c.parentCategory === category.id && (c.resourceCount || 0) > 0
                            );
                            const isActive = selectedCategory === category.id;
                            const hasActiveSubcat = subcats.some(s => s.id === selectedCategory);

                            return (
                                <div key={category.id} className="space-y-0.5">
                                    <button
                                        onClick={() => onSelectCategory(category.id)}
                                        className={`w-full text-left px-3 py-2 text-sm transition-colors flex items-center gap-2 ${isActive || hasActiveSubcat
                                                ? 'bg-muted text-foreground font-medium'
                                                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                                            }`}
                                    >
                                        <span className={`text-xs ${isActive ? 'opacity-100' : 'opacity-50'}`}>
                                            {category.icon || '📁'}
                                        </span>
                                        <span className="flex-1">{category.name}</span>
                                        {category.resourceCount !== undefined && category.resourceCount > 0 && (
                                            <span className="text-xs opacity-50">
                                                {category.resourceCount}
                                            </span>
                                        )}
                                    </button>

                                    {subcats.length > 0 && (hasActiveSubcat || isActive) && (
                                        <div className="ml-6 space-y-0.5">
                                            {subcats.map((subcat) => (
                                                <button
                                                    key={subcat.id}
                                                    onClick={() => onSelectCategory(subcat.id)}
                                                    className={`w-full text-left px-3 py-1.5 text-sm transition-colors ${selectedCategory === subcat.id
                                                            ? 'text-primary font-medium'
                                                            : 'text-muted-foreground hover:text-foreground'
                                                        }`}
                                                >
                                                    {subcat.name}
                                                    {subcat.resourceCount !== undefined && subcat.resourceCount > 0 && (
                                                        <span className="ml-2 text-xs opacity-50">
                                                            {subcat.resourceCount}
                                                        </span>
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </nav>
                </div>

                {/* Filters Section */}
                {showFilters && <FilterPanel />}
            </div>
        </aside>
    );
}
