'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export function FaviconSwitcher() {
    const pathname = usePathname();

    useEffect(() => {
        let iconPath = '/favicon.svg'; // Default

        if (pathname.startsWith('/resources')) {
            iconPath = '/favicons/resources.svg';
        } else if (pathname.startsWith('/categories')) {
            iconPath = '/favicons/categories.svg';
        } else if (pathname.startsWith('/glossary')) {
            iconPath = '/favicons/glossary.svg';
        } else if (pathname.startsWith('/submit')) {
            iconPath = '/favicons/submit.svg';
        } else if (pathname.startsWith('/launchpad')) {
            iconPath = '/favicons/launchpad.svg';
        } else if (pathname.startsWith('/privacy') || pathname.startsWith('/license')) {
            iconPath = '/favicons/legal.svg';
        }

        const link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
        if (link) {
            link.href = iconPath;
            link.type = 'image/svg+xml';
        } else {
            const newLink = document.createElement('link');
            newLink.rel = 'icon';
            newLink.href = iconPath;
            newLink.type = 'image/svg+xml';
            document.head.appendChild(newLink);
        }
    }, [pathname]);

    return null;
}
