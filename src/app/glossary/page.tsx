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
                <div className="container mx-auto px-4 py-12">
                    <h1 className="text-4xl font-bold mb-4">Glossary</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl">
                        Common technical terms and definitions to help you understand the resources listed on this site.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto space-y-12">
                    {categories.map((section) => (
                        <section key={section.name}>
                            <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-border">
                                {section.name}
                            </h2>
                            <dl className="space-y-6">
                                {section.terms.map((item) => (
                                    <div key={item.term} className="group">
                                        <dt className="text-lg font-semibold text-primary mb-2 flex items-center gap-2">
                                            <span className="text-muted-foreground opacity-50">▸</span>
                                            {item.term}
                                        </dt>
                                        <dd className="text-muted-foreground pl-6 leading-relaxed">
                                            {item.definition}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </section>
                    ))}
                </div>
            </div>
        </div>
    );
}
