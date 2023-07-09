'use client';
import styles from '../styles/Header.module.css';

import Link from 'next/link';
import Image from 'next/image';
import useTransparentHeader from '~/hooks/useTransparentHeader';

import { NavItem } from '../client/Navitem';
import { SignInButton } from '../client/Buttons';

interface Props {
    user?: { role: string } | null;
}

const Navbar = ({ user }: Props) => {
    const isTransparent = useTransparentHeader();

    return (
        <nav
            className={`${styles.navbar} ${
                isTransparent ? styles.transparent : ''
            }`}>
            <Link href={'/'}>
                <Image
                    src="/farmeclogo.png"
                    alt="logo"
                    width={225}
                    height={225}
                />
            </Link>

            <ul className={styles.navList}>
                <NavItem link={'/about'} title="About Us">
                    <li className={styles.navDropItem}>
                        <Link href={'/'}>Staff & Management</Link>
                    </li>
                    <li className={styles.navDropItem}>
                        <Link href={'/'}>Company History</Link>
                    </li>
                </NavItem>

                <NavItem link={'/suppliers'} title="Suppliers">
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

                {user && (user.role === 'ADMIN' || user.role === 'STAFF') ? (
                    <NavItem link="/" title="Account" />
                ) : (
                    <NavItem link="/" title="Contact" />
                )}

                <SignInButton />
            </ul>
        </nav>
    );
};

export default Navbar;
