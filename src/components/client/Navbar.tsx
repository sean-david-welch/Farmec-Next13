'use client';
import styles from '../styles/Header.module.css';

import { usePathname } from 'next/navigation';

interface Props {
    children: React.ReactNode;
}

const Navbar = ({ children }: Props) => {
    const pathname = usePathname();
    const isHomePage = pathname === '/';

    const isTransparent = isHomePage;

    return (
        <nav className={isTransparent ? styles.transparentNav : styles.navbar}>
            {children}
        </nav>
    );
};

export default Navbar;
