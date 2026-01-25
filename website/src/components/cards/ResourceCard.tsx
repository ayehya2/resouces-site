'use client';

import { useState } from 'react';
import type { Resource } from '@/types';
import { ExternalLink, Github, FileText, Download, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import { isNewResource, getTrustScore, getWorkingRatio } from '@/lib/utils';
import { VotingControls } from '../VotingControls';

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

    const getLinkIcon = (type: string) => {
        switch (type) {
            case 'github': return <Github className="h-4 w-4" />;
            case 'documentation': return <FileText className="h-4 w-4" />;
            case 'download': return <Download className="h-4 w-4" />;
            default: return <ExternalLink className="h-4 w-4" />;
        }
    };

    return (
        <article className="border border-border bg-card p-6 hover:border-primary transition-all hover:shadow-lg">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="font-bold text-lg">{resource.title}</h3>
                        {resource.verified && (
                            <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" aria-label="Verified" />
                        )}
                        {isNew && (
                            <span className="px-2 py-0.5 text-xs font-medium bg-primary text-primary-foreground border border-primary">
                                NEW
                            </span>
                        )}
                        {resource.featured && (
                            <span className="px-2 py-0.5 text-xs font-medium bg-accent text-accent-foreground border border-border">
                                FEATURED
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground mb-4">
                {resource.shortDescription}
            </p>

            {/* Expandable Long Description */}
            {resource.longDescription && resource.longDescription !== resource.shortDescription && (
                <div className="mb-4">
                    {expanded && (
                        <p className="text-sm text-foreground mb-2 border-l-2 border-border pl-3">
                            {resource.longDescription}
                        </p>
                    )}
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="text-sm text-primary hover:underline flex items-center gap-1"
                    >
                        {expanded ? (
                            <>
                                <ChevronUp className="h-4 w-4" />
                                Show less
                            </>
                        ) : (
                            <>
                                <ChevronDown className="h-4 w-4" />
                                Read more
                            </>
                        )}
                    </button>
                </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
                {resource.tags.map((tag) => (
                    <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-secondary text-secondary-foreground border border-border hover:border-primary transition-colors cursor-pointer"
                    >
                        #{tag}
                    </span>
                ))}
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-2 mb-4">
                {resource.links.map((link, index) => (
                    <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-2 text-sm border border-border bg-background hover:bg-muted hover:border-primary transition-colors"
                    >
                        {getLinkIcon(link.type)}
                        <span>{link.label}</span>
                    </a>
                ))}
            </div>

            {/* Community Stats */}
            {resource.community && (
                <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                    <VotingControls
                        resourceId={resource.id}
                        upvotes={resource.community.upvotes}
                        downvotes={resource.community.downvotes}
                    />

                    {workingRatio > 0 && (
                        <div className="text-xs">
                            <span className={workingRatio >= 80 ? 'text-green-500' : workingRatio >= 50 ? 'text-yellow-500' : 'text-red-500'}>
                                {workingRatio.toFixed(0)}% working
                            </span>
                        </div>
                    )}
                </div>
            )}

            {/* Metadata */}
            {resource.metadata && (
                <div className="flex flex-wrap gap-2 mt-3 text-xs">
                    {resource.metadata.pricing && (
                        <span className="px-2 py-1 bg-muted text-muted-foreground border border-border uppercase">
                            {resource.metadata.pricing}
                        </span>
                    )}
                    {resource.metadata.openSource && (
                        <span className="px-2 py-1 bg-green-500/10 text-green-500 border border-green-500/20 uppercase">
                            Open Source
                        </span>
                    )}
                    {!resource.metadata.requiresSignup && (
                        <span className="px-2 py-1 bg-blue-500/10 text-blue-500 border border-blue-500/20 uppercase">
                            No Signup
                        </span>
                    )}
                </div>
            )}
        </article>
    );
}
