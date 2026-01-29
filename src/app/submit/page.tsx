'use client';

import { Github, PlusCircle, CheckCircle2, ShieldCheck, BookOpen, Code, Terminal, Zap, MessageSquare, Microscope } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SubmitPage() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Hero Header */}
            <div className="border-b border-border bg-card/30">
                <div className="container mx-auto px-4 py-16 md:py-24">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto text-center space-y-4"
                    >
                        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Submit a Resource</h1>
                        <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
                            Join the contributors building the ultimate directory for technical tools, documentation, and materials.
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 md:py-16">
                <div className="max-w-4xl mx-auto space-y-16">

                    {/* Quick Start Sections */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid md:grid-cols-2 gap-6"
                    >
                        {/* Pathway A */}
                        <motion.div variants={itemVariants} className="group flex flex-col p-8 border border-border bg-card hover:border-primary transition-all duration-300">
                            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20 mb-6 group-hover:scale-110 transition-transform">
                                <MessageSquare className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-1 space-y-4">
                                <h3 className="text-2xl font-black uppercase tracking-tight">The Suggester</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    The fastest way to contribute. Perfect for one-off tool suggestions or if you&apos;re unfamiliar with JSON.
                                </p>
                                <ul className="text-xs space-y-2 text-muted-foreground font-mono italic">
                                    <li className="flex items-center gap-2">
                                        <div className="h-1 w-1 bg-primary rounded-full" />
                                        Fill out a simple template
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="h-1 w-1 bg-primary rounded-full" />
                                        No coding required
                                    </li>
                                </ul>
                                <a
                                    href="https://github.com/ayehya2/resouces-site/issues/new?template=resource_submission.md"
                                    className="inline-flex items-center justify-center w-full gap-2 px-6 py-3 bg-primary text-primary-foreground text-xs font-black uppercase tracking-widest hover:opacity-90 transition-opacity mt-4"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Github className="h-4 w-4" />
                                    Open Issue Template
                                </a>
                            </div>
                        </motion.div>

                        {/* Pathway B */}
                        <motion.div variants={itemVariants} className="group flex flex-col p-8 border border-border bg-card hover:border-secondary transition-all duration-300">
                            <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center border border-secondary/20 mb-6 group-hover:scale-110 transition-transform">
                                <Terminal className="h-6 w-6 text-secondary" />
                            </div>
                            <div className="flex-1 space-y-4">
                                <h3 className="text-2xl font-black uppercase tracking-tight">The Architect</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Full control over data. Recommended for batch submissions or if you want to modify site components.
                                </p>
                                <ul className="text-xs space-y-2 text-muted-foreground font-mono italic">
                                    <li className="flex items-center gap-2">
                                        <div className="h-1 w-1 bg-secondary rounded-full" />
                                        Direct JSON manipulation
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="h-1 w-1 bg-secondary rounded-full" />
                                        Automated CI validation
                                    </li>
                                </ul>
                                <a
                                    href="https://github.com/ayehya2/resouces-site/pulls"
                                    className="inline-flex items-center justify-center w-full gap-2 px-6 py-3 bg-card border border-border text-foreground text-xs font-black uppercase tracking-widest hover:border-secondary transition-colors mt-4"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Github className="h-4 w-4" />
                                    Submit Pull Request
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* How It Works (The Explanation) */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="space-y-10 pt-16 border-t border-border"
                    >
                        <div className="text-center space-y-2">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-black uppercase tracking-widest text-primary mb-2">
                                <Microscope className="h-3 w-3" />
                                Vetting Process
                            </div>
                            <h2 className="text-3xl font-black uppercase tracking-tighter">What Happens Next?</h2>
                            <p className="text-muted-foreground max-w-xl mx-auto text-sm">Every submission is guarded by our automated systems and manually verified by curators.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="space-y-4">
                                <div className="h-8 w-8 rounded bg-background border border-border flex items-center justify-center text-xs font-bold font-mono">1</div>
                                <h4 className="font-bold uppercase text-sm tracking-tight">Automated Shield</h4>
                                <p className="text-xs text-muted-foreground leading-relaxed">The CI pipeline automatically validates your JSON syntax and checks for broken links and invalid categories.</p>
                            </div>
                            <div className="space-y-4 border-l-0 md:border-l border-border md:pl-8">
                                <div className="h-8 w-8 rounded bg-background border border-border flex items-center justify-center text-xs font-bold font-mono">2</div>
                                <h4 className="font-bold uppercase text-sm tracking-tight">Manual Curation</h4>
                                <p className="text-xs text-muted-foreground leading-relaxed">Our maintainers manually verify the resource value, checking description accuracy and technical relevance.</p>
                            </div>
                            <div className="space-y-4 border-l-0 md:border-l border-border md:pl-8">
                                <div className="h-8 w-8 rounded bg-background border border-border flex items-center justify-center text-xs font-bold font-mono">3</div>
                                <h4 className="font-bold uppercase text-sm tracking-tight">Live Integration</h4>
                                <p className="text-xs text-muted-foreground leading-relaxed">Once approved, the metadata syncs and the resource appears live on the hub with your name in the contributor logs.</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* JSON Reference */}
                    <div className="space-y-8 pt-16 border-t border-border">
                        <div className="flex items-center gap-3">
                            <Code className="h-6 w-6 text-primary" />
                            <h2 className="text-2xl font-black uppercase tracking-tighter">JSON Reference</h2>
                        </div>

                        <div className="border border-border bg-card rounded-lg overflow-hidden">
                            <div className="p-4 bg-muted/50 border-b border-border flex items-center justify-between">
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Standard Resource Entry</p>
                                <div className="flex gap-1.5">
                                    <div className="h-2 w-2 rounded-full bg-red-500/20" />
                                    <div className="h-2 w-2 rounded-full bg-yellow-500/20" />
                                    <div className="h-2 w-2 rounded-full bg-green-500/20" />
                                </div>
                            </div>
                            <pre className="p-6 overflow-x-auto text-[11px] font-mono leading-relaxed text-muted-foreground bg-card">
                                {`{
  "id": "resource-id",
  "title": "Resource Name",
  "shortDescription": "One sentence summary.",
  "links": [
    { "type": "website", "url": "https://example.com", "label": "Website" }
  ],
  "categories": ["cybersecurity"],
  "tags": ["tag1", "tag2"],
  "verified": true,
  "status": "active",
  "metadata": {
    "license": "MIT",
    "pricing": "free",
    "selfHostable": true
  }
}`}
                            </pre>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-6 border border-border bg-card/50 space-y-2">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-primary">Required</h4>
                                <ul className="text-xs text-muted-foreground space-y-1 font-mono">
                                    <li>• unique id (kebab-case)</li>
                                    <li>• title & shortDescription</li>
                                    <li>• valid category id</li>
                                </ul>
                            </div>
                            <div className="p-6 border border-border bg-card/50 space-y-2">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-orange-500">Pro-Tip</h4>
                                <p className="text-xs text-muted-foreground leading-relaxed italic">
                                    Run &quot;npm run sync:metadata&quot; locally to update the global registry before pushing your PR.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
