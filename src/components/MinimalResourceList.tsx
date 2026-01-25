'use client';

import type { Resource } from '@/types';
import { CheckCircle2, ExternalLink } from 'lucide-react';
import { VotingControls } from './VotingControls';

interface MinimalResourceListProps {
    resources: Resource[];
}

export function MinimalResourceList({ resources }: MinimalResourceListProps) {
    return (
        <div className="space-y-1 font-mono text-[13px] leading-relaxed">
            {resources.map((resource) => (
                <div key={resource.id} className="group flex items-start gap-2 py-0.5 hover:bg-muted/50 transition-colors px-2 -mx-2">
                    <span className="text-muted-foreground select-none opacity-50">•</span>

                    <div className="flex-1 flex flex-wrap items-baseline gap-x-2">
                        <div className="flex items-center gap-1.5">
                            <a
                                href={resource.links.find(l => l.type === 'website')?.url || resource.links[0]?.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-bold text-foreground hover:text-primary transition-colors underline decoration-border underline-offset-2"
                            >
                                {resource.title}
                            </a>
                            {resource.verified && (
                                <CheckCircle2 className="h-3 w-3 text-green-500 inline-block" />
                            )}
                        </div>

                        <span className="text-muted-foreground">—</span>

                        <span className="text-muted-foreground">
                            {resource.shortDescription}
                        </span>

                        {resource.links.length > 1 && (
                            <div className="inline-flex items-center text-xs gap-1.5">
                                <span className="text-muted-foreground opacity-50 px-1">/</span>
                                {resource.links.slice(1).map((link, idx) => (
                                    <span key={idx} className="flex items-center gap-1">
                                        <a
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary/80 hover:text-primary transition-colors hover:underline"
                                        >
                                            {link.label}
                                        </a>
                                        {idx < resource.links.length - 2 && <span className="text-muted-foreground opacity-30">|</span>}
                                    </span>
                                ))}
                            </div>
                        )}

                        <div className="inline-flex items-center gap-2 ml-auto">
                            {resource.tags.slice(0, 3).map((tag) => (
                                <span key={tag} className="text-[10px] text-muted-foreground opacity-60 hover:opacity-100 transition-opacity">
                                    #{tag}
                                </span>
                            ))}
                            <VotingControls
                                resourceId={resource.id}
                                upvotes={resource.community?.upvotes || 0}
                                downvotes={resource.community?.downvotes || 0}
                                variant="minimal"
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
