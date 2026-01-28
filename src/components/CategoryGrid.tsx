import type { Category } from '@/types';
import Link from 'next/link';
import { Icon } from '@/components/Icon';

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
                    className="group block border border-border bg-card p-5 hover:border-primary transition-all hover:shadow-lg"
                >
                    <div className="flex items-start gap-4 mb-3">
                        <div className="flex-shrink-0">
                            <Icon
                                name={category.icon || 'folder'}
                                className="h-6 w-6 text-primary group-hover:scale-110 transition-transform"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-1">
                                <h3 className="font-semibold text-base group-hover:text-primary transition-colors truncate">
                                    {category.name}
                                </h3>
                                {category.resourceCount !== undefined && (
                                    <span className="text-xs text-muted-foreground font-mono flex-shrink-0 bg-muted px-2 py-0.5 rounded">
                                        {category.resourceCount}
                                    </span>
                                )}
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                                {category.description}
                            </p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
