export function Footer() {
    return (
        <footer className="border-t border-border bg-card">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* About */}
                    <div>
                        <h3 className="font-bold mb-3">Resources Hub</h3>
                        <p className="text-sm text-muted-foreground">
                            A community-driven directory of curated technical resources.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-medium mb-3">Navigate</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="/resources" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Browse Resources
                                </a>
                            </li>
                            <li>
                                <a href="/categories" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Categories
                                </a>
                            </li>
                            <li>
                                <a href="/submit" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Submit Resource
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="font-medium mb-3">Resources</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="/docs" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Documentation
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com/ayehya2/resouces-site" className="text-muted-foreground hover:text-foreground transition-colors">
                                    GitHub
                                </a>
                            </li>
                            <li>
                                <a href="/changelog" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Changelog
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-medium mb-3">Legal</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="/license" className="text-muted-foreground hover:text-foreground transition-colors">
                                    MIT License
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} Resources Hub. Open source and community-driven.</p>
                </div>
            </div>
        </footer>
    );
}
