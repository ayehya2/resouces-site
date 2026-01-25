'use client';

import { Moon, Sun, Github } from 'lucide-react';
import { useResourceStore } from '@/lib/store';
import { useEffect, useState } from 'react';

export function Header() {
    const { darkMode, toggleDarkMode } = useResourceStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Apply dark mode on mount
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    if (!mounted) {
        return null;
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <a href="/" className="text-xl font-bold hover:text-primary transition-colors">
                            Resources Wiki
                        </a>
                    </div>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        <a href="/resources" className="text-sm font-medium hover:text-primary transition-colors">
                            Browse
                        </a>
                        <a href="/categories" className="text-sm font-medium hover:text-primary transition-colors">
                            Categories
                        </a>
                        <a href="/submit" className="text-sm font-medium hover:text-primary transition-colors">
                            Submit
                        </a>
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 hover:bg-muted transition-colors border border-transparent hover:border-border"
                            aria-label="Toggle dark mode"
                        >
                            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </button>

                        <a
                            href="https://github.com/ayehya2/resouces-site"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 hover:bg-muted transition-colors border border-transparent hover:border-border"
                            aria-label="View on GitHub"
                        >
                            <Github className="h-5 w-5" />
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
}
