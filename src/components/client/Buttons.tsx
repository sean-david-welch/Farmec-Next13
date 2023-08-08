'use client';
import styles from '~/styles/Utils.module.css';

import Link from 'next/link';
import Image from 'next/image';
import { useSession, signIn, signOut } from 'next-auth/react';

export const SignInButton = () => {
    const { data: session, status } = useSession();

    if (status === 'authenticated') {
        return (
            <div className={styles.signIn}>
                <SignOutButton />

                <Link href={'/account'} aria-label="account button">
                    <Image
                        src={session.user?.image ?? '/default.jpg'}
                        width={40}
                        height={40}
                        alt={`Your Name`}
                        className={styles.profileImage}
                    />
                </Link>
            </div>
        );
    }

    return (
        <div className={styles.signIn}>
            <button className={styles.signInButton} onClick={() => signIn()}>
                Sign In
            </button>

            <Link href={'/account'} aria-label="account button">
                <Image
                    src={'/default.jpg'}
                    width={40}
                    height={40}
                    alt={`Your Name`}
                    className={styles.imageBlank}
                />
            </Link>
        </div>
    );
};

export const SignOutButton = () => {
    return (
        <button className={styles.signOutButton} onClick={() => signOut()}>
            Sign Out
        </button>
    );
};
