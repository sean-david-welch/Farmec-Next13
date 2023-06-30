'use client';

import styles from '../styles/Header.module.css';
import Link from 'next/link';
import Image from 'next/image';

import { useState } from 'react';

const Navbar = () => {
    interface NavItemProps {
        title: string;
        link: string;
        children?: React.ReactNode;
    }

    const NavItem: React.FC<NavItemProps> = ({ title, link, children }) => {
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

    return (
        <nav className={styles.navbar}>
            <Link href={'/'}>
                <Image
                    src="/farmeclogo.png"
                    alt="logo"
                    width={225}
                    height={225}
                />
            </Link>

            <ul className={styles.navList}>
                <NavItem link="/" title="About Us">
                    <li className={styles.navDropItem}>
                        <Link href={'/'}>Staff & Management</Link>
                    </li>
                    <li className={styles.navDropItem}>
                        <Link href={'/'}>Company History</Link>
                    </li>
                </NavItem>

                <NavItem link="/" title="Suppliers">
                    <li className={styles.navDropItem}>
                        <Link href={'/'}>Sip Slovenia</Link>
                    </li>
                    <li className={styles.navDropItem}>
                        <Link href={'/'}>Sulky</Link>
                    </li>
                </NavItem>

                <NavItem link="/" title="Spare Parts">
                    <li className={styles.navDropItem}>
                        <Link href={'/'}>Sip Slovenia</Link>
                    </li>
                    <li className={styles.navDropItem}>
                        <Link href={'/'}>Sulky</Link>
                    </li>
                </NavItem>

                <NavItem link="/" title="Blog">
                    <li className={styles.navDropItem}>
                        <Link href={'/'}>Latest Posts</Link>
                    </li>
                    <li className={styles.navDropItem}>
                        <Link href={'/'}>Exhibition Information</Link>
                    </li>
                </NavItem>

                <NavItem link="/" title="Contact" />

                <NavItem link="/" title="Login" />
            </ul>
        </nav>
    );
};

export default Navbar;
