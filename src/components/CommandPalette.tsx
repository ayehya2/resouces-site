'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
    Search,
    Command,
    Moon,
    Sun,
    Download,
    Rocket,
    Book,
    Hash,
    Folder,
    ExternalLink,
    X,
    Keyboard
} from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from './ui/Dialog';
import { useResourceStore } from '@/lib/store';
import Fuse from 'fuse.js';

export function CommandPalette() {
    const [open, setOpen] = React.useState(false);
    const [query, setQuery] = React.useState('');
    const router = useRouter();
    const {
        resources,
        categories,
        darkMode,
        toggleDarkMode,
        selectedResourceIds,
        clearSelection
    } = useResourceStore();

    // Setup Fuzzy Search
    const fuseResources = React.useMemo(() => new Fuse(resources, {
        keys: ['title', 'shortDescription', 'tags', 'categories'],
        threshold: 0.3,
        distance: 100
    }), [resources]);

    const fuseCategories = React.useMemo(() => new Fuse(categories, {
        keys: ['name', 'description'],
        threshold: 0.3
    }), [categories]);

    // Keyboard Shortcuts
    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    const resourceResults = React.useMemo(() => {
        if (!query) return [];
        return fuseResources.search(query).slice(0, 5);
    }, [query, fuseResources]);

    const categoryResults = React.useMemo(() => {
        if (!query) return [];
        return fuseCategories.search(query).slice(0, 3);
    }, [query, fuseCategories]);

    const runAction = (callback: () => void) => {
        callback();
        setOpen(false);
        setQuery('');
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-2xl p-0 overflow-hidden border-none shadow-2xl bg-card">
                <div className="flex items-center border-b border-border/50 px-4">
                    <Search className="h-5 w-5 text-muted-foreground mr-3" />
                    <input
                        autoFocus
                        placeholder="Search resources, categories, or actions... (Cmd+K)"
                        className="w-full h-14 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground font-medium"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                        <span className="text-xs">⌘</span>K
                    </kbd>
                </div>

                <div className="max-h-[60vh] overflow-y-auto p-2">
                    {query === '' && (
                        <div className="space-y-4 py-2">
                            {/* Actions Group */}
                            <section>
                                <h3 className="px-2 mb-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">Quick Actions</h3>
                                <div className="grid grid-cols-1 gap-1">
                                    <button
                                        onClick={() => runAction(toggleDarkMode)}
                                        className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg hover:bg-muted text-sm transition-colors group"
                                    >
                                        <div className="h-8 w-8 rounded-md bg-sky-500/10 text-sky-500 flex items-center justify-center group-hover:bg-sky-500 group-hover:text-white transition-all">
                                            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                                        </div>
                                        <div className="flex flex-col items-start translate-y-[-1px]">
                                            <span className="font-bold">Toggle Dark Mode</span>
                                            <span className="text-[10px] text-muted-foreground uppercase opacity-60">Switch visual theme</span>
                                        </div>
                                    </button>

                                    {selectedResourceIds.length > 0 && (
                                        <button
                                            onClick={() => runAction(clearSelection)}
                                            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg hover:bg-red-500/10 text-sm transition-colors group"
                                        >
                                            <div className="h-8 w-8 rounded-md bg-red-500/10 text-red-500 flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-all">
                                                <X className="h-4 w-4" />
                                            </div>
                                            <div className="flex flex-col items-start translate-y-[-1px]">
                                                <span className="font-bold text-red-500/90 group-hover:text-red-500 transition-colors">Clear Selection</span>
                                                <span className="text-[10px] text-muted-foreground uppercase opacity-60">Deselect {selectedResourceIds.length} items</span>
                                            </div>
                                        </button>
                                    )}
                                </div>
                            </section>

                            {/* Pages Group */}
                            <section>
                                <h3 className="px-2 mb-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">Navigation</h3>
                                <div className="grid grid-cols-1 gap-1">
                                    {[
                                        { label: 'Resources', icon: Book, href: '/resources', color: 'bg-emerald-500/10 text-emerald-500' },
                                        { label: 'Categories', icon: Folder, href: '/categories', color: 'bg-amber-500/10 text-amber-500' },
                                        { label: 'Glossary', icon: Keyboard, href: '/glossary', color: 'bg-purple-500/10 text-purple-500' },
                                        { label: 'Submit New', icon: Rocket, href: '/submit', color: 'bg-orange-500/10 text-orange-500' },
                                    ].map((item) => (
                                        <button
                                            key={item.href}
                                            onClick={() => runAction(() => router.push(item.href))}
                                            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg hover:bg-muted text-sm transition-colors group text-left"
                                        >
                                            <div className={`h-8 w-8 rounded-md ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                                <item.icon className="h-4 w-4" />
                                            </div>
                                            <span className="font-bold">{item.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </section>
                        </div>
                    )}

                    {query !== '' && (
                        <div className="space-y-4 py-2 text-left">
                            {/* Resource Results */}
                            {resourceResults.length > 0 && (
                                <section>
                                    <h3 className="px-2 mb-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">Resources</h3>
                                    <div className="space-y-1">
                                        {resourceResults.map(({ item }) => (
                                            <button
                                                key={item.id}
                                                onClick={() => {
                                                    const url = item.links.find(l => l.type === 'website')?.url || item.links[0]?.url;
                                                    if (url) window.open(url, '_blank');
                                                    setOpen(false);
                                                }}
                                                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors group"
                                            >
                                                <div className="flex flex-col min-w-0">
                                                    <span className="font-bold truncate">{item.title}</span>
                                                    <span className="text-xs text-muted-foreground truncate">{item.shortDescription}</span>
                                                </div>
                                                <ExternalLink className="h-4 w-4 text-muted-foreground/30 group-hover:text-primary transition-colors flex-shrink-0" />
                                            </button>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Category Results */}
                            {categoryResults.length > 0 && (
                                <section>
                                    <h3 className="px-2 mb-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">Categories</h3>
                                    <div className="space-y-1">
                                        {categoryResults.map(({ item }) => (
                                            <button
                                                key={item.id}
                                                onClick={() => runAction(() => router.push(`/resources?category=${item.id}`))}
                                                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors group"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="h-8 w-8 rounded bg-muted flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                                        <Folder className="h-4 w-4" />
                                                    </div>
                                                    <span className="font-bold">{item.name}</span>
                                                </div>
                                                <span className="text-[10px] font-mono font-bold px-2 py-1 bg-muted rounded uppercase opacity-60">View</span>
                                            </button>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {resourceResults.length === 0 && categoryResults.length === 0 && (
                                <div className="py-12 text-center">
                                    <p className="text-sm text-muted-foreground italic tracking-tight font-mono">
                                        No matches found for &ldquo;{query}&rdquo;
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="border-t border-border/50 p-2 bg-muted/30 flex items-center justify-between text-[10px] font-mono text-muted-foreground/50 uppercase tracking-widest">
                    <div className="flex gap-4 px-2">
                        <span><kbd className="bg-muted px-1 rounded border border-border">↑↓</kbd> Navigate</span>
                        <span><kbd className="bg-muted px-1 rounded border border-border">Enter</kbd> Select</span>
                        <span><kbd className="bg-muted px-1 rounded border border-border">Esc</kbd> Close</span>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
