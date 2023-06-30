'use client';

import styles from '../styles/Header.module.css';
import Link from 'next/link';

import { useState } from 'react';

const Navbar = () => {
    const [open, setOpen] = useState(false);

    interface NavItemProps {
        title: string;
        children: React.ReactNode;
    }

    const NavItem: React.FC<NavItemProps> = ({ title, children }) => {
        const [isOpen, setIsOpen] = useState(false);

        return (
            <li
                className={styles.navItem}
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}>
                <Link href="/">{title}</Link>
                <ul className={isOpen ? styles.navDrop : styles.navDropClosed}>
                    {children}
                </ul>
            </li>
        );
    };

    return (
        <nav className={styles.navbar}>
            <h1>Farmec</h1>
            <ul className={styles.navList}>
                <NavItem title="Hey">
                    <li className={styles.navDropItem}>
                        <Link href={'/'}>hi</Link>
                    </li>
                    <li className={styles.navDropItem}>
                        <Link href={'/'}>hi</Link>
                    </li>
                </NavItem>
                <NavItem title="Hey-2">
                    <li className={styles.navDropItem}>
                        <Link href={'/'}>hi</Link>
                    </li>
                    <li className={styles.navDropItem}>
                        <Link href={'/'}>hi</Link>
                    </li>
                </NavItem>
                <NavItem title="Hey-3">
                    <li className={styles.navDropItem}>
                        <Link href={'/'}>hi</Link>
                    </li>
                    <li className={styles.navDropItem}>
                        <Link href={'/'}>hi</Link>
                    </li>
                </NavItem>
            </ul>
        </nav>
    );
};

export default Navbar;
