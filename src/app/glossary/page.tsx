'use client';

import { useEffect, useState } from 'react';

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

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <p className="text-muted-foreground">Loading glossary...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="border-b border-border bg-card">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-2xl font-bold mb-1">Glossary</h1>
                    <p className="text-sm text-muted-foreground">
                        Common technical terms and definitions to help you understand the resources
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="space-y-8">
                    {categories.map((section) => (
                        <div key={section.name}>
                            {/* Category Header */}
                            <h2 className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-3">
                                {section.name}
                            </h2>

                            {/* Table */}
                            <div className="border border-border bg-card">
                                <table className="w-full">
                                    <thead className="border-b border-border bg-muted/30">
                                        <tr>
                                            <th className="text-left text-xs font-semibold px-4 py-2 w-1/4">Term</th>
                                            <th className="text-left text-xs font-semibold px-4 py-2">Definition</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {section.terms.map((item, index) => (
                                            <tr
                                                key={item.term}
                                                className={index !== section.terms.length - 1 ? 'border-b border-border' : ''}
                                            >
                                                <td className="px-4 py-3 text-sm font-medium align-top">
                                                    {item.term}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-muted-foreground">
                                                    {item.definition}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
