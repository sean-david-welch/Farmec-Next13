'use client';
import styles from '../styles/Header.module.css';
import useTransparentHeader from '~/hooks/useTransparentHeader';
import { NavList } from '../server/NavList';

interface Props {
    user?: { role: string } | null;
    suppliers?: { name: string | null; id: string | null }[];
}

const Navbar = ({ user, suppliers }: Props) => {
    const isTransparent = useTransparentHeader();

    return (
        <nav
            className={`${styles.navbar} ${
                isTransparent ? styles.transparent : ''
            }`}>
            <NavList user={user} suppliers={suppliers} />
        </nav>
    );
};

export default Navbar;
