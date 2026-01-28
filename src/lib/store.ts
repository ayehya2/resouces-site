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
