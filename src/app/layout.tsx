import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SelectionToolbar } from '@/components/SelectionToolbar';
import { CommandPalette } from '@/components/CommandPalette';
import { FaviconSwitcher } from '@/components/FaviconSwitcher';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
    title: 'Resources Hub - Curated Technical Resources Directory',
    description: 'A minimalist, community-driven directory of high-quality technical resources, tools, and learning materials.',
    keywords: ['resources', 'tools', 'software', 'development', 'cybersecurity', 'AI', 'learning'],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark" suppressHydrationWarning>
            <head>
                <link rel="manifest" href="/manifest.json" />
                <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
                <link rel="icon" href="/favicon.png" type="image/png" />
                <meta name="theme-color" content="#09090b" />
                <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
            </head>
            <body className={inter.variable}>
                <div className="min-h-screen flex flex-col">
                    <Header />
                    <main className="flex-1">{children}</main>
                    <Footer />
                    <SelectionToolbar />
                    <CommandPalette />
                    <FaviconSwitcher />
                </div>
            </body>
        </html>
    );
}
