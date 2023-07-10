'use client';
import styles from '../styles/Header.module.css';
import useTransparentHeader from '~/hooks/useTransparentHeader';

interface Props {
    children: React.ReactNode;
}

const Navbar = ({ children }: Props) => {
    const isTransparent = useTransparentHeader();
    const getClassName = () => {
        let className = styles.navbar;
        if (isTransparent) {
            className += ` ${styles.transparent}`;
        }
        return className;
    };

    return <nav className={getClassName()}>{children}</nav>;
};

export default Navbar;
