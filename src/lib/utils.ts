import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;

    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}

export function isNewResource(dateAdded: string, daysThreshold = 7): boolean {
    const date = new Date(dateAdded);
    const now = new Date();
    const diffInDays = (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);
    return diffInDays <= daysThreshold;
}

export function getTrustScore(upvotes: number, downvotes: number): number {
    const total = upvotes + downvotes;
    if (total === 0) return 0;
    return (upvotes / total) * 100;
}

export function getWorkingRatio(workingCount: number, brokenCount: number): number {
    const total = workingCount + brokenCount;
    if (total === 0) return 100; // Assume working if no reports
    return (workingCount / total) * 100;
}
