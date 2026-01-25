'use client';

import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { useResourceStore } from '@/lib/store';
import { cn } from '@/lib/utils';

interface VotingControlsProps {
    resourceId: string;
    upvotes: number;
    downvotes: number;
    variant?: 'minimal' | 'detailed';
}

export function VotingControls({ resourceId, upvotes, downvotes, variant = 'detailed' }: VotingControlsProps) {
    const voteResource = useResourceStore((state) => state.voteResource);

    if (variant === 'minimal') {
        return (
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground ml-2">
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        voteResource(resourceId, 'up');
                    }}
                    className="hover:text-primary transition-colors flex items-center gap-0.5"
                    title="Upvote"
                >
                    <ThumbsUp className="h-2.5 w-2.5" />
                    <span>{upvotes}</span>
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        voteResource(resourceId, 'down');
                    }}
                    className="hover:text-destructive transition-colors flex items-center gap-0.5"
                    title="Downvote"
                >
                    <ThumbsDown className="h-2.5 w-2.5" />
                    <span>{downvotes}</span>
                </button>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <button
                onClick={(e) => {
                    e.preventDefault();
                    voteResource(resourceId, 'up');
                }}
                className="flex items-center gap-1.5 hover:text-primary transition-colors group"
            >
                <ThumbsUp className="h-3.5 w-3.5 group-hover:scale-110 transition-transform" />
                <span>{upvotes}</span>
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    voteResource(resourceId, 'down');
                }}
                className="flex items-center gap-1.5 hover:text-destructive transition-colors group"
            >
                <ThumbsDown className="h-3.5 w-3.5 group-hover:scale-110 transition-transform" />
                <span>{downvotes}</span>
            </button>
        </div>
    );
}
