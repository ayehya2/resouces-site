import type { Resource } from '@/types';
import { ResourceCard } from '@/components/cards/ResourceCard';
import { MinimalResourceList } from '@/components/MinimalResourceList';
import { useResourceStore } from '@/lib/store';

interface ResourceListProps {
    resources: Resource[];
}

export function ResourceList({ resources }: ResourceListProps) {
    const viewMode = useResourceStore((state) => state.viewMode);

    if (resources.length === 0) {
        return (
            <div className="text-center py-12 text-muted-foreground">
                <p>No resources found.</p>
            </div>
        );
    }

    if (viewMode === 'minimal') {
        return <MinimalResourceList resources={resources} />;
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {resources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
            ))}
        </div>
    );
}
