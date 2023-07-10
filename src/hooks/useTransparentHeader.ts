'use client';

import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const useTransparentHeader = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const isHomePage = pathname === '/';

    const [isTransparent, setIsTransparent] = useState(isHomePage);

    useEffect(() => {
        const handleScroll = () => {
            if (isHomePage) {
                const heroImageHeight = 250;
                const showTransparent = window.scrollY < heroImageHeight;
                setIsTransparent(showTransparent);
            } else {
                setIsTransparent(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [pathname, searchParams]);
    return isTransparent;
};

export default useTransparentHeader;
