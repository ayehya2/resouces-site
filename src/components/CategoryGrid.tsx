import type { Category } from '@/types';
import Link from 'next/link';

interface CategoryGridProps {
    categories: Category[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
    // Filter out categories with 0 resources
    const validCategories = categories.filter(c => (c.resourceCount || 0) > 0);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {validCategories.map((category) => (
                <Link
                    key={category.id}
                    href={`/categories/${category.id}`}
                    className="group block border border-border bg-card p-4 hover:border-primary transition-colors"
                >
                    <div className="flex items-center justify-between gap-3 mb-2">
                        <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                            {category.name}
                        </h3>
                        {category.resourceCount !== undefined && (
                            <span className="text-xs text-muted-foreground font-mono">
                                {category.resourceCount}
                            </span>
                        )}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                        {category.description}
                    </p>
                </Link>
            ))}
        </div>
    );
}
