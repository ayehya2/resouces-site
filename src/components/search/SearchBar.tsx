'use client';

import { Search } from 'lucide-react';
import { useResourceStore } from '@/lib/store';
import { useState } from 'react';

export function SearchBar() {
    const { searchQuery, setSearchQuery } = useResourceStore();
    const [isFocused, setIsFocused] = useState(false);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div
                className={`
          flex items-center gap-3 px-4 py-3 
          bg-background border-2 transition-colors
          ${isFocused ? 'border-primary' : 'border-border'}
        `}
            >
                <Search className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <input
                    type="text"
                    placeholder="Search resources, categories, tags..."
                    value={searchQuery}
                    onChange={handleSearch}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="
            flex-1 bg-transparent outline-none text-foreground
            placeholder:text-muted-foreground
          "
                />
                {searchQuery && (
                    <button
                        onClick={() => setSearchQuery('')}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Clear
                    </button>
                )}
            </div>

            {searchQuery && (
                <div className="mt-2 text-sm text-muted-foreground text-center">
                    Press Enter to search or <a href="/resources" className="text-primary hover:underline">view all results</a>
                </div>
            )}
        </div>
    );
}
