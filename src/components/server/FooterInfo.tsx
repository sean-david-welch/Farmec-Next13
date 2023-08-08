import styles from '../styles/Footer.module.css';
import Link from 'next/link';

import { Logo } from '../client/Logo';

export const FooterInfo = () => {
    return (
        <div className={styles.footerInfo}>
            <Link href={'/'}>
                <Logo />
            </Link>
            <ul className={styles.companyInfo}>
                <li className={styles.infoItem}>Farmec Ireland Ltd.</li>
                <li className={styles.infoItem}>Clonross, Drumree</li>
                <li className={styles.infoItem}>Co. Meath, A85 PK30</li>
                <li className={styles.infoItem}>Tel: 01 - 8259289</li>
                <li className={styles.infoItem}>Email: info@farmec.ie</li>
                <li className={styles.infoItem}>
                    <Link href={'/about/policy'}>
                        Privacy Policy | Terms of Use
                    </Link>
                </li>
            </ul>
        </div>
    );
};
