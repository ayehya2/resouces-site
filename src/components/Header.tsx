'use client';

import { Moon, Sun, Github, Search } from 'lucide-react';
import { useResourceStore } from '@/lib/store';
import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createSearchIndex, searchResources } from '@/lib/search';
import type { Resource, Category } from '@/types';

export function Header() {
    const { darkMode, toggleDarkMode, resources, categories } = useResourceStore();
    const [mounted, setMounted] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                setShowSearch(true);
            }
            if (e.key === 'Escape') {
                setShowSearch(false);
                setSearchValue('');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Live search results
    const searchResults = useMemo(() => {
        if (!searchValue.trim() || resources.length === 0) return { categories: [], resources: [] };

        const query = searchValue.toLowerCase();

        // Search categories
        const matchedCategories = categories
            .filter(cat =>
                cat.name.toLowerCase().includes(query) ||
                cat.description.toLowerCase().includes(query)
            )
            .slice(0, 5);

        // Search resources
        const searchIndex = createSearchIndex(resources);
        const matchedResources = searchResources(searchIndex, searchValue).slice(0, 10);

        return {
            categories: matchedCategories,
            resources: matchedResources
        };
    }, [searchValue, resources, categories]);

    const handleResourceClick = (resourceId: string) => {
        useResourceStore.getState().setSearchQuery(searchValue);
        router.push(`/resources`);
        setShowSearch(false);
        setSearchValue('');
    };

    const handleCategoryClick = (categoryId: string) => {
        router.push(`/categories/${categoryId}`);
        setShowSearch(false);
        setSearchValue('');
    };

    if (!mounted) {
        return null;
    }

    const hasResults = searchResults.categories.length > 0 || searchResults.resources.length > 0;

    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
                <div className="container mx-auto px-4">
                    <div className="flex h-14 items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="text-lg font-bold hover:text-primary transition-colors">
                            Resources Wiki
                        </Link>

                        <div className="flex items-center gap-6">
                            {/* Search Button */}
                            <button
                                onClick={() => setShowSearch(true)}
                                className="flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <Search className="h-4 w-4" />
                                <span className="hidden sm:inline">Search</span>
                                <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 border border-border bg-muted px-1.5 font-mono text-[10px] font-medium">
                                    <span className="text-xs">Ctrl</span>K
                                </kbd>
                            </button>

                            {/* Navigation */}
                            <nav className="hidden md:flex items-center gap-6">
                                <Link href="/resources" className="text-sm hover:text-primary transition-colors">
                                    Browse
                                </Link>
                                <Link href="/categories" className="text-sm hover:text-primary transition-colors">
                                    Categories
                                </Link>
                                <Link href="/glossary" className="text-sm hover:text-primary transition-colors">
                                    Glossary
                                </Link>
                            </nav>

                            {/* Actions */}
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={toggleDarkMode}
                                    className="p-2 hover:bg-muted transition-colors"
                                    aria-label="Toggle dark mode"
                                >
                                    {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                                </button>

                                <a
                                    href="https://github.com/ayehya2/resouces-site"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 hover:bg-muted transition-colors"
                                    aria-label="View on GitHub"
                                >
                                    <Github className="h-4 w-4" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Search Modal */}
            {showSearch && (
                <div
                    className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
                    onClick={() => {
                        setShowSearch(false);
                        setSearchValue('');
                    }}
                >
                    <div className="fixed left-1/2 top-20 -translate-x-1/2 w-full max-w-2xl px-4">
                        <div onClick={(e) => e.stopPropagation()} className="bg-card border border-border shadow-2xl">
                            {/* Search Input */}
                            <div className="relative border-b border-border">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Search resources..."
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                    className="w-full h-12 pl-12 pr-4 bg-transparent focus:outline-none text-sm"
                                    autoFocus
                                />
                            </div>

                            {/* Results */}
                            {searchValue.trim() && (
                                <div className="max-h-[500px] overflow-y-auto">
                                    {hasResults ? (
                                        <>
                                            {/* Categories */}
                                            {searchResults.categories.length > 0 && (
                                                <div className="p-3 border-b border-border">
                                                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 px-2">
                                                        Categories
                                                    </div>
                                                    <div className="space-y-1">
                                                        {searchResults.categories.map((cat) => (
                                                            <button
                                                                key={cat.id}
                                                                onClick={() => handleCategoryClick(cat.id)}
                                                                className="w-full text-left px-3 py-2 hover:bg-muted transition-colors text-sm flex items-center gap-2"
                                                            >
                                                                <span className="text-xs opacity-50">{cat.icon || '📁'}</span>
                                                                <span className="font-medium">{cat.name}</span>
                                                                <span className="text-xs text-muted-foreground ml-auto">Category</span>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Resources */}
                                            {searchResults.resources.length > 0 && (
                                                <div className="p-3">
                                                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 px-2">
                                                        Resources
                                                    </div>
                                                    <div className="space-y-1">
                                                        {searchResults.resources.map((resource) => (
                                                            <button
                                                                key={resource.id}
                                                                onClick={() => handleResourceClick(resource.id)}
                                                                className="w-full text-left px-3 py-2 hover:bg-muted transition-colors"
                                                            >
                                                                <div className="text-sm font-medium mb-1">{resource.title}</div>
                                                                <div className="text-xs text-muted-foreground line-clamp-1">
                                                                    {resource.shortDescription}
                                                                </div>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <div className="p-8 text-center text-sm text-muted-foreground">
                                            No results found for "{searchValue}"
                                        </div>
                                    )}
                                </div>
                            )}

                            {!searchValue.trim() && (
                                <div className="p-8 text-center text-sm text-muted-foreground">
                                    Start typing to search...
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
