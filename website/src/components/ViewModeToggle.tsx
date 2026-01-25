'use client';

import { LayoutList, LayoutGrid } from 'lucide-react';
import { useResourceStore } from '@/lib/store';
import { cn } from '@/lib/utils';

export function ViewModeToggle() {
    const { viewMode, setViewMode } = useResourceStore();

    return (
        <div className="flex items-center border border-border bg-card p-0.5">
            <button
                onClick={() => setViewMode('minimal')}
                className={cn(
                    "flex items-center gap-2 px-3 py-1.5 text-xs font-medium transition-all",
                    viewMode === 'minimal'
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
            >
                <LayoutList className="h-3.5 w-3.5" />
                <span>Minimal</span>
            </button>
            <button
                onClick={() => setViewMode('detailed')}
                className={cn(
                    "flex items-center gap-2 px-3 py-1.5 text-xs font-medium transition-all",
                    viewMode === 'detailed'
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
            >
                <LayoutGrid className="h-3.5 w-3.5" />
                <span>Detailed</span>
            </button>
        </div>
    );
}
