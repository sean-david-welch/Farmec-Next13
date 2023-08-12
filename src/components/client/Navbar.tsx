'use client';
import styles from '../styles/Header.module.css';

import { useInView } from 'react-intersection-observer';
import { usePathname } from 'next/navigation';

interface Props {
    children: React.ReactNode;
}

const Navbar = ({ children }: Props) => {
    const pathname = usePathname();
    const isHomePage = pathname === '/';

    const [ref, inView] = useInView({
        threshold: 0,
        triggerOnce: false,
    });

    const isTransparent = isHomePage && inView;

    return (
        <nav className={isTransparent ? styles.transparentNav : styles.navbar}>
            {<div ref={ref}>{children}</div>}
        </nav>
    );
};

export default Navbar;
