'use client';

import { Github, PlusCircle, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function SubmitPage() {
    return (
        <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-3xl mx-auto space-y-12">
                {/* Header */}
                <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Submit a Resource</h1>
                    <p className="text-xl text-muted-foreground">
                        Help us expand the most comprehensive directory of technical tools and materials.
                    </p>
                </div>

                {/* Contribution Methods */}
                <div className="grid gap-6">
                    <a
                        href="https://github.com/ayehya2/resouces-site/issues/new?template=resource_suggestion.md"
                        className="flex items-center gap-6 p-8 border border-border bg-card hover:border-primary transition-all group"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform">
                            <PlusCircle className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-1">Suggest via Issue</h3>
                            <p className="text-muted-foreground">The easiest way. Just fill out a simple template on GitHub.</p>
                        </div>
                        <Github className="h-5 w-5 text-muted-foreground opacity-50" />
                    </a>

                    <a
                        href="https://github.com/ayehya2/resouces-site/pulls"
                        className="flex items-center gap-6 p-8 border border-border bg-card hover:border-primary transition-all group"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center border border-secondary/20 group-hover:scale-110 transition-transform">
                            <PlusCircle className="h-6 w-6 text-secondary" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-1">Direct Contribution (PR)</h3>
                            <p className="text-muted-foreground">Add resources directly to our JSON files for faster integration.</p>
                        </div>
                        <Github className="h-5 w-5 text-muted-foreground opacity-50" />
                    </a>
                </div>

                {/* Submission Guidelines */}
                <div className="space-y-8 pt-8">
                    <h2 className="text-2xl font-bold border-b border-border pb-4">Submission Guidelines</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 font-semibold">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                <span>What we look for:</span>
                            </div>
                            <ul className="text-muted-foreground text-sm space-y-2 list-disc pl-5">
                                <li>High-quality technical documentation</li>
                                <li>Free or exceptionally valuable freemium tools</li>
                                <li>Open source repositories with active maintenance</li>
                                <li>Privacy-respecting services</li>
                            </ul>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 font-semibold">
                                <ShieldCheck className="h-4 w-4 text-primary" />
                                <span>Vetting Process:</span>
                            </div>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Every submission is manually reviewed by our maintainers to ensure it meets our quality standards.
                                We prioritize resources that are accessible, well-documented, and community-driven.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
