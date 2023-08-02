'use client';
import styles from '../styles/Header.module.css';
import useTransparentHeader from '~/hooks/useTransparentHeader';

interface Props {
    children: React.ReactNode;
}

const Navbar = ({ children }: Props) => {
    const isTransparent = useTransparentHeader();

    return (
        <nav className={isTransparent ? styles.transparentNav : styles.navbar}>
            {children}
        </nav>
    );
};

export default Navbar;
