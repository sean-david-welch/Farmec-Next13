import styles from '../styles/Footer.module.css';
import utils from '~/styles/Utils.module.css';

import Link from 'next/link';

export const FooterNav = () => {
    return (
        <div className={styles.footerNav}>
            <ul className={styles.navLinks}>
                <button className={utils.btn}>
                    <Link href={'/about'}>Home</Link>
                </button>
                <button className={utils.btn}>
                    <Link href={'/about'}>About</Link>
                </button>
                <button className={utils.btn}>
                    <Link href={'/suppliers'}>Suppliers</Link>
                </button>
                <button className={utils.btn}>
                    <Link href={'/spareparts'}>Spare Parts</Link>
                </button>
                <button className={utils.btn}>
                    <Link href={'/blog'}>Blog</Link>
                </button>
            </ul>
        </div>
    );
};
