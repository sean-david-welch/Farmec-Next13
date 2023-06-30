'use client';

import styles from '../styles/Header.module.css';
import Link from 'next/link';

import { useState } from 'react';

const Navbar = () => {
    const [open, setOpen] = useState(false);

    return (
        <nav className={styles.navbar}>
            <h1>Farmec</h1>
            <ul className={styles.navList}>
                <li
                    className={styles.navItem}
                    onMouseEnter={() => setOpen(true)}
                    onMouseLeave={() => setOpen(false)}>
                    <Link href={'/'}>Hey</Link>

                    <ul
                        className={
                            open ? styles.navDrop : styles.navDropClosed
                        }>
                        <li className={styles.navDropItem}>
                            <Link href={'/'}>hi</Link>
                        </li>
                        <li className={styles.navDropItem}>
                            <Link href={'/'}>hi</Link>
                        </li>
                        <li className={styles.navDropItem}>
                            <Link href={'/'}>hi</Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
