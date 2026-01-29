'use client';

import { cn } from '@/lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Skeleton({ className, ...props }: SkeletonProps) {
    return (
        <div
            className={cn(
                "animate-pulse bg-muted/40",
                className
            )}
            {...props}
        />
    );
}

export function ResourceCardSkeleton() {
    return (
        <div className="border border-border p-4 space-y-4">
            <div className="flex items-start justify-between">
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-4 w-12" />
            </div>
            <Skeleton className="h-10 w-full" />
            <div className="flex gap-2">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-12" />
            </div>
            <div className="flex gap-2">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-24" />
            </div>
        </div>
    );
}

export function CategoryCardSkeleton() {
    return (
        <div className="border border-border p-5 flex items-start gap-4">
            <Skeleton className="h-6 w-6 rounded-md" />
            <div className="flex-1 space-y-2">
                <div className="flex justify-between">
                    <Skeleton className="h-5 w-1/3" />
                    <Skeleton className="h-4 w-8" />
                </div>
                <Skeleton className="h-8 w-full" />
            </div>
        </div>
    );
}
