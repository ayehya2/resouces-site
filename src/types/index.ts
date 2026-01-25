// Resource Types
export interface Resource {
    id: string;
    title: string;
    shortDescription: string;
    longDescription: string;
    links: ResourceLink[];
    categories: string[];
    tags: string[];
    verified?: boolean;
    featured?: boolean;
    dateAdded: string;
    lastChecked?: string;
    status: 'active' | 'deprecated' | 'broken' | 'under-review' | 'archived';
    community?: CommunityMetrics;
    metadata?: ResourceMetadata;
}

export interface ResourceLink {
    type: 'website' | 'github' | 'documentation' | 'download' | 'api' | 'demo' | 'tutorial' | 'video' | 'article' | 'other';
    url: string;
    label: string;
}

export interface CommunityMetrics {
    upvotes: number;
    downvotes: number;
    workingCount: number;
    brokenCount: number;
    scamReports: number;
}

export interface ResourceMetadata {
    platform?: ('web' | 'desktop' | 'mobile' | 'browser' | 'cli' | 'api' | 'cloud')[];
    license?: string;
    pricing?: 'free' | 'freemium' | 'paid' | 'open-source' | 'subscription';
    language?: string;
    requiresSignup?: boolean;
    openSource?: boolean;
    selfHostable?: boolean;
}

// Category Types
export interface Category {
    id: string;
    name: string;
    description: string;
    icon?: string;
    color?: string;
    parentCategory?: string | null;
    subcategories?: string[];
    featured?: boolean;
    resourceCount?: number;
}

// Tag Types
export interface Tag {
    id: string;
    name: string;
    description: string;
    color?: string;
    usageCount?: number;
}

// Filter Types
export interface Filters {
    categories: string[];
    tags: string[];
    platforms: string[];
    pricing: string[];
    verified: boolean;
    featured: boolean;
    noSignup: boolean;
    openSource: boolean;
    status: string[];
}

// Store Types
export interface ResourceStore {
    resources: Resource[];
    categories: Category[];
    tags: Tag[];
    filters: Filters;
    searchQuery: string;
    darkMode: boolean;
    viewMode: 'minimal' | 'detailed';
    setResources: (resources: Resource[]) => void;
    setCategories: (categories: Category[]) => void;
    setTags: (tags: Tag[]) => void;
    setFilters: (filters: Partial<Filters>) => void;
    setSearchQuery: (query: string) => void;
    setViewMode: (mode: 'minimal' | 'detailed') => void;
    voteResource: (id: string, type: 'up' | 'down') => void;
    syncVotes: () => Promise<void>;
    toggleDarkMode: () => void;
    clearFilters: () => void;
}
