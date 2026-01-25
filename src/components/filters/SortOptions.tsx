interface SortOptionsProps {
    value: 'newest' | 'popular' | 'alphabetical';
    onChange: (value: 'newest' | 'popular' | 'alphabetical') => void;
}

export function SortOptions({ value, onChange }: SortOptionsProps) {
    return (
        <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sort:</span>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value as any)}
                className="px-3 py-2 text-sm border border-border bg-background hover:bg-muted transition-colors outline-none cursor-pointer"
            >
                <option value="newest">Newest First</option>
                <option value="popular">Most Popular</option>
                <option value="alphabetical">A-Z</option>
            </select>
        </div>
    );
}
