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

            setResources: (resources: Resource[]) => set({ resources }),
            setCategories: (categories: Category[]) => set({ categories }),
            setTags: (tags: Tag[]) => set({ tags }),

            setFilters: (newFilters: Partial<Filters>) =>
                set((state) => ({
                    filters: { ...state.filters, ...newFilters },
                })),

            setSearchQuery: (query: string) => set({ searchQuery: query }),

            setViewMode: (viewMode: 'minimal' | 'detailed') => set({ viewMode }),

            voteResource: async (id: string, type: 'up' | 'down') => {
                // Optimistic update
                set((state) => ({
                    resources: state.resources.map((r) =>
                        r.id === id
                            ? {
                                ...r,
                                community: {
                                    ...r.community!,
                                    upvotes: type === 'up' ? (r.community?.upvotes || 0) + 1 : (r.community?.upvotes || 0),
                                    downvotes: type === 'down' ? (r.community?.downvotes || 0) + 1 : (r.community?.downvotes || 0),
                                },
                            }
                            : r
                    ),
                }));

                try {
                    const response = await fetch('/api/vote', {
                        method: 'POST',
                        body: JSON.stringify({ resourceId: id, type }),
                    });

                    if (!response.ok) {
                        const error = await response.json();
                        console.error('Vote failed:', error);
                        // Revert on error could be added here if needed
                    }
                } catch (error) {
                    console.error('Vote connection error:', error);
                }
            },

            syncVotes: async () => {
                try {
                    const response = await fetch('/api/resources/votes');
                    if (response.ok) {
                        const { votes } = await response.json();
                        set((state) => ({
                            resources: state.resources.map((r) => ({
                                ...r,
                                community: {
                                    ...r.community!,
                                    upvotes: votes[r.id]?.upvotes ?? r.community?.upvotes ?? 0,
                                    downvotes: votes[r.id]?.downvotes ?? r.community?.downvotes ?? 0,
                                },
                            })),
                        }));
                    }
                } catch (error) {
                    console.error('Failed to sync votes:', error);
                }
            },

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
        }),
        {
            name: 'resource-store',
            partialize: (state) => ({
                darkMode: state.darkMode,
                viewMode: state.viewMode,
            }),
        }
    )
);
