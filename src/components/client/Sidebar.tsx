'use client';
import styles from '../styles/Sidebar.module.css';

import Link from 'next/link';
import Image from 'next/image';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faCog, faBlog, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faBars, faEnvelope, faHome } from '@fortawesome/free-solid-svg-icons';
import {
    faX,
    faIndustry,
    faCircleInfo,
} from '@fortawesome/free-solid-svg-icons';

interface Props {
    user?: { role: string } | null;
    suppliers?: { name: string | null; id: string | null }[];
}

const Sidebar = ({ user, suppliers }: Props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {!isOpen ? (
                <div className={styles.navIcon} onClick={toggleSidebar}>
                    <FontAwesomeIcon
                        icon={faBars}
                        className={styles.navigation}
                        height={32}
                        width={32}
                    />
                </div>
            ) : (
                <>
                    <div className={styles.navIcon} onClick={toggleSidebar}>
                        <div className={styles.iconGrid}>
                            <FontAwesomeIcon
                                icon={faX}
                                height={32}
                                width={32}
                                className={styles.navigation}
                            />
                            <Image
                                src="/farmeclogo.png"
                                alt="logo"
                                width={150}
                                height={150}
                            />
                        </div>
                    </div>
                    <nav
                        className={
                            isOpen ? styles.sideNavOpen : styles.sideNavClosed
                        }>
                        <ul className={styles.navList}>
                            <Link
                                className={styles.navItem}
                                href={'/'}
                                onClick={() => setIsOpen(false)}>
                                <FontAwesomeIcon icon={faHome} /> Home
                            </Link>
                            <Link
                                className={styles.navItem}
                                href={'/about'}
                                onClick={() => setIsOpen(false)}>
                                <FontAwesomeIcon icon={faCircleInfo} /> About
                            </Link>
                            {suppliers &&
                                suppliers.map(supplier => (
                                    <Link
                                        key={supplier?.id}
                                        href={`/suppliers/${supplier?.id}`}
                                        onClick={() => setIsOpen(false)}>
                                        <FontAwesomeIcon icon={faIndustry} />
                                        {supplier?.name}
                                    </Link>
                                ))}
                            {suppliers &&
                                suppliers.map(supplier => (
                                    <Link
                                        key={supplier?.id}
                                        href={`/spareparts/${supplier?.id}`}
                                        onClick={() => setIsOpen(false)}>
                                        <FontAwesomeIcon icon={faCog} />
                                        {supplier?.name}
                                    </Link>
                                ))}
                            <Link
                                href={'/blog'}
                                onClick={() => setIsOpen(false)}>
                                <FontAwesomeIcon icon={faBlog} /> Blog
                            </Link>
                            {user &&
                                user.role &&
                                (user.role === 'USER' ||
                                    user.role === 'STAFF') && (
                                    <Link
                                        href={'/account'}
                                        onClick={() => setIsOpen(false)}>
                                        <FontAwesomeIcon icon={faUserCircle} />{' '}
                                        Account
                                    </Link>
                                )}
                            <Link
                                href={'/#contact'}
                                onClick={() => setIsOpen(false)}>
                                <FontAwesomeIcon icon={faEnvelope} /> Contact
                            </Link>
                        </ul>
                    </nav>
                </>
            )}
        </>
    );
};

export default Sidebar;
