'use client';

import { Github, PlusCircle, CheckCircle2, ShieldCheck, BookOpen, Code } from 'lucide-react';

export default function SubmitPage() {
    return (
        <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-4xl mx-auto space-y-12">
                {/* Header */}
                <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Submit a Resource</h1>
                    <p className="text-xl text-muted-foreground">
                        Help us expand the most comprehensive directory of technical tools and materials.
                    </p>
                </div>

                {/* Contribution Methods */}
                <div className="grid gap-6">
                    <a
                        href="https://github.com/ayehya2/resouces-site/issues/new?template=resource_suggestion.md"
                        className="flex items-center gap-6 p-8 border border-border bg-card hover:border-primary transition-all group"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform">
                            <PlusCircle className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-1">Suggest via Issue</h3>
                            <p className="text-muted-foreground">The easiest way. Just fill out a simple template on GitHub.</p>
                        </div>
                        <Github className="h-5 w-5 text-muted-foreground opacity-50" />
                    </a>

                    <a
                        href="https://github.com/ayehya2/resouces-site/pulls"
                        className="flex items-center gap-6 p-8 border border-border bg-card hover:border-primary transition-all group"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center border border-secondary/20 group-hover:scale-110 transition-transform">
                            <PlusCircle className="h-6 w-6 text-secondary" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-1">Direct Contribution (PR)</h3>
                            <p className="text-muted-foreground">Add resources directly to our JSON files for faster integration.</p>
                        </div>
                        <Github className="h-5 w-5 text-muted-foreground opacity-50" />
                    </a>
                </div>

                {/* How to Format Section */}
                <div className="space-y-8 pt-8 border-t border-border">
                    <div className="flex items-center gap-3">
                        <BookOpen className="h-6 w-6 text-primary" />
                        <h2 className="text-2xl font-bold">How to Format Your Submission</h2>
                    </div>

                    <div className="space-y-6">
                        {/* Via GitHub Issue */}
                        <div className="border border-border bg-card p-6 space-y-4">
                            <h3 className="text-xl font-semibold flex items-center gap-2">
                                <span className="text-primary">1.</span> Via GitHub Issue (Recommended for Beginners)
                            </h3>
                            <ol className="space-y-2 text-sm text-muted-foreground list-decimal pl-6">
                                <li>Click the "Suggest via Issue" button above</li>
                                <li>Fill in the template fields:
                                    <ul className="list-disc pl-6 mt-2 space-y-1">
                                        <li><strong className="text-foreground">Title:</strong> Full name of the resource (e.g., "Metasploit Framework")</li>
                                        <li><strong className="text-foreground">Short Description:</strong> One sentence summary (e.g., "Network traffic visibility for OSINT")</li>
                                        <li><strong className="text-foreground">Long Description:</strong> 2-3 sentences with key features and use cases</li>
                                        <li><strong className="text-foreground">URL:</strong> Main website or GitHub repository</li>
                                        <li><strong className="text-foreground">Categories:</strong> Choose from: AI, Cybersecurity, Web Dev, etc.</li>
                                        <li><strong className="text-foreground">Tags:</strong> Comma-separated keywords (e.g., "opensource, security, free")</li>
                                    </ul>
                                </li>
                                <li>Submit the issue and we'll review it within 48 hours</li>
                            </ol>
                        </div>

                        {/* Via Pull Request */}
                        <div className="border border-border bg-card p-6 space-y-4">
                            <h3 className="text-xl font-semibold flex items-center gap-2">
                                <span className="text-primary">2.</span> Via Pull Request (Advanced)
                            </h3>
                            <ol className="space-y-2 text-sm text-muted-foreground list-decimal pl-6">
                                <li>Fork the repository and clone it locally</li>
                                <li>Add your resource to the latest collection file in <code className="text-xs bg-muted px-1 py-0.5 rounded">public/data/resources/collection/</code></li>
                                <li>Follow the JSON format below exactly</li>
                                <li>Run <code className="text-xs bg-muted px-1 py-0.5 rounded">node scripts/sync-metadata.js</code> to update metadata</li>
                                <li>Create a pull request with a clear description</li>
                            </ol>
                        </div>
                    </div>
                </div>

                {/* JSON Format Example */}
                <div className="space-y-8 pt-8 border-t border-border">
                    <div className="flex items-center gap-3">
                        <Code className="h-6 w-6 text-primary" />
                        <h2 className="text-2xl font-bold">JSON Format Example</h2>
                    </div>

                    <div className="border border-border bg-card">
                        <div className="p-4 bg-muted border-b border-border">
                            <p className="text-sm font-mono">Complete Resource Entry</p>
                        </div>
                        <pre className="p-6 overflow-x-auto text-xs">
                            {`{
  "id": "netcraft",
  "title": "Netcraft",
  "shortDescription": "Network traffic visibility for OSINT",
  "longDescription": "Netcraft provides comprehensive internet security services including anti-phishing, takedown services, and cybercrime disruption. Offers extensive data on websites, hosting providers, and internet infrastructure for security research and OSINT investigations.",
  "links": [
    {
      "type": "website",
      "url": "https://www.netcraft.com",
      "label": "Official Website"
    },
    {
      "type": "documentation",
      "url": "https://www.netcraft.com/tools/",
      "label": "Tools & Services"
    }
  ],
  "categories": ["cybersecurity", "useful-websites"],
  "tags": ["osint", "security", "network", "free"],
  "verified": true,
  "featured": false,
  "dateAdded": "2026-01-28T00:00:00Z",
  "lastChecked": "2026-01-28T00:00:00Z",
  "status": "active",
  "community": {
    "upvotes": 0,
    "downvotes": 0,
    "workingCount": 0,
    "brokenCount": 0,
    "scamReports": 0
  },
  "metadata": {
    "platform": ["web"],
    "license": "Proprietary",
    "pricing": "freemium",
    "language": "English",
    "requiresSignup": false,
    "openSource": false,
    "selfHostable": false
  }
}`}
                        </pre>
                    </div>

                    {/* Field Explanations */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="border border-border bg-card p-4">
                            <h4 className="font-semibold mb-2 text-sm">Required Fields</h4>
                            <ul className="text-xs text-muted-foreground space-y-1">
                                <li><code className="bg-muted px-1">id</code>: Lowercase, hyphenated unique ID</li>
                                <li><code className="bg-muted px-1">title</code>: Official resource name</li>
                                <li><code className="bg-muted px-1">shortDescription</code>: One-line summary</li>
                                <li><code className="bg-muted px-1">categories</code>: Array of category IDs</li>
                                <li><code className="bg-muted px-1">tags</code>: Searchable keywords</li>
                            </ul>
                        </div>
                        <div className="border border-border bg-card p-4">
                            <h4 className="font-semibold mb-2 text-sm">Common Mistakes to Avoid</h4>
                            <ul className="text-xs text-muted-foreground space-y-1">
                                <li>❌ Using spaces in IDs (use hyphens)</li>
                                <li>❌ Missing commas in JSON arrays</li>
                                <li>❌ Invalid category IDs (check categories.json)</li>
                                <li>❌ Not running sync script before PR</li>
                                <li>❌ Duplicate resource entries</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Submission Guidelines */}
                <div className="space-y-8 pt-8 border-t border-border">
                    <h2 className="text-2xl font-bold">Submission Guidelines</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 font-semibold">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                <span>What we look for:</span>
                            </div>
                            <ul className="text-muted-foreground text-sm space-y-2 list-disc pl-5">
                                <li>High-quality technical documentation</li>
                                <li>Free or exceptionally valuable freemium tools</li>
                                <li>Open source repositories with active maintenance</li>
                                <li>Privacy-respecting services</li>
                            </ul>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 font-semibold">
                                <ShieldCheck className="h-4 w-4 text-primary" />
                                <span>Vetting Process:</span>
                            </div>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Every submission is manually reviewed by our maintainers to ensure it meets our quality standards.
                                We prioritize resources that are accessible, well-documented, and community-driven.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
