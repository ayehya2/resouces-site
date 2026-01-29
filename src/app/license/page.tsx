import { Shield } from 'lucide-react';

export default function LicensePage() {
    return (
        <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-3xl mx-auto space-y-8">
                <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                        <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight">MIT License</h1>
                </div>

                <div className="bg-card border border-border p-8 md:p-12 shadow-sm rounded-lg">
                    <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-muted-foreground">
                        {`MIT License

Copyright (c) 2026 Resources Hub Core Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`}
                    </pre>
                </div>
            </div>
        </div>
    );
}
