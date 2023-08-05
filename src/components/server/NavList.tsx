import styles from '../styles/Header.module.css';

import Link from 'next/link';
import Image from 'next/image';

import { NavItem } from '../client/Navitem';
import { SignInButton } from '../client/Buttons';

interface Props {
    user?: { role: string } | null;
    suppliers?: { name: string | null; id: string | null }[];
}

export const NavList = async ({ user, suppliers }: Props) => {
    return (
        <>
            <ul className={styles.navList}>
                <Link href={'/'}>
                    <Image
                        src="/farmeclogo.png"
                        className={styles.logo}
                        alt="logo"
                        width={225}
                        height={225}
                    />
                </Link>
                <NavItem link={'/about'} title="About Us">
                    <li className={styles.navDropItem}>
                        <Link href={'/about'}>Staff & Management</Link>
                    </li>
                    <li className={styles.navDropItem}>
                        <Link href={'/about#timeline'}>Company History</Link>
                    </li>
                    <li className={styles.navDropItem}>
                        <Link href={'/about/policies'}>Terms of Use</Link>
                    </li>
                </NavItem>

                <NavItem link={'/suppliers'} title="Suppliers">
                    {suppliers?.map(supplier => (
                        <li key={supplier.id} className={styles.navDropItem}>
                            <Link href={`/suppliers/${supplier.id}`}>
                                {supplier.name}
                            </Link>
                        </li>
                    ))}
                </NavItem>

                <NavItem link={'/spareparts'} title="Spare Parts">
                    {suppliers?.map(supplier => (
                        <li key={supplier.id} className={styles.navDropItem}>
                            <Link href={`/spareparts/${supplier.id}`}>
                                {supplier.name}
                            </Link>
                        </li>
                    ))}
                </NavItem>

                <NavItem link="/blog" title="Blog">
                    <li className={styles.navDropItem}>
                        <Link href={'/blog'}>Latest Posts</Link>
                    </li>
                    <li className={styles.navDropItem}>
                        <Link href={'/blog/exhibitions'}>
                            Exhibition Information
                        </Link>
                    </li>
                </NavItem>

                {user ? (
                    <NavItem link="/account" title="Account">
                        {user.role === 'USER' ||
                            (user.role === 'STAFF' && (
                                <li className={styles.navDropItem}>
                                    <Link href={'/account'}>
                                        Warranty Claim
                                    </Link>
                                    <Link href={'/account'}>
                                        Machine Registration
                                    </Link>
                                    <Link href={'/payments'}>Payments</Link>
                                </li>
                            ))}
                    </NavItem>
                ) : (
                    <NavItem link="/#contact" title="Contact" />
                )}
            </ul>
            <SignInButton />
        </>
    );
};
