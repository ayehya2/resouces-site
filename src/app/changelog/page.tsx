'use client';

import { useEffect, useState } from 'react';
import { GitCommit, Plus, RefreshCw, AlertTriangle, User, ShieldCheck, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

interface ChangelogEntry {
    date: string;
    type: 'added' | 'updated' | 'fixed' | 'deprecated';
    resourceId?: string;
    resourceTitle?: string;
    contributor?: string;
    note: string;
}

interface ChangelogData {
    version: string;
    lastUpdated: string;
    entries: ChangelogEntry[];
}

export default function ChangelogPage() {
    const [data, setData] = useState<ChangelogData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadChangelog = async () => {
            try {
                const response = await fetch('/data/resources/changelog.json');
                const changelogData = await response.json();

                // Sort by date (newest first)
                changelogData.entries.sort((a: ChangelogEntry, b: ChangelogEntry) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime()
                );

                setData(changelogData);
            } catch (error) {
                console.error('Failed to load changelog:', error);
            } finally {
                setLoading(false);
            }
        };

        loadChangelog();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <RefreshCw className="h-6 w-6 animate-spin text-primary" />
            </div>
        );
    }

    if (!data) {
        return (
            <div className="min-h-screen bg-background p-12 text-center">
                <p className="text-muted-foreground">Changelog not found.</p>
            </div>
        );
    }

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'added': return 'text-green-500 bg-green-500/10';
            case 'updated': return 'text-blue-500 bg-blue-500/10';
            case 'fixed': return 'text-yellow-500 bg-yellow-500/10';
            case 'deprecated': return 'text-red-500 bg-red-500/10';
            default: return 'text-muted-foreground bg-muted';
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'added': return <Plus className="h-3 w-3" />;
            case 'updated': return <RefreshCw className="h-3 w-3" />;
            case 'fixed': return <CheckCircle2 className="h-3 w-3" />;
            case 'deprecated': return <AlertTriangle className="h-3 w-3" />;
            default: return <GitCommit className="h-3 w-3" />;
        }
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="border-b border-border bg-card">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold mb-1">Update Log</h1>
                            <p className="text-sm text-muted-foreground">
                                Track the latest additions and changes to the resource wiki.
                            </p>
                        </div>
                        <div className="text-right">
                            <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Version</div>
                            <div className="text-lg font-bold text-primary">{data.version}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-3xl mx-auto">
                    <div className="space-y-8">
                        {data.entries.map((entry, index) => (
                            <div key={index} className="relative pl-8 pb-8 border-l border-border last:pb-0">
                                {/* Timeline Dot */}
                                <div className="absolute left-[-5px] top-1 h-[9px] w-[9px] rounded-full bg-border border-2 border-background" />

                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <time className="text-xs font-mono text-muted-foreground">
                                            {new Date(entry.date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </time>
                                        <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded ${getTypeColor(entry.type)}`}>
                                            {entry.type}
                                        </span>
                                    </div>

                                    <div className="bg-card border border-border p-4 shadow-sm">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                                {entry.resourceTitle && entry.resourceId ? (
                                                    <Link
                                                        href={`/resources?search=${entry.resourceTitle}`}
                                                        className="text-sm font-bold hover:text-primary transition-colors flex items-center gap-1.5"
                                                    >
                                                        {entry.resourceTitle}
                                                        <span className="text-xs font-normal text-muted-foreground opacity-50">#{entry.resourceId}</span>
                                                    </Link>
                                                ) : (
                                                    <div className="text-sm font-bold">System Update</div>
                                                )}
                                                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                                                    {entry.note}
                                                </p>
                                            </div>

                                            {entry.contributor && (
                                                <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground bg-muted px-2 py-1 h-fit">
                                                    <User className="h-3 w-3" />
                                                    {entry.contributor}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
