interface NavItem {
    id: string;
    name: string;
    isSubcategory?: boolean;
}

interface OnThisPageProps {
    items: NavItem[];
    onFilter: (categoryId: string | null) => void;
    activeFilter: string | null;
}

export function OnThisPage({ items, onFilter, activeFilter }: OnThisPageProps) {
    return (
        <aside className="sticky top-20 w-64 flex-shrink-0 hidden lg:block">
            <div className="border border-border bg-card">
                <div className="p-4 border-b border-border">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">On this page</h3>
                </div>
                <nav className="p-2 space-y-0.5 max-h-[calc(100vh-12rem)] overflow-y-auto custom-scrollbar">
                    <button
                        onClick={() => onFilter(null)}
                        className={`w-full text-left text-xs px-3 py-1.5 transition-all font-mono uppercase tracking-tight ${activeFilter === null
                            ? 'bg-primary/10 text-primary font-bold border-l-2 border-primary shadow-sm'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                            }`}
                    >
                        [ ALL ]
                    </button>
                    {items.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                onFilter(item.id);
                                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }}
                            className={`w-full text-left text-xs px-3 py-1.5 transition-all border-l-2 ${item.isSubcategory ? 'ml-4 pl-4 border-muted/30 text-[11px]' : 'font-bold uppercase tracking-tight'} ${activeFilter === item.id
                                ? 'bg-primary/10 text-primary border-primary font-bold'
                                : 'text-muted-foreground hover:text-foreground hover:bg-muted/30 border-transparent'
                                }`}
                        >
                            {item.name}
                        </button>
                    ))}
                </nav>
            </div>
        </aside>
    );
}
