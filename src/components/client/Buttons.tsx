'use client';
import styles from '~/styles/Utils.module.css';

import Link from 'next/link';
import Image from 'next/image';
import { useSession, signIn, signOut } from 'next-auth/react';

export const SignInButton = () => {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <button className={styles.signInButton}>...</button>;
    }

    if (status === 'authenticated') {
        return (
            <>
                <ul className={styles.signIn}>
                    <SignOutButton />
                    <Link href={'/'}>
                        <Image
                            src={session.user?.image ?? '/favicon.ico'}
                            width={42}
                            height={42}
                            alt={`Your Name`}
                            className={styles.profileImage}
                        />
                    </Link>
                </ul>
            </>
        );
    }

    return (
        <button className={styles.signInButton} onClick={() => signIn()}>
            Sign In
        </button>
    );
};

export const SignOutButton = () => {
    return (
        <button className={styles.signOutButton} onClick={() => signOut()}>
            Sign Out
        </button>
    );
};
