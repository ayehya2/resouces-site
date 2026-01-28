'use client';

import { useResourceStore } from '@/lib/store';
import { ResourceCard } from './cards/ResourceCard';
import { MinimalResourceList } from './MinimalResourceList';
import type { Resource } from '@/types';

interface ResourceListProps {
    resources: Resource[];
    groupByCategory?: boolean;
}

export function ResourceList({ resources, groupByCategory = true }: ResourceListProps) {
    const { viewMode, categories } = useResourceStore();

    // Group resources by their primary category
    const groupedResources = groupByCategory
        ? resources.reduce((acc, resource) => {
            const primaryCategoryId = resource.categories[0];
            if (!acc[primaryCategoryId]) {
                acc[primaryCategoryId] = [];
            }
            acc[primaryCategoryId].push(resource);
            return acc;
        }, {} as Record<string, Resource[]>)
        : { all: resources };

    if (resources.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-muted-foreground">No resources found</p>
            </div>
        );
    }

    if (viewMode === 'minimal') {
        return <MinimalResourceList resources={resources} />;
    }

    if (!groupByCategory) {
        return (
            <div className="space-y-4">
                {resources.map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} />
                ))}
            </div>
        );
    }

    // Render grouped by category with headers
    return (
        <div className="space-y-8">
            {Object.entries(groupedResources).map(([categoryId, categoryResources]) => {
                const category = categories.find(c => c.id === categoryId);
                if (!category) return null;

                return (
                    <div key={categoryId}>
                        {/* Category Header */}
                        <div className="mb-4 pb-2 border-b border-border">
                            <h2 className="text-lg font-semibold flex items-center gap-2">
                                {category.icon && <span className="text-xl">{category.icon}</span>}
                                {category.name}
                                <span className="text-sm font-normal text-muted-foreground ml-2">
                                    {categoryResources.length} {categoryResources.length === 1 ? 'resource' : 'resources'}
                                </span>
                            </h2>
                        </div>

                        {/* Resources in this category */}
                        <div className="space-y-4">
                            {categoryResources.map((resource) => (
                                <ResourceCard key={resource.id} resource={resource} />
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
