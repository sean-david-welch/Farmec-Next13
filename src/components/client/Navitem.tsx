'use client';
import { useState } from 'react';
import styles from '../styles/Header.module.css';

import Link from 'next/link';

interface NavItemProps {
    title: string;
    link: string;
    children?: React.ReactNode;
}

export const NavItem: React.FC<NavItemProps> = ({ title, link, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <li
            className={styles.navItem}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}>
            <Link href={link}>{title}</Link>
            <ul className={isOpen ? styles.navDrop : styles.navDropClosed}>
                {children}
            </ul>
        </li>
    );
};
