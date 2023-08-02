'use client';
import styles from '../styles/Sidebar.module.css';

import Link from 'next/link';
import Image from 'next/image';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBars,
    faEnvelope,
    faHome,
    faX,
    faIndustry,
    faCircleInfo,
    faCog,
    faBlog,
    faUserCircle,
    faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';
import { SignInButton } from './Buttons';

interface Props {
    user?: { role: string } | null;
}

const Sidebar = ({ user }: Props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {!isOpen ? (
                <div className={styles.navIcon} onClick={toggleSidebar}>
                    <Image
                        src="/farmeclogo.png"
                        alt="logo"
                        width={225}
                        height={225}
                    />
                    <FontAwesomeIcon
                        icon={faBars}
                        className={styles.navigation}
                        height={32}
                        width={32}
                    />
                </div>
            ) : (
                <nav
                    className={
                        isOpen ? styles.sideNavOpen : styles.sideNavClosed
                    }>
                    <div className={styles.navIcon} onClick={toggleSidebar}>
                        <Image
                            src="/farmeclogo.png"
                            alt="logo"
                            width={200}
                            height={200}
                        />
                        <FontAwesomeIcon
                            icon={faX}
                            height={32}
                            width={32}
                            className={styles.navigation}
                        />
                    </div>
                    <ul className={styles.navList}>
                        <Link
                            className={styles.navItem}
                            href={'/'}
                            onClick={() => setIsOpen(false)}>
                            <FontAwesomeIcon icon={faHome} />
                            Home
                        </Link>
                        <Link
                            className={styles.navItem}
                            href={'/about'}
                            onClick={() => setIsOpen(false)}>
                            <FontAwesomeIcon icon={faCircleInfo} />
                            About
                        </Link>
                        <Link
                            className={styles.navItem}
                            href={'/about/policies'}
                            onClick={() => setIsOpen(false)}>
                            <FontAwesomeIcon icon={faQuestionCircle} />
                            Terms of use
                        </Link>

                        <Link
                            className={styles.navItem}
                            href={'/suppliers'}
                            onClick={() => setIsOpen(false)}>
                            <FontAwesomeIcon icon={faIndustry} />
                            Suppliers
                        </Link>

                        <Link
                            className={styles.navItem}
                            href={'/spareparts'}
                            onClick={() => setIsOpen(false)}>
                            <FontAwesomeIcon icon={faCog} />
                            Spareparts
                        </Link>

                        <Link
                            href={'/blog'}
                            className={styles.navItem}
                            onClick={() => setIsOpen(false)}>
                            <FontAwesomeIcon icon={faBlog} />
                            Blog
                        </Link>

                        <Link
                            href={'/blog/exhibitions'}
                            className={styles.navItem}
                            onClick={() => setIsOpen(false)}>
                            <FontAwesomeIcon icon={faQuestionCircle} />
                            Exhibitions
                        </Link>
                        {user ? (
                            <Link
                                className={styles.navItem}
                                href={'/account'}
                                onClick={() => setIsOpen(false)}>
                                <FontAwesomeIcon icon={faUserCircle} />
                                Account
                            </Link>
                        ) : (
                            <Link
                                className={styles.navItem}
                                href={'/#contact'}
                                onClick={() => setIsOpen(false)}>
                                <FontAwesomeIcon icon={faEnvelope} /> Contact
                            </Link>
                        )}
                        <SignInButton />
                    </ul>
                </nav>
            )}
        </>
    );
};

export default Sidebar;
