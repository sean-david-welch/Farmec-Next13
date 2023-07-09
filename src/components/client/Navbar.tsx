'use client';
import styles from '../styles/Header.module.css';
import useTransparentHeader from '~/hooks/useTransparentHeader';
import { NavList } from '../server/NavList';

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
            <NavList user={user} />
        </nav>
    );
};

export default Navbar;
