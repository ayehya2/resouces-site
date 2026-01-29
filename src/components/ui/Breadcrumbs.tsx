'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
    className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
    return (
        <nav className={cn("flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground", className)}>
            <Link
                href="/"
                className="hover:text-primary transition-colors flex items-center gap-1"
                title="Home"
            >
                <Home className="h-3 w-3" />
            </Link>

            {items.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                    <ChevronRight className="h-3 w-3 text-muted-foreground/30" />
                    {item.href ? (
                        <Link
                            href={item.href}
                            className="hover:text-primary transition-colors"
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span className="text-foreground">{item.label}</span>
                    )}
                </div>
            ))}
        </nav>
    );
}
