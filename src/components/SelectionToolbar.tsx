'use client';

import { useResourceStore } from '@/lib/store';
import { Download, X, Copy, FileJson, FileText, Bookmark, CheckSquare, Share2, Check } from 'lucide-react';
import {
    downloadFile,
    convertToCSV,
    convertToMarkdown,
    convertToBookmarks
} from '@/lib/export-utils';
import { useState } from 'react';

export function SelectionToolbar() {
    const { selectedResourceIds, resources, clearSelection } = useResourceStore();
    const [isExporting, setIsExporting] = useState(false);
    const [copied, setCopied] = useState(false);

    if (selectedResourceIds.length === 0) return null;

    const selectedResources = resources.filter(r => selectedResourceIds.includes(r.id));

    const handleExport = (type: 'csv' | 'md' | 'bookmarks' | 'json') => {
        const date = new Date().toISOString().split('T')[0];
        let content = '';
        let fileName = `resources-export-${date}`;
        let contentType = 'text/plain';

        switch (type) {
            case 'csv':
                content = convertToCSV(selectedResources);
                fileName += '.csv';
                contentType = 'text/csv';
                break;
            case 'md':
                content = convertToMarkdown(selectedResources);
                fileName += '.md';
                contentType = 'text/markdown';
                break;
            case 'bookmarks':
                content = convertToBookmarks(selectedResources);
                fileName += '.html';
                contentType = 'text/html';
                break;
            case 'json':
                content = JSON.stringify(selectedResources, null, 2);
                fileName += '.json';
                contentType = 'application/json';
                break;
        }

        downloadFile(content, fileName, contentType);
        setIsExporting(false);
    };

    const handleShare = () => {
        const baseUrl = window.location.origin + window.location.pathname;
        const shareUrl = `${baseUrl}?collection=${selectedResourceIds.join(',')}`;
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="bg-primary text-primary-foreground px-4 py-3 rounded-full shadow-2xl flex items-center gap-4 border border-primary-foreground/20">
                <div className="flex items-center gap-2 px-2 border-r border-primary-foreground/20 mr-2">
                    <CheckSquare className="h-4 w-4" />
                    <span className="text-sm font-bold tabular-nums">
                        {selectedResourceIds.length} Selected
                    </span>
                </div>

                <div className="flex items-center gap-1">
                    <button
                        onClick={() => handleExport('md')}
                        className="p-2 hover:bg-primary-foreground/10 rounded-full transition-colors group relative"
                        title="Export as Markdown"
                    >
                        <FileText className="h-4 w-4" />
                        <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-[10px] px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity">Export Markdown</span>
                    </button>

                    <button
                        onClick={() => handleExport('csv')}
                        className="p-2 hover:bg-primary-foreground/10 rounded-full transition-colors group relative"
                        title="Export as CSV"
                    >
                        <Copy className="h-4 w-4" />
                        <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-[10px] px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity">Export CSV</span>
                    </button>

                    <button
                        onClick={() => handleExport('bookmarks')}
                        className="p-2 hover:bg-primary-foreground/10 rounded-full transition-colors group relative"
                        title="Export as Browser Bookmarks"
                    >
                        <Bookmark className="h-4 w-4" />
                        <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-[10px] px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity">Browser Bookmarks</span>
                    </button>

                    <button
                        onClick={() => handleExport('json')}
                        className="p-2 hover:bg-primary-foreground/10 rounded-full transition-colors group relative"
                        title="Export as JSON"
                    >
                        <FileJson className="h-4 w-4" />
                        <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-[10px] px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity">Export JSON</span>
                    </button>

                    <button
                        onClick={handleShare}
                        className="p-2 hover:bg-primary-foreground/10 rounded-full transition-colors group relative"
                        title="Share this collection"
                    >
                        {copied ? <Check className="h-4 w-4 text-green-400" /> : <Share2 className="h-4 w-4" />}
                        <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-[10px] px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity">
                            {copied ? 'URL Copied!' : 'Share Collection'}
                        </span>
                    </button>
                </div>

                <div className="w-px h-6 bg-primary-foreground/20 mx-1" />

                <button
                    onClick={clearSelection}
                    className="p-2 hover:bg-red-500 rounded-full transition-colors group relative"
                    title="Clear Selection"
                >
                    <X className="h-4 w-4" />
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-[10px] px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity">Clear All</span>
                </button>
            </div>
        </div>
    );
}
