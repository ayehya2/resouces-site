'use client';

import { useState, useMemo } from 'react';
import { useResourceStore } from '@/lib/store';
import { ResourceCard } from './cards/ResourceCard';
import { MinimalResourceList } from './MinimalResourceList';
import { Icon } from './Icon';
import type { Resource } from '@/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ResourceListProps {
    resources: Resource[];
    groupByCategory?: boolean;
    pageSize?: number;
}

export function ResourceList({ resources, groupByCategory = true, pageSize: initialPageSize = 75 }: ResourceListProps) {
    const { viewMode, categories } = useResourceStore();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(initialPageSize);

    // Reset page when resources change
    useMemo(() => {
        setCurrentPage(1);
    }, [resources.length, pageSize]);

    if (resources.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-muted-foreground font-mono text-sm tracking-tight italic">No resources matched your criteria.</p>
            </div>
        );
    }

    const totalPages = Math.ceil(resources.length / pageSize);
    const paginatedResources = resources.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    // Grouping logic for the current page
    const renderGrouped = () => {
        const groupedResources = paginatedResources.reduce((acc, resource) => {
            const primaryCategoryId = resource.categories[0];
            if (!acc[primaryCategoryId]) {
                acc[primaryCategoryId] = [];
            }
            acc[primaryCategoryId].push(resource);
            return acc;
        }, {} as Record<string, Resource[]>);

        return (
            <div className="space-y-8">
                {Object.entries(groupedResources).map(([categoryId, categoryResources]) => {
                    const category = categories.find(c => c.id === categoryId);
                    if (!category) return null;

                    return (
                        <div key={categoryId} id={category.id}>
                            <div className="mb-4 pb-1.5 border-b border-border/50">
                                <h2 className="text-base font-bold flex items-center">
                                    <Icon name={category.icon || 'folder'} className="h-4 w-4 text-primary mr-2" useEmoji />
                                    {category.name}
                                    <span className="text-[11px] font-mono font-normal text-muted-foreground/40 ml-2 pt-0.5">
                                        / {categoryResources.length}
                                    </span>
                                </h2>
                            </div>

                            {viewMode === 'minimal' ? (
                                <MinimalResourceList resources={categoryResources} />
                            ) : (
                                <div className="space-y-4">
                                    {categoryResources.map((resource) => (
                                        <ResourceCard key={resource.id} resource={resource} />
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    };

    const renderFlat = () => {
        if (viewMode === 'minimal') {
            return <MinimalResourceList resources={paginatedResources} />;
        }
        return (
            <div className="space-y-4">
                {paginatedResources.map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} />
                ))}
            </div>
        );
    };

    return (
        <div className="space-y-12">
            {groupByCategory ? renderGrouped() : renderFlat()}

            {/* Pagination Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-8 border-t border-border mt-12">
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Show</span>
                    <select
                        value={pageSize}
                        onChange={(e) => setPageSize(Number(e.target.value))}
                        className="bg-background border border-border text-xs px-2 py-1 focus:outline-none focus:border-primary font-mono"
                    >
                        <option value={75}>75 / Page</option>
                        <option value={100}>100 / Page</option>
                        <option value={150}>150 / Page</option>
                    </select>
                </div>

                {totalPages > 1 && (
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => {
                                setCurrentPage(p => Math.max(1, p - 1));
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            disabled={currentPage === 1}
                            className="p-2 border border-border hover:bg-muted disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                            aria-label="Previous page"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </button>

                        <div className="flex items-center gap-1.5">
                            {Array.from({ length: totalPages }, (_, i) => i + 1)
                                .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                                .map((pageNum, idx, arr) => {
                                    const showEllipsis = idx > 0 && pageNum - arr[idx - 1] > 1;
                                    return (
                                        <div key={pageNum} className="flex items-center gap-1.5">
                                            {showEllipsis && <span className="text-muted-foreground text-xs font-mono">...</span>}
                                            <button
                                                onClick={() => {
                                                    setCurrentPage(pageNum);
                                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                                }}
                                                className={`w-8 h-8 flex items-center justify-center border font-mono text-[11px] transition-all ${currentPage === pageNum
                                                    ? 'bg-primary text-primary-foreground border-primary font-bold shadow-sm shadow-primary/20'
                                                    : 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
                                                    }`}
                                            >
                                                {pageNum}
                                            </button>
                                        </div>
                                    );
                                })}
                        </div>

                        <button
                            onClick={() => {
                                setCurrentPage(p => Math.min(totalPages, p + 1));
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            disabled={currentPage === totalPages}
                            className="p-2 border border-border hover:bg-muted disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                            aria-label="Next page"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                )}

                <div className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest bg-muted px-2 py-1">
                    {currentPage} / {totalPages} Pages
                </div>
            </div>
        </div>
    );
}
