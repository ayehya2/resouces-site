import type { Resource } from '@/types';

/**
 * Generates a downloadable file from a string content
 */
export function downloadFile(content: string, fileName: string, contentType: string) {
    const a = document.createElement('a');
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(a.href);
}

/**
 * Converts resources to CSV format
 */
export function convertToCSV(resources: Resource[]): string {
    const headers = ['Title', 'Description', 'Link', 'Categories', 'Tags', 'Verified'];
    const rows = resources.map(r => [
        `"${r.title.replace(/"/g, '""')}"`,
        `"${r.shortDescription.replace(/"/g, '""')}"`,
        r.links[0]?.url || '',
        r.categories.join('; '),
        r.tags.join('; '),
        r.verified ? 'Yes' : 'No'
    ]);

    return [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
}

/**
 * Converts resources to Markdown format
 */
export function convertToMarkdown(resources: Resource[]): string {
    const date = new Date().toLocaleDateString();
    let md = `# Exported Resources (${date})\n\n`;

    resources.forEach(r => {
        md += `### [${r.title}](${r.links[0]?.url})\n`;
        md += `${r.shortDescription}\n\n`;
        if (r.tags.length > 0) {
            md += `*Tags: ${r.tags.map(t => `\`#${t}\``).join(', ')}*\n\n`;
        }
        md += '---\n\n';
    });

    return md;
}

/**
 * Converts resources to Netscape Bookmarks HTML format
 * This is the standard format for importing into Chrome, Firefox, Safari, etc.
 */
export function convertToBookmarks(resources: Resource[]): string {
    const date = Math.floor(Date.now() / 1000);
    let html = `<!DOCTYPE NETSCAPE-Bookmark-file-1>
<!-- This is an automatically generated file.
     It will be read and overwritten.
     DO NOT EDIT! -->
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>Bookmarks</TITLE>
<H1>Bookmarks</H1>
<DL><p>
    <DT><H3 ADD_DATE="${date}" LAST_MODIFIED="${date}" PERSONAL_TOOLBAR_FOLDERS="true">Resources Hub Export</H3>
    <DL><p>
`;

    resources.forEach(r => {
        const url = r.links[0]?.url || '';
        html += `        <DT><A HREF="${url}" ADD_DATE="${date}">${r.title} - ${r.shortDescription}</A>\n`;
    });

    html += `    </DL><p>
</DL><p>`;

    return html;
}
