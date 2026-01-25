import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
    title: 'Resources Wiki - Curated Technical Resources Directory',
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
            <body className={inter.variable}>
                <div className="min-h-screen flex flex-col">
                    <Header />
                    <main className="flex-1">{children}</main>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
