import styles from '../styles/Header.module.css';

import Link from 'next/link';
import Image from 'next/image';

import { prisma } from '~/lib/prisma';
import { NavItem } from '../client/Navitem';
import { SignInButton } from '../client/Buttons';

interface Props {
    user?: { role: string } | null;
}

export const NavList = async ({ user }: Props) => {
    const suppliers = await prisma.supplier.findMany();

    if (!suppliers) {
        return <div>loading...</div>;
    }

    return (
        <>
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
                </NavItem>

                <NavItem link="/" title="Spare Parts">
                    {suppliers.map(supplier => (
                        <li key={supplier.id} className={styles.navDropItem}>
                            <Link href={`/suppliers/${supplier.id}`}>
                                {supplier.name}
                            </Link>
                        </li>
                    ))}
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
        </>
    );
};
