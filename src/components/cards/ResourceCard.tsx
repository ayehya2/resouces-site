'use client';

import { useState } from 'react';
import type { Resource } from '@/types';
import { ExternalLink, Github, FileText, Download, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import { isNewResource, getTrustScore, getWorkingRatio } from '@/lib/utils';
import { Icon } from '../Icon';

interface ResourceCardProps {
    resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
    const [expanded, setExpanded] = useState(false);
    const isNew = isNewResource(resource.dateAdded);

    const trustScore = resource.community
        ? getTrustScore(resource.community.upvotes, resource.community.downvotes)
        : 0;

    const workingRatio = resource.community
        ? getWorkingRatio(resource.community.workingCount, resource.community.brokenCount)
        : 100;



    return (
        <article className="border border-border bg-card p-4 hover:border-primary transition-all hover:shadow-lg">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-2">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="font-bold text-base">{resource.title}</h3>
                        {resource.verified && (
                            <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" aria-label="Verified" />
                        )}
                        {isNew && (
                            <span className="px-1.5 py-0.5 text-[9px] font-bold bg-primary text-primary-foreground">
                                NEW
                            </span>
                        )}
                        {resource.featured && (
                            <span className="px-1.5 py-0.5 text-[9px] font-bold bg-accent text-accent-foreground border border-border">
                                FEATURED
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground mb-3">
                {resource.shortDescription}
            </p>

            {/* Expandable Long Description */}
            {resource.longDescription && resource.longDescription !== resource.shortDescription && (
                <div className="mb-3">
                    {expanded && (
                        <p className="text-sm text-foreground mb-2 border-l-2 border-border pl-3">
                            {resource.longDescription}
                        </p>
                    )}
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="text-xs text-primary hover:underline flex items-center gap-1 font-medium"
                    >
                        {expanded ? (
                            <>
                                <ChevronUp className="h-3.5 w-3.5" />
                                Show less
                            </>
                        ) : (
                            <>
                                <ChevronDown className="h-3.5 w-3.5" />
                                Read more
                            </>
                        )}
                    </button>
                </div>
            )}

            {/* Tags and Metadata */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-3">
                <div className="flex flex-wrap gap-1.5">
                    {resource.tags.map((tag) => (
                        <span
                            key={tag}
                            className="text-[10px] text-muted-foreground hover:text-primary transition-colors cursor-pointer font-mono"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>

                {resource.metadata && (
                    <div className="flex flex-wrap gap-1.5 text-[9px] border-l border-border pl-3 ml-1">
                        {resource.metadata.pricing && (
                            <span className="text-muted-foreground uppercase font-bold tracking-tight">
                                {resource.metadata.pricing}
                            </span>
                        )}
                        {resource.metadata.openSource && (
                            <span className="text-green-500 uppercase font-bold tracking-tight">
                                Open Source
                            </span>
                        )}
                        {!resource.metadata.requiresSignup && (
                            <span className="text-blue-500 uppercase font-bold tracking-tight">
                                No Signup
                            </span>
                        )}
                    </div>
                )}
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-2">
                {resource.links.map((link, index) => (
                    <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-1.5 text-xs border border-border bg-background hover:bg-muted hover:border-primary transition-colors font-medium"
                    >
                        <Icon name={link.type || 'website'} className="h-3.5 w-3.5" />
                        <span>{link.label}</span>
                    </a>
                ))}
            </div>
        </article>
    );
}
