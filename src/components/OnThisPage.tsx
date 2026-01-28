'use client';

import { useState } from 'react';

interface OnThisPageProps {
    subcategories: {
        id: string;
        name: string;
    }[];
    onFilter: (categoryId: string | null) => void;
    activeFilter: string | null;
}

export function OnThisPage({ subcategories, onFilter, activeFilter }: OnThisPageProps) {
    return (
        <aside className="sticky top-20 w-64 flex-shrink-0 hidden lg:block">
            <div className="border border-border bg-card p-4">
                <h3 className="text-sm font-semibold mb-3 text-foreground">On this page</h3>
                <nav className="space-y-1">
                    <button
                        onClick={() => onFilter(null)}
                        className={`w-full text-left text-sm px-3 py-1.5 transition-colors ${activeFilter === null
                            ? 'bg-primary/10 text-primary font-medium border-l-2 border-primary'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                            }`}
                    >
                        All
                    </button>
                    {subcategories.map((subcat) => (
                        <button
                            key={subcat.id}
                            onClick={() => onFilter(subcat.id)}
                            className={`w-full text-left text-sm px-3 py-1.5 transition-colors ${activeFilter === subcat.id
                                ? 'bg-primary/10 text-primary font-medium border-l-2 border-primary'
                                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                                }`}
                        >
                            {subcat.name}
                        </button>
                    ))}
                </nav>
            </div>
        </aside>
    );
}
