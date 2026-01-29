'use client';

import { useState, useMemo, useEffect } from 'react';
import { useResourceStore } from '@/lib/store';
import { ResourceCard } from './cards/ResourceCard';
import { MinimalResourceList } from './MinimalResourceList';
import { Icon } from './Icon';
import type { Resource, Category } from '@/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ResourceListProps {
    resources: Resource[];
    groupByCategory?: boolean;
    pageSize?: number;
    showPagination?: boolean;
    onVisibleCategoriesChange?: (categoryIds: string[]) => void;
}

export function ResourceList({
    resources,
    groupByCategory = true,
    pageSize: initialPageSize = 75,
    showPagination = true,
    onVisibleCategoriesChange
}: ResourceListProps) {
    const { viewMode, categories } = useResourceStore();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(initialPageSize);

    const totalPages = Math.ceil(resources.length / pageSize);
    const paginatedResources = useMemo(() => {
        if (!showPagination) return resources;
        return resources.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    }, [resources, currentPage, pageSize, showPagination]);

    // Track visible categories for OnThisPage
    useEffect(() => {
        if (onVisibleCategoriesChange && groupByCategory) {
            const visibleIds = Array.from(new Set(paginatedResources.flatMap(r => r.categories)));
            onVisibleCategoriesChange(visibleIds);
        }
    }, [paginatedResources, onVisibleCategoriesChange, groupByCategory]);

    // Reset page when resources or page size changes
    useEffect(() => {
        setCurrentPage(1);
    }, [resources.length, pageSize]);

    if (resources.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-muted-foreground font-mono text-sm tracking-tight italic">No resources matched your criteria.</p>
            </div>
        );
    }

    // Grouping logic for the current page
    const renderGrouped = () => {
        // First, identify all top-level categories involved
        const topLevelGroups: Record<string, { category: Category; resources: Resource[]; subGroups: Record<string, { category: Category; resources: Resource[] }> }> = {};

        paginatedResources.forEach(resource => {
            const primaryId = resource.categories[0];
            const category = categories.find(c => c.id === primaryId);
            if (!category) return;

            let parentId = category.parentCategory || category.id;
            let parentCategory = categories.find(c => c.id === parentId) || category;

            if (!topLevelGroups[parentCategory.id]) {
                topLevelGroups[parentCategory.id] = {
                    category: parentCategory,
                    resources: [],
                    subGroups: {}
                };
            }

            if (category.id === parentCategory.id) {
                topLevelGroups[parentCategory.id].resources.push(resource);
            } else {
                if (!topLevelGroups[parentCategory.id].subGroups[category.id]) {
                    topLevelGroups[parentCategory.id].subGroups[category.id] = {
                        category,
                        resources: []
                    };
                }
                topLevelGroups[parentCategory.id].subGroups[category.id].resources.push(resource);
            }
        });

        return (
            <div className="space-y-12">
                {Object.values(topLevelGroups).map(({ category, resources: parentResources, subGroups }) => (
                    <div key={category.id} id={category.id} className="space-y-6">
                        {/* Parent Category Header */}
                        <div className="pb-2 border-b-2 border-primary/20">
                            <h2 className="text-lg font-black uppercase tracking-widest flex items-center">
                                <Icon name={category.icon || 'folder'} className="h-5 w-5 text-primary mr-3" />
                                {category.name}
                                <span className="text-xs font-mono font-normal text-muted-foreground/30 ml-4 pt-1">
                                    / {parentResources.length + Object.values(subGroups).reduce((acc, g) => acc + g.resources.length, 0)} TOTAL
                                </span>

                                <button
                                    onClick={() => {
                                        const allIds = [...parentResources, ...Object.values(subGroups).flatMap(g => g.resources)].map(r => r.id);
                                        const currentSelected = useResourceStore.getState().selectedResourceIds;
                                        const allAlreadySelected = allIds.every(id => currentSelected.includes(id));

                                        if (allAlreadySelected) {
                                            // Toggle off if all are selected
                                            useResourceStore.setState({
                                                selectedResourceIds: currentSelected.filter(id => !allIds.includes(id))
                                            });
                                        } else {
                                            useResourceStore.getState().selectAllVisible(allIds);
                                        }
                                    }}
                                    className="ml-auto flex items-center gap-2 text-[10px] font-bold px-3 py-1 bg-muted hover:bg-primary hover:text-primary-foreground border border-border transition-all group/select uppercase tracking-tighter"
                                >
                                    <div className="w-2.5 h-2.5 border border-current rounded-sm flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 bg-current rounded-sm opacity-0 group-hover/select:opacity-100 transition-opacity" />
                                    </div>
                                    Quick Select Category
                                </button>
                            </h2>
                        </div>

                        {/* Top-level resources */}
                        {parentResources.length > 0 && (
                            <div className="space-y-4">
                                {viewMode === 'minimal' ? (
                                    <MinimalResourceList resources={parentResources} />
                                ) : (
                                    parentResources.map(resource => (
                                        <ResourceCard key={resource.id} resource={resource} />
                                    ))
                                )}
                            </div>
                        )}

                        {/* Subcategory groups */}
                        {Object.values(subGroups).map(({ category: subcat, resources: subcatResources }) => (
                            <div key={subcat.id} id={subcat.id} className="ml-4 md:ml-8 space-y-4">
                                <div className="pb-1 border-b border-border/50">
                                    <h3 className="text-sm font-bold flex items-center text-muted-foreground hover:text-foreground transition-colors group">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary/40 mr-2 group-hover:bg-primary transition-colors" />
                                        {subcat.name}
                                        <span className="text-[10px] font-mono font-normal text-muted-foreground/30 ml-2">
                                            / {subcatResources.length}
                                        </span>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                const subIds = subcatResources.map(r => r.id);
                                                const currentSelected = useResourceStore.getState().selectedResourceIds;
                                                const allSubSelected = subIds.every(id => currentSelected.includes(id));

                                                if (allSubSelected) {
                                                    useResourceStore.setState({
                                                        selectedResourceIds: currentSelected.filter(id => !subIds.includes(id))
                                                    });
                                                } else {
                                                    useResourceStore.getState().selectAllVisible(subIds);
                                                }
                                            }}
                                            className="ml-2 opacity-0 group-hover:opacity-100 text-[9px] font-bold text-primary hover:underline transition-opacity uppercase tracking-tighter"
                                        >
                                            [Select All]
                                        </button>
                                    </h3>
                                </div>
                                {viewMode === 'minimal' ? (
                                    <MinimalResourceList resources={subcatResources} />
                                ) : (
                                    <div className="space-y-3">
                                        {subcatResources.map(resource => (
                                            <ResourceCard key={resource.id} resource={resource} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ))}
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
            {showPagination && totalPages > 0 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-8 border-t border-border mt-12 bg-card/30 px-6">
                    <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Show</span>
                        <select
                            value={pageSize}
                            onChange={(e) => setPageSize(Number(e.target.value))}
                            className="bg-background border border-border text-[11px] font-bold px-3 py-1.5 focus:outline-none focus:border-primary font-mono transition-colors cursor-pointer"
                        >
                            <option value={75}>75 / PAGE</option>
                            <option value={100}>100 / PAGE</option>
                            <option value={150}>150 / PAGE</option>
                        </select>
                    </div>

                    {totalPages > 1 && (
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => {
                                    setCurrentPage(p => Math.max(1, p - 1));
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                disabled={currentPage === 1}
                                className="w-10 h-10 flex items-center justify-center border border-border hover:bg-muted disabled:opacity-30 disabled:hover:bg-transparent transition-all transition-colors"
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
                                                {showEllipsis && <span className="text-muted-foreground text-xs font-mono w-4 text-center">...</span>}
                                                <button
                                                    onClick={() => {
                                                        setCurrentPage(pageNum);
                                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                                    }}
                                                    className={`w-10 h-10 flex items-center justify-center border font-mono text-[11px] transition-all ${currentPage === pageNum
                                                        ? 'bg-primary text-primary-foreground border-primary font-bold shadow-lg shadow-primary/20 scale-105'
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
                                className="w-10 h-10 flex items-center justify-center border border-border hover:bg-muted disabled:opacity-30 disabled:hover:bg-transparent transition-all transition-colors"
                                aria-label="Next page"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    )}

                    <div className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest bg-muted px-3 py-1.5 border border-border">
                        PAGE {currentPage} <span className="mx-1 opacity-30">/</span> {totalPages}
                    </div>
                </div>
            )}
        </div>
    );
}
