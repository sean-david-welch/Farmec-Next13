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
    const [hover, setHover] = useState(false);

    return (
        <li className={styles.navItem}>
            <div
                className={styles.navListItem}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}>
                <Link href={link}>{title}</Link>
            </div>
            <ul
                className={`${styles.navDrop} ${
                    hover ? styles.navDropActive : ''
                }`}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}>
                {children}
            </ul>
        </li>
    );
};
