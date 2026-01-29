'use client';

import { useEffect, useState, useMemo } from 'react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Skeleton } from '@/components/ui/Skeleton';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Book } from 'lucide-react';

interface GlossaryTerm {
    term: string;
    definition: string;
}

interface GlossaryCategory {
    name: string;
    terms: GlossaryTerm[];
}

export default function GlossaryPage() {
    const [categories, setCategories] = useState<GlossaryCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const loadGlossary = async () => {
            try {
                const response = await fetch('/data/glossary/glossary.json');
                const data = await response.json();
                setCategories(data.categories || []);
            } catch (error) {
                console.error('Failed to load glossary:', error);
            } finally {
                setLoading(false);
            }
        };

        loadGlossary();
    }, []);

    const filteredCategories = useMemo(() => {
        if (!searchQuery.trim()) return categories;
        const query = searchQuery.toLowerCase();

        return categories.map(cat => ({
            ...cat,
            terms: cat.terms.filter(t =>
                t.term.toLowerCase().includes(query) ||
                t.definition.toLowerCase().includes(query)
            )
        })).filter(cat => cat.terms.length > 0);
    }, [categories, searchQuery]);

    if (loading) {
        return (
            <div className="min-h-screen bg-background">
                <div className="border-b border-border bg-card">
                    <div className="container mx-auto px-4 py-8 space-y-4">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-8 w-64" />
                        <Skeleton className="h-4 w-full max-w-xl" />
                    </div>
                </div>
                <div className="container mx-auto px-4 py-8 space-y-12">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="space-y-4">
                            <Skeleton className="h-4 w-24" />
                            <div className="border border-border">
                                <div className="h-10 border-b border-border bg-muted/30" />
                                <div className="p-4 space-y-4">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-full" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="border-b border-border bg-card">
                <div className="container mx-auto px-4 py-8 space-y-4">
                    <Breadcrumbs items={[{ label: 'Glossary' }]} />
                    <div>
                        <h1 className="text-3xl font-black uppercase tracking-tighter mb-1">Glossary</h1>
                        <p className="text-sm text-muted-foreground max-w-xl font-medium leading-relaxed">
                            Essential technical terms and definitions to help you navigate the Resources Hub.
                        </p>
                    </div>
                </div>
            </div>

            {/* Filter Search */}
            <div className="sticky top-14 z-40 bg-background/80 backdrop-blur-md border-b border-border">
                <div className="container mx-auto px-4 py-4">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Filter terms or definitions..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-card border border-border h-10 pl-10 pr-4 text-sm outline-none focus:border-primary transition-colors font-medium"
                        />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="space-y-12">
                    <AnimatePresence mode="wait">
                        {filteredCategories.length > 0 ? (
                            filteredCategories.map((section, idx) => (
                                <motion.div
                                    key={section.name}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                >
                                    {/* Category Header */}
                                    <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 mb-4 flex items-center gap-2">
                                        <div className="h-1 w-8 bg-primary/20" />
                                        {section.name}
                                    </h2>

                                    {/* Table */}
                                    <div className="border border-border bg-card/50 overflow-hidden">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="border-b border-border bg-muted/30">
                                                    <th className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70 px-6 py-3 w-1/4">Term</th>
                                                    <th className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70 px-6 py-3">Definition</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-border/50">
                                                {section.terms.map((item) => (
                                                    <tr
                                                        key={item.term}
                                                        className="hover:bg-muted/30 transition-colors"
                                                    >
                                                        <td className="px-6 py-4 text-sm font-bold align-top text-foreground">
                                                            {item.term}
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-muted-foreground leading-relaxed font-medium">
                                                            {item.definition}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="py-24 text-center border-2 border-dashed border-border rounded-lg bg-card/10">
                                <Book className="h-8 w-8 text-muted-foreground/20 mx-auto mb-4" />
                                <h3 className="text-lg font-bold uppercase tracking-tighter">No terms match your search</h3>
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="mt-4 text-xs font-bold text-primary hover:underline uppercase tracking-widest"
                                >
                                    Reset Discovery
                                </button>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
