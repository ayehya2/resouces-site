import { Lock } from 'lucide-react';

export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-3xl mx-auto space-y-8">
                <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                        <Lock className="h-6 w-6 text-primary" />
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
                </div>

                <div className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-muted-foreground">
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-foreground">Our Philosophy</h2>
                        <p className="leading-relaxed">
                            Resources Hub is built on the principles of transparency and privacy. We believe that a directory
                            of technical resources should not involve tracking, advertisements, or data harvesting.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-foreground">Data Handling</h2>
                        <div className="grid gap-4">
                            <div className="bg-muted/50 p-4 border-l-4 border-primary rounded-r">
                                <h3 className="font-bold text-foreground mb-1 text-sm uppercase tracking-wider">No Tracking</h3>
                                <p className="text-sm">We do not use cookie-based tracking, third-party analytics scripts (like Google Analytics), or marketing pixels.</p>
                            </div>
                            <div className="bg-muted/50 p-4 border-l-4 border-primary rounded-r">
                                <h3 className="font-bold text-foreground mb-1 text-sm uppercase tracking-wider">No Accounts</h3>
                                <p className="text-sm">There are no user accounts. We never ask for or store your name, email address, or credentials.</p>
                            </div>
                            <div className="bg-muted/50 p-4 border-l-4 border-primary rounded-r">
                                <h3 className="font-bold text-foreground mb-1 text-sm uppercase tracking-wider">Local Only</h3>
                                <p className="text-sm">Features like &quot;Favorites&quot; or &quot;Export Selections&quot; are handled entirely within your browser&apos;s <code>localStorage</code>. No data ever leaves your device.</p>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-foreground">Third-Party Links</h2>
                        <p className="leading-relaxed">
                            This hub contains links to external websites. When you click these links, you are visiting a third-party
                            site which has its own privacy practices. Resources Hub is not responsible for the privacy policies of
                            external sites.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-foreground">Open Source Transparency</h2>
                        <p className="leading-relaxed">
                            As a fully open-source project, our entire system architecture can be audited by anyone on
                            <a href="https://github.com/ayehya2/resouces-site" className="text-primary hover:underline font-medium ml-1">GitHub</a>.
                        </p>
                    </section>

                    <div className="pt-12 border-t border-border flex justify-between items-center text-xs uppercase tracking-widest font-semibold opacity-60">
                        <span>Last Updated: January 2026</span>
                        <span>Version 1.0</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
