import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ResourceStore, Resource, Category, Tag, Filters } from '@/types';

const defaultFilters: Filters = {
    categories: [],
    tags: [],
    platforms: [],
    pricing: [],
    verified: false,
    featured: false,
    noSignup: false,
    openSource: false,
    status: ['active'],
};

export const useResourceStore = create<ResourceStore>()(
    persist(
        (set) => ({
            resources: [],
            categories: [],
            tags: [],
            filters: defaultFilters,
            searchQuery: '',
            darkMode: true, // Default to dark mode
            viewMode: 'minimal',
            selectedResourceIds: [],

            setResources: (resources: Resource[]) => set({ resources }),
            setCategories: (categories: Category[]) => set({ categories }),
            setTags: (tags: Tag[]) => set({ tags }),

            setFilters: (newFilters: Partial<Filters>) =>
                set((state) => ({
                    filters: { ...state.filters, ...newFilters },
                })),

            setSearchQuery: (query: string) => set({ searchQuery: query }),

            setViewMode: (viewMode: 'minimal' | 'detailed') => set({ viewMode }),



            toggleDarkMode: () =>
                set((state) => {
                    const newMode = !state.darkMode;
                    // Update document class
                    if (typeof document !== 'undefined') {
                        if (newMode) {
                            document.documentElement.classList.add('dark');
                        } else {
                            document.documentElement.classList.remove('dark');
                        }
                    }
                    return { darkMode: newMode };
                }),

            clearFilters: () => set({ filters: defaultFilters, searchQuery: '' }),
            voteResource: (resourceId: string, type: 'up' | 'down') =>
                set((state) => ({
                    resources: state.resources.map((r) => {
                        if (r.id !== resourceId) return r;
                        const metrics = r.community || { upvotes: 0, downvotes: 0, workingCount: 0, brokenCount: 0, scamReports: 0 };
                        return {
                            ...r,
                            community: {
                                ...metrics,
                                upvotes: type === 'up' ? metrics.upvotes + 1 : metrics.upvotes,
                                downvotes: type === 'down' ? metrics.downvotes + 1 : metrics.downvotes,
                            },
                        };
                    }),
                })),

            toggleResourceSelection: (id: string) =>
                set((state) => ({
                    selectedResourceIds: state.selectedResourceIds.includes(id)
                        ? state.selectedResourceIds.filter((rid) => rid !== id)
                        : [...state.selectedResourceIds, id],
                })),

            clearSelection: () => set({ selectedResourceIds: [] }),

            selectAllVisible: (ids: string[]) =>
                set((state) => ({
                    selectedResourceIds: Array.from(new Set([...state.selectedResourceIds, ...ids])),
                })),
        }),
        {
            name: 'resource-store',
            partialize: (state) => ({
                darkMode: state.darkMode,
                viewMode: state.viewMode,
                selectedResourceIds: state.selectedResourceIds,
            }),
        }
    )
);
