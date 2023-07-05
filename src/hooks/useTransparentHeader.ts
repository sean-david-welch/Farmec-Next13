'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const useTransparentHeader = () => {
    const pathname = usePathname();
    const isHomePage = pathname === '/';

    const [isTransparent, setIsTransparent] = useState(isHomePage);

    useEffect(() => {
        const handleScroll = () => {
            if (isHomePage) {
                const heroImageHeight = 250;
                const showTransparent = window.scrollY < heroImageHeight;
                setIsTransparent(showTransparent);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isHomePage]);
    return isTransparent;
};

export default useTransparentHeader;
