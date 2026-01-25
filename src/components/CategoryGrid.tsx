import type { Category } from '@/types';
import { cn } from '@/lib/utils';

interface CategoryGridProps {
    categories: Category[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {categories.map((category) => (
                <a
                    key={category.id}
                    href={`/resources?category=${category.id}`}
                    className="group block border border-border bg-card p-6 hover:border-primary transition-all hover:shadow-lg"
                >
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors truncate">
                                {category.name}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                                {category.description}
                            </p>
                        </div>
                        {category.color && (
                            <div
                                className="w-3 h-3 flex-shrink-0 mt-1 border border-border"
                                style={{ backgroundColor: category.color }}
                            />
                        )}
                    </div>

                    {category.resourceCount !== undefined && (
                        <div className="mt-4 text-xs text-muted-foreground">
                            {category.resourceCount} {category.resourceCount === 1 ? 'resource' : 'resources'}
                        </div>
                    )}
                </a>
            ))}
        </div>
    );
}
